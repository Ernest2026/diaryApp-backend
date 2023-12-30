import { Router } from "express";
import multer from "multer";
import UserController from "./controller";
import path from "path";
import { verify } from "@/middleware/jwt";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); //Appending extension
  },
});

const userRouter = Router();
const upload = multer({ storage });
const { update } = UserController;

userRouter.put("/user", verify, upload.single("image"), update);

export default userRouter;
