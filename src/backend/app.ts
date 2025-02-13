import express from "express";
import localStorageRouter from "./routes/localStorage";

const app = express(); 

app.use(express.json());

app.use("/api/localStorage", localStorageRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
