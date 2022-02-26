import { User } from "../../../domain/entities/User";
import { IUsersRepository } from "../../../domain/repositories/IUsersRepository";
import { prisma } from "../../database/prisma";

export class PrismaUsersRepository implements IUsersRepository {
  public async findById(id: string): Promise<User | null> {
    const userPrisma = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!userPrisma) {
      return null;
    }

    const user = User.create({
      name: userPrisma.name,
      email: userPrisma.email,
      password: userPrisma.password,
      avatar_url: userPrisma.avatar_url,
      createdAt: userPrisma.createdAt
    }, userPrisma.id);

    return user;
  }
  public async findByEmail(email: string): Promise<User | null> {
    const userPrisma = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!userPrisma) {
      return null;
    }

    const user = User.create({
      name: userPrisma.name,
      email: userPrisma.email,
      password: userPrisma.password,
      avatar_url: userPrisma.avatar_url,
      createdAt: userPrisma.createdAt
    }, userPrisma.id);

    return user;
  }
  public async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.getId(),
        name: user.props.name,
        email: user.props.email,
        password: user.props.password,
        avatar_url: user.props.avatar_url,
      }
    })
  }
  
}