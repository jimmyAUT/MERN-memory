import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import 'dotenv/config';

import postRoutes from "./routes/posts.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes); //set express middleware


// mondb cloud Altas
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
// mongoose.set("useFindAndModify", false);
