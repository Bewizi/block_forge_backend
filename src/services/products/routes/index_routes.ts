import { Router } from "express";
import Products_controllers from "../controllers/products_controllers";
import {
  createProducts,
  getProductById,
} from "../middleware/product_middleware";

const routes = Router();

routes.get("/allProducts", Products_controllers.allProducts);
// routes.get("/solidProducts", Products_controllers.solidProducts);
routes.get("/getProduct/:id", getProductById, Products_controllers.getProduct);
routes.post(
  "/createProduct",
  createProducts,
  Products_controllers.createProduct
);
routes.get("/category/:category", Products_controllers.getProductsByCategory);

export default routes;
