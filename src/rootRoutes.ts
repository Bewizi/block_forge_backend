import { Router } from "express";
import userRoute from "./services/users/routes/index_routes";
import productRoutes from "./services/products/routes/index_routes";

const rootRoutes = Router();

rootRoutes.use("/user", userRoute);
rootRoutes.use("/products", productRoutes);

export default rootRoutes;
