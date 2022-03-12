import { container } from 'tsyringe';

import IServer from '../http/IServer';
import IHashProvider from '../../domain/providers/IHashProvider';
import ServerExpress from '../http/express/ServerExpress';
import { IRefreshTokensRepository } from '../../domain/repositories/IRefreshTokensRepository';
import { IUsersRepository } from '../../domain/repositories/IUsersRepository';
import { BCryptHashProvider } from '../providers/BCryptHashProvider';
import { PrismaRefreshTokensRepository } from '../repositories/prisma/PrismaRefreshTokensRepository';
import { PrismaUsersRepository } from '../repositories/prisma/PrismaUsersRepository';

container.registerSingleton<IServer>('Server', ServerExpress);

container.registerSingleton<IUsersRepository>('UsersRepository', PrismaUsersRepository)

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IRefreshTokensRepository>('RefreshTokensRepository', PrismaRefreshTokensRepository);
