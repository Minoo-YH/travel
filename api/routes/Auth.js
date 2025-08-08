import express from "express";
import {
  register,
  login,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  
} from "../controllers/Auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", getUsers);
router.get("/users/:id", getUser);

router.delete("/users/:id",  deleteUser);

router.put("/users/:id", updateUser);


export default router;

