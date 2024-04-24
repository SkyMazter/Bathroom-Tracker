import express from "express";
import cors from "cors";
import bathroomRouter from "./routes/bathrooms.js"
import nycPublicDataRouter from "./routes/nycPublicData.js"

const app = express();
const port = 3001;

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/bathrooms", bathroomRouter)
app.use("/nycPublicData", nycPublicDataRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});