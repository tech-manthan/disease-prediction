import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import CONFIG from "../config";
import { AuthRequest, TokenPayload } from "../types";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(403).json({
        error: "authorization header not set",
      });
      return;
    }

    const [bearer, token] = authorizationHeader.split(" ");

    if (!bearer || bearer != "Bearer" || !token) {
      res.status(403).json({
        error: "token is not set",
      });
      return;
    }

    const parsedToken = jwt.verify(token, CONFIG.JWT_SECRET!);

    if (typeof parsedToken === "string") {
      res.status(403).json({
        error: "token is invalid",
      });
      return;
    }

    let _req = req;

    (_req as AuthRequest).userId = (parsedToken as TokenPayload).userId;
    next();
  } catch (err) {
    res.status(500).json({
      error: "failed to parse token",
    });
  }
}

export default authMiddleware;
