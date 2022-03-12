import { User } from "../../entities/User";
import { inMemoryUsersRepository } from "../../repositories/fakes/inMemoryUsersRepository";
import { RemoveUser } from "./removeUser";

describe('Remove User Use Case', () => {
  it('should be able remove user by id', async () => {
    const fakeRepository = new inMemoryUsersRepository();

    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
      createdAt: new Date()
    })

    await fakeRepository.save(user);

    const removeUser = new RemoveUser(fakeRepository);
    
    await removeUser.execute(user.getId());

    expect(fakeRepository.findById(user.getId())).resolves.toBeNull();
  })
})