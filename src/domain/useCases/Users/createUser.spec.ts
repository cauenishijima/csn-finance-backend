import { inMemoryUsersRepository } from "../../tests/repositories/inMemoryUsersRepository";
import { CreateUser } from "./createUser";

describe('Create User Use Case', () => {
  it('should NOT be able to create user with same email', async () => {
    await expect(
      async() => {
        const repository = new inMemoryUsersRepository();

        const createUser = new CreateUser(repository);

        await createUser.execute({
          name: 'John Doe',
          email: 'johndoe@email.com',
          password: 'password'
        });

        await createUser.execute({
          name: 'John Doe 2',
          email: 'johndoe@email.com',
          password: 'password'
        });
      }
    ).rejects.toThrowError(new Error('User already exists.'))
  })
});