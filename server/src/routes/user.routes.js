import express from "express";
import { getUsers, deleteUser, updateUserRole, inviteUser } from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(protect, getUsers);
router.route("/invite").post(protect, inviteUser);
router.route("/:id").delete(protect, deleteUser);
router.route("/:id/role").put(protect, updateUserRole);

export default router;
