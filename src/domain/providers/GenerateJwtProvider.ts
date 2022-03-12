import authConfig from '../../config/auth';
import jwt from 'jsonwebtoken';

export default function GenerateJwtProvider(subject: string, payload: string | object): string {
    const {secret, expiresIn} = authConfig.jwt;

    return jwt.sign(payload, secret, 
    {
      expiresIn,
      subject
    });
}