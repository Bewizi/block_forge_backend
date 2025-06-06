import {Router} from "express";
import auth_controller from "../controllers/auth_controller";
import {loginValidation, registerValidation} from "../middleware/ath_middleware";

const routes = Router()

routes.post('/register', registerValidation, auth_controller.register)
routes.post('/login', loginValidation, auth_controller.login)

export default routes