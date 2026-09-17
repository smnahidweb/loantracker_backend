import express, { Application, Request, Response } from "express";
import { indexRoutes } from "./route";
import cors from "cors";

const app:Application = express();

app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,               
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use("/api", indexRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Loan Tracker Backend is running');
});

export default app;