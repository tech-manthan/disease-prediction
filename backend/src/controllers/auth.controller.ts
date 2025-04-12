import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validators";
import UserModel from "../models/user.model";
import CONFIG from "../config";
import { AuthRequest, TokenPayload } from "../types";

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = registerValidator.safeParse(req.body);

    if (!result.success) {
      return res.status(412).json({
        error: result.error.errors[0].message,
      });
    }
    const { email, fullName, password } = result.data;

    const user = await UserModel.findOne({
      email,
    });

    if (user) {
      res.status(403).json({
        error: "user already registered,try login",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, CONFIG.SALT);

    const newUser = await UserModel.create({
      email,
      fullName,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user registered successfully",
      id: newUser._id,
    });
  } catch (err) {
    res.status(500).json({
      error: "failed to register user",
    });
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = loginValidator.safeParse(req.body);

    if (!result.success) {
      return res.status(412).json({
        error: result.error.errors[0].message,
      });
    }
    const { email, password } = result.data;

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      res.status(403).json({
        error: "email or password incorrect",
      });
      return;
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      res.status(403).json({
        error: "email or password incorrect",
      });
      return;
    }

    const payload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const token = jwt.sign(payload, CONFIG.JWT_SECRET!);

    res.status(200).json({
      message: "user logged in successfully",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "failed to logged in user",
    });
  }
}

async function self(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    const user = await UserModel.findOne({
      _id: userId,
    }).select("-password -__v");

    if (!user) {
      res.status(403).json({
        error: "user does not exist",
      });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: "failed to fetch user details",
    });
  }
}

export { register, login, self };
