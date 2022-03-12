import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "../../../../domain/useCases/Sessions/RefreshTokenUseCase";

export class RefreshTokenController {
  async create(req: Request, res: Response) {
    const {refresh_token} = req.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    try {

      const {user, ...rest} = await refreshTokenUseCase.execute(refresh_token);
      
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