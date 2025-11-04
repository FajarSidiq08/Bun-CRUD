import { bookshelf } from "../config/database";

export const Role = bookshelf.model("Role", {
  tableName: "roles",
});
