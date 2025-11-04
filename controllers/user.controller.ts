import type { Context } from "hono";
import { User } from "../models/User";

export class UserController {
  async getAll(request: Context) {
    const users = await User.fetchAll();
    return Response.json({
      status: 200,
      message: "Berhasil mengambil data user",
      data: users.toJSON(),
    });
  }

  async actionUser(request: Context) {
    try {
      const body = await request.req.json();
      const id = body.id ?? null; 

      if (id) {
        const user = await User.where({ id }).fetch({ require: false });
        if (!user) {
          return Response.json({
            status: 404,
            message: "User tidak ditemukan",
          });
        }

        await user.save(body, { patch: true });
        return Response.json({
          status: 200,
          message: "User berhasil diperbarui",
          data: user.toJSON(),
        });
      } else {
        const newUser = await new User(body).save();
        return Response.json({
          status: 201,
          message: "User berhasil dibuat",
          data: newUser.toJSON(),
        });
      }
    } catch (error: any) {
      return Response.json({
        status: 500,
        message: "Terjadi kesalahan pada server",
        error: error.message,
      });
    }
  }

  async deleteUser(request: Context) {
    const { id } = request.req.param();
    const user = await User.where({ id }).fetch({ require: false });

    if (!user) {
      return Response.json({
        status: 404,
        message: "User tidak ditemukan",
      });
    }

    await user.destroy();
    return Response.json({
      status: 200,
      message: "User berhasil dihapus",
    });
  }
}
