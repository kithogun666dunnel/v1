import { Request, Response } from "express";
import { signupService, loginService } from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await signupService(email, password);
  res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);
  res.status(200).json(result);
};
