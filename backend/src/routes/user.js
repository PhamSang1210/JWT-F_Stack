import express from "express";
const router = express.Router();

import UserController from "../app/controllers/UserController.js";
import verifyToken from "../app/middleware/verifyToken.js";
import verifyTokenAndAdmin from "../app/middleware/verifyTokenAndAdmin.js";
router.put("/update/:id", UserController.updateUser);
router.delete(
    "/delete/:id",
    verifyTokenAndAdmin.VerifyTokenAndAdmin,
    UserController.deleteUser
);
router.get("/", verifyToken.verifyToken, UserController.getAllUsers);
export default router;
