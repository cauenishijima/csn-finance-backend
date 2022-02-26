import { User } from "../../entities/User"
import { IUsersRepository } from "../../repositories/IUsersRepository";

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
}

export class CreateUser {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute({name, email, password, avatar_url}: CreateUserRequest): Promise<User> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = User.create({
      name, 
      email,
      password,
      avatar_url,
      createdAt: new Date()
    });

    await this.usersRepository.create(user);

    return user;
  }
}