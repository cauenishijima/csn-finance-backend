import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { FakeHashProvider } from "../../../__tests__/providers/FakeHashProvider";
import { inMemoryUsersRepository } from "../../../__tests__/repositories/inMemoryUsersRepository";
import { CreateSession } from "./createSession"

describe('Create Session Use Case', () => {
  let usersRepository: IUsersRepository;

  beforeEach(async () => {   
    usersRepository = new inMemoryUsersRepository();

    const user = User.create({
      name: 'Cauê Nishijima', 
      email: 'caue1987@gmail.com',
      password: '123123',
      createdAt: new Date()
    });

    await usersRepository.create(user);
  });

  it('should by able create a session with valid email and password', async () => {    
    const fakeHashProvider = new FakeHashProvider();
    const createSession = new CreateSession(usersRepository,  fakeHashProvider);  

    const {user: userReturn, token} = await createSession.execute({
      email: 'caue1987@gmail.com',
      password: '123123'
    })

    expect(userReturn).toBeTruthy();
    expect(token).not.toBeUndefined();
  })

  it('should NOT be able create a session with invalid password', async () => {
    await expect(async () => {     
      const fakeHashProvider = new FakeHashProvider();
      const createSession = new CreateSession(usersRepository,  fakeHashProvider);  

      await createSession.execute({
        email: 'caue1987@gmail.com',
        password: '123456'
      })
    }).rejects.toThrowError(new Error('Invalid email or password!'));
  })  

  it('should NOT be able create a session with unexited email', async () => {
    await expect(async () => {     
      const fakeHashProvider = new FakeHashProvider();
      const createSession = new CreateSession(usersRepository,  fakeHashProvider);  

      await createSession.execute({
        email: 'johndoe@email.com',
        password: '123456'
      })
    }).rejects.toThrowError(new Error('User not found!'));
  })    
})