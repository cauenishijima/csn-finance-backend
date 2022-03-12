import { FakeHashProvider } from "../../providers/fakes/FakeHashProvider";
import { inMemoryUsersRepository } from "../../repositories/fakes/inMemoryUsersRepository";
import { CreateUser } from "./createUser";

describe('Create User Use Case', () => {
  it('should be able to create user', async () => {
    const repository = new inMemoryUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUser(repository, fakeHashProvider);

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
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUser(repository, fakeHashProvider);

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
    ).rejects.toBeInstanceOf(Error); // toThrowError(new Error('User already exists.'))
  });
});