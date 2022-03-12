import {inject, injectable} from 'tsyringe';
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class RemoveUser {
  
  constructor(
    @inject('UsesRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    return this.usersRepository.remove(id);
  }
}