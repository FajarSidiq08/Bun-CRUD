import { bookshelf } from "../config/database";

export const User = bookshelf.model("User", {
  tableName: "users",
});
