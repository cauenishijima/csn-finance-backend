import { RefreshToken } from "@prisma/client";
import { IRefreshTokensRepository } from "../../../domain/repositories/IRefreshTokensRepository";
import { prisma } from "../../database/prisma";
import { randomUUID } from 'crypto';
import authConfig from '../../../config/auth'

export class PrismaRefreshTokensRepository implements IRefreshTokensRepository {
  async create(userId: string): Promise<RefreshToken> {

    await prisma.refreshToken.deleteMany({
      where: {
        userId      
      },
    })

    const refreshToken = await prisma.refreshToken.create({
      data: {
        id: randomUUID(),
        userId,
        expiredIn: Math.floor(new Date().getTime() / 1000) + authConfig.refreshToken.expiresIn
      },
    })

    return refreshToken;
  }
  async findById(id: string): Promise<RefreshToken | null> {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id 
      }
    });
    
    return refreshToken;
  }
  
}