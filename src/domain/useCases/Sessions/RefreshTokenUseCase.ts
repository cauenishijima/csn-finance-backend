import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import GenerateJwtProvider from "../../providers/GenerateJwtProvider";
import { IRefreshTokensRepository } from "../../repositories/IRefreshTokensRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

type CreateSessionResponse = {
  user: User,
  token: string;
  refreshToken: string;
}

@injectable()
export class RefreshTokenUseCase {

  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(refresh_token: string): Promise<CreateSessionResponse>{
    const refreshToken = await this.refreshTokensRepository.findById(refresh_token);

    const DateNowInUnixTimeStamp = Date.now();

    if (refreshToken.expiredIn < DateNowInUnixTimeStamp) {
      throw new Error('Refresh Token expireted');
    } 

    const user = await this.usersRepository.findById(refreshToken.userId);

    if (!user) {
      throw new Error('User not found!');
    }
    
    const token = GenerateJwtProvider(refreshToken.userId, {
      name: user.props.name,
      email: user.props.email
    });

    return {
      user,
      token,
      refreshToken: refreshToken.id
    }
  }
}