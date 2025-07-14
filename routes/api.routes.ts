import { Hono } from "hono";
import { getAllUsers } from "../controllers/example.controller";
const api = new Hono();

api.get("/users", getAllUsers)

export default api;
