import {Router} from "express";
import userRoute from '../src/services/users/routes/index_routes'
import productRoutes from '../src/services/products/routes/index_routes'

const rootRoutes = Router();

rootRoutes.use('/user', userRoute);
rootRoutes.use('/products', productRoutes);

export default rootRoutes;