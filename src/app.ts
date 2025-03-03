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
  "https://katerynabachkalo.github.io",
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Дозволяє запити з дозволених доменів
    } else {
      callback(new Error("Not allowed by CORS")); // Відмовляє, якщо домен не в списку
    }
  },
  credentials: true, // Дозволяє передавати куки або авторизацію
  optionsSuccessStatus: 200, // Для старих браузерів
  allowedHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
