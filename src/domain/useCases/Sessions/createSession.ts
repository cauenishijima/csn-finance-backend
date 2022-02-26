import { IUsersRepository } from "../../repositories/IUsersRepository";
import jwt from 'jsonwebtoken';
import IHashProvider from "../../providers/IHashProvider";
import authConfig from '../../../config/auth';
import { User } from "../../entities/User";

type CreateSessionRequest = {
  email: string;
  password: string;
}

type CreateSessionResponse = {
  user: User,
  token: string;
}

export class CreateSession{
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
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

    const {secret, expiresIn} = authConfig.jwt;

    const token = jwt.sign(
    {
      name: user.props.name,
      email: user.props.email
    }, 
    secret, 
    {
      expiresIn,
      subject: user.getId()
    });

    return {
      user,
      token
    }
  }
}