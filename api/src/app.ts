import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from "express";
import bodyParser from "body-parser";
import { Server } from "http";
import createHttpError from "http-errors";
import { config } from "dotenv";
import connectDB from "./config/connectDB";
import initWebRoutes from "./routes/web";
import cors from "cors";

config();

const app: Application = express();

// Enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect Routes
initWebRoutes(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);

connectDB();

const PORT: number = Number(process.env.PORT) || 9696;

const server: Server = app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
