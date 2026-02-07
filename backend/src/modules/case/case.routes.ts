import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createCaseController,
  getCasesController,
  getCaseByIdController,
} from "./case.controller";
import { validateCreateCase } from "./case.validation";

const router = Router();

/**
 * All case routes are protected
 */
router.use(authMiddleware);

/**
 * POST /cases
 * Create a new case
 */
router.post("/", validateCreateCase, createCaseController);

/**
 * GET /cases
 * Get all cases of logged-in doctor
 */
router.get("/", getCasesController);

/**
 * GET /cases/:id
 * Get single case by id
 */
router.get("/:id", getCaseByIdController);

export default router;
