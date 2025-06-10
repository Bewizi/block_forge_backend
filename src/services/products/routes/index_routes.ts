import { Router } from "express";
import Products_controllers from "../controllers/products_controllers";

const routes = Router();

routes.get("/allProducts", Products_controllers.allProducts);
