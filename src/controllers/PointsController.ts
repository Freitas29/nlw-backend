import { Request, Response } from "express";

import knex from "../database/connection";

class PointsController {
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

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    try {
      await knex.transaction(async (trx) => {
        const insertedIds = await trx("points").insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
          return {
            item_id,
            point_id,
          };
        });

        await trx("point_items").insert(pointItems);

        return response.json({
          id: point_id,
          ...point,
        });
      });
    } catch (e) {
      return response.json({
        error: e,
      });
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
        .select('items.title', 'items.image');

      return response.json({ point, items });
    } catch (e) {
      return response.json({
        error: e,
      });
    }
  }
}

export default new PointsController();
