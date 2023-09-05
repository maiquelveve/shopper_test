import { Router } from "express";
import { productsController } from "../controller";

const productsRoutes = Router();

productsRoutes.get("/", productsController.getFileCSV);

export { productsRoutes };
