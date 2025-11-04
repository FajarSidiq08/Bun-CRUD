import type { Context } from "hono";
import { Role } from "../models/Role";

export class RoleController {
  async getAll(request: Context) {
    const roles = await Role.fetchAll();
    return Response.json({
      status: 200,
      message: "Berhasil mengambil data role",
      data: roles.toJSON(),
    });
  }

  async actionRole(request: Context) {
    try {
      const body = await request.req.json();
      const id = body.id ?? null;

      if (id) {
        const role = await Role.where({ id }).fetch({ require: false });
        if (!role) {
          return Response.json({
            status: 404,
            message: "Role tidak ditemukan",
          });
        }

        await role.save(body, { patch: true });
        return Response.json({
          status: 200,
          message: "Role berhasil diperbarui",
          data: role.toJSON(),
        });
      } else {
        const newRole = await new Role(body).save();
        return Response.json({
          status: 201,
          message: "Role berhasil dibuat",
          data: newRole.toJSON(),
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

  async deleteRole(request: Context) {
    const { id } = request.req.param();
    const role = await Role.where({ id }).fetch({ require: false });

    if (!role) {
      return Response.json({
        status: 404,
        message: "Role tidak ditemukan",
      });
    }

    await role.destroy();
    return Response.json({
      status: 200,
      message: "Role berhasil dihapus",
    });
  }
}
