import express from "express";
import localStorageRouter from "./routes/localStorage";
import { AppDataSource } from "./config/db";
import cors from "cors";

const app = express(); 

app.use(cors({
  origin: "http://localhost:5173", // Sadece frontend'e izin ver
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  allowedHeaders: ["Content-Type"]
}))

app.use(express.json());

app.use("/api/local_storage", localStorageRouter);

AppDataSource.initialize()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
