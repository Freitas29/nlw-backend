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

      const serializedPoints= points.map((point: Point) => {
        return new Point(
          point.id,
          `http://192.168.0.11:3000/uploads/${point.image}`,
          point.name,
          point.email,
          point.whatsapp,
          point.latitude,
          point.longitude,
          point.city,
          point.uf
        );
      });

    return response.json(serializedPoints);
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

    const image = request.file.filename

    const trx = await knex.transaction();

    try {
      const insertedIds = await trx("points").insert({
        image,
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
        image,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
      );

      const pointItems = items
        .split(",")
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
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

     
      const serializedPoint = {
          id: point.id,
          image: `http://192.168.0.11:3000/uploads/${point.image}`,
          name: point.name,
          email: point.email,
          whatsapp: point.whatsapp,
          latitude: point.latitude,
          longitude: point.longitude,
          city: point.city,
          uf: point.uf
      }

      const items = await knex("items")
        .join("point_items", "items.id", "=", "point_items.item_id")
        .where("point_items.point_id", id)
        .select("items.title", "items.image");

      return response.json({ serializedPoint, items });
    } catch (e) {
      return response.json({
        error: e,
      });
    }
  }
}

export default new PointsController();
