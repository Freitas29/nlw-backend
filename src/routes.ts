import express from "express";
import PointsController from './controllers/PointsController'
import ItemController from './controllers/ItemsController'

const routes = express.Router();

routes.get("/items", ItemController.index);

routes.post("/points", PointsController.create);


export default routes;
