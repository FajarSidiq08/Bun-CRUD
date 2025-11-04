import { Hono } from "hono";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/user.controller";
const api = new Hono();

api.get("/users", getAllUsers)
api.post("/users", createUser)
api.put("/users/:id", updateUser)
api.delete("/users/:id", deleteUser)

export default api;
