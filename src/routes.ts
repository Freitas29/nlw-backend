import express from "express";
import knex from "./database/connection";

const routes = express.Router();

routes.get("/items", async (request, response) => {
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
});

routes.post("/points", async (request, response) => {
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

  try {
    const trx = await knex.transaction();

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

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    return response.json({
      success: `${name} cadastrado com sucesso `,
    });
  } catch (e) {
    return response.json({
      error: e,
    });
  }
});


export default routes;
