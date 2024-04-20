import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
