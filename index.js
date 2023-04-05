import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import listingRoutes from "./routes/listing.js";
dotenv.config();

const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", listingRoutes);

app.get("/", (req, res) => {
  res.send(process.env);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
