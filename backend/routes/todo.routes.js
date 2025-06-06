import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controller/todo.controller.js";
import { authenticate } from "../middlewares/authorized.js";

const router = express.Router();

router.post("/create",authenticate,createTodo);
router.get("/fetch",authenticate,getTodo);
router.put("/update/:id",authenticate,updateTodo);
router.delete("/delete/:id",authenticate,deleteTodo);


export default router;