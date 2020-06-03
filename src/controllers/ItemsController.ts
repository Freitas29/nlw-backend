import { Request, Response } from "express";
import knex from "../database/connection";
import Item from "../model/Item";

class ItemsController {
  async index(request: Request, response: Response) {
    try {
      const items = await knex("items").select("*");

      const serializedItems = items.map((item: Item) => {
        return new Item(
          item.id,
          item.title,
          `http://localhost:3000/uploads/${item.image}`
        );
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
