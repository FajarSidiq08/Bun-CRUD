import { bookshelf } from "../config/database";
import { Role } from "./Role";

export const User = bookshelf.model("User", {
  tableName: "users",

  role() {
    return this.belongsTo(Role, "role_id");
  },
});
