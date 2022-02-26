import { inMemoryUsersRepository } from "../../../__tests__/repositories/inMemoryUsersRepository";
import { CreateUser } from "./createUser";

describe('Create User Use Case', () => {
  it('should be able to create user', async () => {
    const repository = new inMemoryUsersRepository();
    const createUser = new CreateUser(repository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password'
    });

    expect(user.getId()).toBeDefined();
  });

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
  });
});