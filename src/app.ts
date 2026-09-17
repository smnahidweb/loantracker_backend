import express, { Application, Request, Response } from "express";
import { indexRoutes } from "./route";


const app:Application = express();

app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use("/api", indexRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Loan Tracker Backend is running');
});

export default app;