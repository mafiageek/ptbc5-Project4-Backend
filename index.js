import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || "5000";

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
