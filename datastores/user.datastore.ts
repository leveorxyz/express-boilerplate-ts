import { User } from "@prisma/client";

import prisma from "../configs/prisma.config";

export const findUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = (user: Omit<User, "id">) => {
  return prisma.user.create({ data: user });
};
