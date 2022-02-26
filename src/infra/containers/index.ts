import { container } from 'tsyringe';
import IHashProvider from '../../domain/providers/IHashProvider';
import { IUsersRepository } from '../../domain/repositories/IUsersRepository';
import { BCryptHashProvider } from '../providers/BCryptHashProvider';
import { PrismaUsersRepository } from '../repositories/prisma/PrismaUsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', PrismaUsersRepository)

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);