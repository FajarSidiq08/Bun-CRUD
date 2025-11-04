import { bookshelf } from "../config/database";
import { User } from "./User";

export const Role = bookshelf.model("Role", {
  tableName: "roles",

  users() {
    return this.hasMany(User, "role_id"); 
  },
});
