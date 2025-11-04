import { User } from "../models/User";

export const getAllUsers = async (response : any)  => {
  const users = await User.fetchAll();
  return response.json(users.toJSON());
};

export const createUser = async (c) => {
  const body = await c.req.json();
  const user = await new User(body).save();
  return c.json(user.toJSON(), 201);
};

export const updateUser = async (c) => {
  const { id } = c.req.param();
  const data = await c.req.json();

  const user = await User.where({ id }).fetch({ require: false });
  if (!user) return c.json({ error: "User not found" }, 404);

  await user.save(data, { patch: true });
  return c.json(user.toJSON());
};

export const deleteUser = async (c) => {
  const { id } = c.req.param();
  const user = await User.where({ id }).fetch({ require: false });
  if (!user) return c.json({ error: "User not found" }, 404);

  await user.destroy();
  return c.json({ message: "User deleted successfully" });
};