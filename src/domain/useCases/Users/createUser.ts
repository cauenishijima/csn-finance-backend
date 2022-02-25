import { User } from "../../entities/User"
import { UsersRepository } from "../../repositories/UsersRepository";

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
}

export class CreateUser {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({name, email, password}: CreateUserRequest): Promise<User> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = User.create({
      name, 
      email,
      password,
      createdAt: new Date()
    });

    await this.usersRepository.create(user);

    return user;
  }
}