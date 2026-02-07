import { Router } from "express";
import {
  getMyProfile,
  updateMyProfile,
  updateMyAvailability,
} from "./doctor.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/me", getMyProfile);
router.put("/profile", updateMyProfile);
router.put("/availability", updateMyAvailability);

export default router;
