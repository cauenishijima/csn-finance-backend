import { CreateUser } from "./domain/useCases/Users/createUser";
import { PrismaUsersRepository } from "./infra/repositories/prisma/PrismaUsersRepository";

const repository = new PrismaUsersRepository();
const createUser = new CreateUser(repository);


async function createUserInPrisma() {
  const user = await createUser.execute({
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: 'password'
  });

  console.log(user);
}

createUserInPrisma();
