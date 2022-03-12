import { Router } from "express";
import AuthenticateController from "./controllers/AuthenticationController";
import { RefreshTokenController } from "./controllers/RefreshTokenController";
import UserController from "./controllers/UserController";
import ensureAuthentication from "./middlewares/ensureAuthentication";

const routes = Router();


const userController = new UserController();
const authenticateController = new AuthenticateController();
const refreshTokenController = new RefreshTokenController();

routes.post('/register', userController.create);
routes.post('/authenticate', authenticateController.create);
routes.post('/refresh-token', refreshTokenController.create);

routes.get('/private', ensureAuthentication ,(req, res) => {
  res.json({access: true})
})

export default routes;