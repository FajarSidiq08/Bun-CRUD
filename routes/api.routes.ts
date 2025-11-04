import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";
const api = new Hono();
const userController = new UserController();

api.get("/users", userController.getAll)
api.post("/users", userController.actionUser)
api.delete("/users/:id", userController.deleteUser)

export default api;
