import "@babel/polyfill";
import createError, { HttpError } from "http-errors";
import express, { json, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import api from "./routes/api";

const app = express();

app.use(cookieParser());

app.use(morgan("combined"));

app.use(express.urlencoded({ extended: false }));

app.use(json());

app.use("/v1", api);

app.get("/", (req, res) => {
  res.send("Welcome to cassava");
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page

  console.log(err.message);
  res.status(err.status || 500).json({
    status: "fail",
    message: err.message,
  });
});

export default app;
