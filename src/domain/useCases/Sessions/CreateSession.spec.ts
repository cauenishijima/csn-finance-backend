import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateSession } from "./CreateSession"
import { IRefreshTokensRepository } from "../../repositories/IRefreshTokensRepository";
import { inMemoryUsersRepository } from "../../repositories/fakes/inMemoryUsersRepository";
import { InMemoryRefreshTokenRepository } from "../../repositories/fakes/inMemoryRefreshTokenRepository";
import { FakeHashProvider } from "../../providers/fakes/FakeHashProvider";

describe('Create Session Use Case', () => {
  let usersRepository: IUsersRepository;
  let refreshTokenRepository: IRefreshTokensRepository;

  beforeEach(async () => {   
    usersRepository = new inMemoryUsersRepository();
    refreshTokenRepository = new InMemoryRefreshTokenRepository();
    
    const user = User.create({
      name: 'Cauê Nishijima', 
      email: 'caue1987@gmail.com',
      password: '123123',
      createdAt: new Date()
    });

    await usersRepository.save(user);
  });

  it('should by able create a session with valid email and password', async () => {    
    const fakeHashProvider = new FakeHashProvider();
    
    const createSession = new CreateSession(usersRepository, fakeHashProvider, refreshTokenRepository);  

    const {user: userReturn, token, refreshToken} = await createSession.execute({
      email: 'caue1987@gmail.com',
      password: '123123'
    })

    expect(userReturn).toBeTruthy();
    expect(token).not.toBeUndefined();
    expect(refreshToken).not.toBeUndefined();
  })

  it('should NOT be able create a session with invalid password', () => {
      const fakeHashProvider = new FakeHashProvider();
      const createSession = new CreateSession(usersRepository,  fakeHashProvider, refreshTokenRepository);  

      expect(createSession.execute({
        email: 'caue1987@gmail.com',
        password: '123456'
      })).rejects.toThrowError(new Error('Invalid email or password!'));
  })  

  it('should NOT be able create a session with unexited email', () => {
    const fakeHashProvider = new FakeHashProvider();
    const createSession = new CreateSession(usersRepository,  fakeHashProvider, refreshTokenRepository);  

    expect(
      createSession.execute({
        email: 'johndoe@email.com',
        password: '123456'
      })
    ).rejects.toThrowError(new Error('User not found!'));
  })    
})