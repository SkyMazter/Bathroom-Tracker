import express from "express";
import cors from "cors";
import bathroomRouter from "./routes/bathrooms.js"
import nycPublicDataRouter from "./routes/nycPublicData.js"

const app = express();
const port = 3001;
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization"
  ],
  credentials: true,
  origin: ["http://localhost:5173", "http://localhost:4173"],
};

//middleware
app.use(express.json());
app.use(cors(options));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/bathrooms", bathroomRouter)
app.use("/nycPublicData", nycPublicDataRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});