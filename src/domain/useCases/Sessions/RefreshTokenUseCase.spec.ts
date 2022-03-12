import { FakeHashProvider } from "../../providers/fakes/FakeHashProvider";
import { InMemoryRefreshTokenRepository } from "../../repositories/fakes/inMemoryRefreshTokenRepository";
import { inMemoryUsersRepository } from "../../repositories/fakes/inMemoryUsersRepository";
import { CreateUser } from "../Users/createUser"
import { CreateSession } from "./CreateSession";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";
import authConfig from '../../../config/auth';
import { RemoveUser } from "../Users/removeUser";

describe('Refresh Token Use Case', () => {
  it('should not be able create a new Token if Refresh token is expired!', async () => {
    const usersRepository = new inMemoryUsersRepository();
    const hashProvider = new FakeHashProvider();
    const refreshTokensRepository = new InMemoryRefreshTokenRepository();

    const userCreate = new CreateUser(usersRepository, hashProvider);

    await userCreate.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456'
    });

    const createSession = new CreateSession(usersRepository, hashProvider, refreshTokensRepository);

    const { refreshToken } = await createSession.execute({
      email: 'john@email.com',
      password: '123456'
    });


    const refreshTokenUseCase = new RefreshTokenUseCase(refreshTokensRepository, usersRepository);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      
      return customDate.setSeconds(customDate.getSeconds() + authConfig.refreshToken.expiresIn);
    }),
    
    
    expect(refreshTokenUseCase.execute(refreshToken)).rejects.toThrowError(new Error('Refresh Token expireted'));    
  })

  it('should not be able create a new token user not existed!', async () => {
    const usersRepository = new inMemoryUsersRepository();
    const hashProvider = new FakeHashProvider();
    const refreshTokensRepository = new InMemoryRefreshTokenRepository();

    const userCreate = new CreateUser(usersRepository, hashProvider);

    const user = await userCreate.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456'
    });

    const createSession = new CreateSession(usersRepository, hashProvider, refreshTokensRepository);

    const { refreshToken } = await createSession.execute({
      email: 'john@email.com',
      password: '123456'
    });

    const removeUser = new RemoveUser(usersRepository);
    
    removeUser.execute(user.getId());

    const refreshTokenUseCase = new RefreshTokenUseCase(refreshTokensRepository, usersRepository);  
    
    expect(refreshTokenUseCase.execute(refreshToken)).rejects.toThrowError(new Error('User not found!'));    
  })

})