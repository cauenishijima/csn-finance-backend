import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../../config/auth';


interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    response.status(401).json({error: 'JWT is missing'});
    return;
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    response.status(401).json({error: 'JWT is missing'});
    return;
  }

  try {
    const decoded = verify(token, authConfig.jwt.secret) as ITokenPayload;

    const { sub } = decoded;

    request.userId = sub;   
    
    return next();
  } catch {
    return response.status(401).json({error: 'Token invalid or expired.'});
  }
}
