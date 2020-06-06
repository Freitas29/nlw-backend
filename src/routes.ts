import express from "express";
import PointsController from './controllers/PointsController'
import ItemController from './controllers/ItemsController'
import multerConfig from './config/multer'
import multer from 'multer'

const routes = express.Router();
const upload = multer(multerConfig)

routes.get("/items", ItemController.index);

routes.post("/points", upload.single('image') ,PointsController.create);
routes.get("/points", PointsController.index);
routes.get("/points/:id", PointsController.show);


export default routes;
