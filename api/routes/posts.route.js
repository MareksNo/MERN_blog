import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getposts,
  deletepost,
  updatepost,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete("/delete/:postId/:userId", verifyToken, deletepost);
router.put("/update/:postId/:userId", verifyToken, updatepost);

export default router;
