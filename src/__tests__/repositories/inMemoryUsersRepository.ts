import { User } from "../../domain/entities/User";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";

export class inMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.getId() === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.props.email === email) || null;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

}