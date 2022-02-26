import 'reflect-metadata';
import './infra/containers'

import {container} from 'tsyringe';

import { CreateUser } from "./domain/useCases/Users/createUser";

const createUser = container.resolve(CreateUser);

async function createUserInPrisma() {
  const user = await createUser.execute({
    name: 'John Doe 3',
    email: 'johndoe3@email.com',
    password: 'password'
  });

  console.log(user);
}

createUserInPrisma();
