import multer from "multer";
import { Router } from "express";
import { productsController } from "../controller";

const multerConfig = multer();
const productsRoutes = Router();

productsRoutes.post("/", multerConfig.single("file"), productsController.getFileCSV);
productsRoutes.put("/", productsController.updateFile);

export { productsRoutes };
