import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";
import { RoleController } from "../controllers/role.controller";
const api = new Hono();
const userController = new UserController();
const roleController = new RoleController();

api.get("/users", userController.getAll)
api.post("/users", userController.actionUser)
api.delete("/users/:id", userController.deleteUser)

api.get("/roles", roleController.getAll)
api.post("/roles", roleController.actionRole)
api.delete("/roles/:id", roleController.deleteRole)

export default api;
