import prisma from "../configs/prisma.config";

export const findUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};