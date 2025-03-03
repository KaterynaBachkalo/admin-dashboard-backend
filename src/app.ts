import { adminRouter, authRouter } from "./routes/api";
import { NextFunction, Request, Response } from "express";
import express from "express";
import logger from "morgan";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "https://katerynabachkalo.github.io",
  "https://admin-dashboard-backend-gules.vercel.app",
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }, // Домен, якому дозволено доступ
  optionsSuccessStatus: 200, // Для старих браузерів, які не підтримують статус 204 для preflight запитів
};

app.use(cors(corsOptions));

app.use(logger(formatsLogger));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/user", authRouter);
app.use("/api/admin", adminRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
