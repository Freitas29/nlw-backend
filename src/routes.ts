import express from "express";
import PointsController from './controllers/PointsController'
import ItemController from './controllers/ItemsController'

const routes = express.Router();

routes.get("/items", ItemController.index);

routes.post("/points", PointsController.create);
routes.get("/points", PointsController.index);
routes.get("/points/:id", PointsController.show);


export default routes;
