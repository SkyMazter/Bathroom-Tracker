import express from "express";
import cors from "cors";
import bathroomRouter from "./routes/bathrooms.js";
import nycPublicDataRouter from "./routes/nycPublicData.js";
import geocodeRouter from "./routes/geocoding.js";

const app = express();
const port = 3001;
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
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

app.use("/bathrooms", bathroomRouter);
app.use("/nycPublicData", nycPublicDataRouter);
app.use("/geo", geocodeRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
