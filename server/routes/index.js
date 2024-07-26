import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import todoController from "../controllers/todoController.js";
const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.me);
router.post("/createTodo", authMiddleware, todoController.create);
router.get("/read", authMiddleware, todoController.readTodo);
router.delete("/deleteTodo/:id", authMiddleware, todoController.deleteTodo);

export default router;
