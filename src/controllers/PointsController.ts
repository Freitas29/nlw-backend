import { Request, Response } from "express";

import knex from "../database/connection";
import Point from "../model/Point";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsed = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsed)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return response.json(points);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await knex.transaction();

    try {
      const insertedIds = await trx("points").insert({
        image: "image-fake",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      });

      const point_id = insertedIds[0];

      const point = new Point(
        point_id,
        "image-fake",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
      );

      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

      await trx("point_items").insert(pointItems);

      return response.json(point);
    } catch (e) {
      trx.rollback();
      return response.status(400).json({
        error: e,
      });
    } finally {
      trx.commit();
    }
  }
  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const point = await knex("points").where("id", id).first();

      if (!point) {
        return response.status(400).json({
          error: "Point not found",
        });
      }

      const items = await knex("items")
        .join("point_items", "items.id", "=", "point_items.item_id")
        .where("point_items.point_id", id)
        .select("items.title", "items.image");

      return response.json({ point, items });
    } catch (e) {
      return response.json({
        error: e,
      });
    }
  }
}

export default new PointsController();
