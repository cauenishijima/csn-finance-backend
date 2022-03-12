import { RefreshToken } from "@prisma/client";
import { IRefreshTokensRepository } from "../../domain/repositories/IRefreshTokensRepository";
import { randomUUID } from 'crypto';

export class InMemoryRefreshTokenRepository implements IRefreshTokensRepository {
  public refreshTokens: RefreshToken[] = [];
  
  async create(userId: string): Promise<RefreshToken> {

    this.refreshTokens = this.refreshTokens.filter(item => item.userId !== userId);

    const refreshToken: RefreshToken = {
      id: randomUUID(),
      userId,
      expiredIn: new Date().getTime() + (1000 * 60 * 1) // 1 minute
    }

    this.refreshTokens.push(refreshToken);

    return refreshToken;
  }
  async findById(id: string): Promise<RefreshToken | null> {
    return this.refreshTokens.find(refreshToken => refreshToken.id === id);


  }

}