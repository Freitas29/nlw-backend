import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsController {
  async index(request: Request, response: Response) {
    try {
      const items = await knex("items").select("*");

      const serializedItems = items.map((item) => {
        return {
          id: item.id,
          title: item.title,
          image_url: `http://localhost:3000/uploads/${item.image}`,
        };
      });

      response.json(serializedItems);
    } catch (e) {
      return response.json({
        error: e,
      });
    }
  }
}

export default new ItemsController();
