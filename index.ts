import { Hono } from "hono";
import api from "./routes/api.routes";
import "dotenv/config";

const app = new Hono();

app.route("/", api);

export default {
  port: 3000,
  fetch: app.fetch,
};
