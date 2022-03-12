import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSession } from "../../../../domain/useCases/Sessions/CreateSession";

export default class AuthenticateController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {email, password} = req.body;

    const createSession = container.resolve(CreateSession);

    try {
      const {user, ...rest} = await createSession.execute({email, password});

      const { ['password']: remove, ...props } = user.props;

      return res.json({user: {id: user.getId(), props}, ...rest});

    } catch (error) {
        let message: string;
        
        if (error instanceof Error) 
          message = error.message
        else 
          message = String(error)
  
        return res.status(401).json({error: message})
    }
  }
}
