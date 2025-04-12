import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface User {
  fullName: string;
  email: string;
  password: string;
}

export interface TokenPayload extends JwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  userId: string;
}
