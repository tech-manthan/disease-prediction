import express, { NextFunction, Request, Response } from "express";
import { login, register, self } from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { AuthRequest } from "../types";

const router = express.Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  register(req, res, next);
});
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  login(req, res, next);
});

router.use(authMiddleware);
router.get("/self", (req: Request, res: Response, next: NextFunction) => {
  self(req as AuthRequest, res, next);
});

export default router;
