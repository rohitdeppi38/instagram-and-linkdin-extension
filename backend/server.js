const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(bodyParser.json({ limit: "10mb" }));

app.post("/scrape-profile", router);

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
