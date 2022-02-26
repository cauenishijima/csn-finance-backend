import { User } from "../../entities/User"
import IHashProvider from "../../providers/IHashProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import {injectable, inject, container} from 'tsyringe';

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
}

@injectable()
export class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({name, email, password, avatar_url}: CreateUserRequest): Promise<User> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = User.create({
      name, 
      email,
      password: await this.hashProvider.generateHash(password),
      avatar_url,
      createdAt: new Date()
    });

    await this.usersRepository.create(user);

    return user;
  }
}