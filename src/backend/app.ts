import express from "express";
import localStorageRouter from "./routes/localStorage";
import { AppDataSource } from "./config/db";
import "reflect-metadata";

const app = express(); 

app.use(express.json());

app.use("/api/localStorage", localStorageRouter);

AppDataSource.initialize()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
