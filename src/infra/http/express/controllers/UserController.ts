import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUser } from "../../../../domain/useCases/Users/createUser";

export default class UserController {
  async create(req: Request, res: Response) {
    const {name, email, password} = req.body;

    const createUser = container.resolve(CreateUser);

    try {
      const user = await createUser.execute({name, email, password});

      res.json({user});

    } catch (error) {

      res.status(401).json({error})
    }    
  }
}