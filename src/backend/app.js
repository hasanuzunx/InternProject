import express from "express";
import localStorageRouter from "./routes/localStorage.js";


const app = express();
app.use(express.json())



app.use('/api/localStorage',localStorageRouter);


app.listen(3000);
