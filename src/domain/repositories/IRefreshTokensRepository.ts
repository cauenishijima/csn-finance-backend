import { RefreshToken } from "@prisma/client";

export interface IRefreshTokensRepository {
  create(userId: string): Promise<RefreshToken>
  findById(id: string): Promise<RefreshToken | null>
}