import { Router } from "express";
import multer from "multer";
import UserController from "./controller";
import path from "path";
import { verify } from "../../middleware/jwt";

// Use /tmp/uploads because Vercel serverless is read-only outside /tmp
const uploadDir = path.join("/tmp", "uploads");

// Ensure the folder exists (safe for serverless)
import fs from "fs";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append original extension
  },
});

const userRouter = Router();
const upload = multer({ storage });
const { update } = UserController;

userRouter.put("/user", verify, upload.single("image"), update);

export default userRouter;
