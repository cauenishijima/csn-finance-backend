import { IUsersRepository } from "../../repositories/IUsersRepository";
import IHashProvider from "../../providers/IHashProvider";
import { User } from "../../entities/User";
import { inject, injectable} from 'tsyringe';
import GenerateJwtProvider from "../../providers/GenerateJwtProvider";
import { IRefreshTokensRepository } from "../../repositories/IRefreshTokensRepository";


type CreateSessionRequest = {
  email: string;
  password: string;
}

type CreateSessionResponse = {
  user: User,
  token: string;
  refreshToken: string;
}

@injectable()
export class CreateSession{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('RefreshTokensRepository')
    private refreshTokenRepository: IRefreshTokensRepository
  ) {}

  async execute({email, password}: CreateSessionRequest): Promise<CreateSessionResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found!');
    }

    const matchPassword = await this.hashProvider.compareHash(password, user.props.password);

    if (!matchPassword) {
      throw new Error('Invalid email or password!')
    }

    const token = GenerateJwtProvider(user.getId(), {
      name: user.props.name,
      email: user.props.email
    })

    const refreshToken = await this.refreshTokenRepository.create(user.getId());

    return {
      user,
      token,
      refreshToken: refreshToken.id
    }
  }
}