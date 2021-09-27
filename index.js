const mongoose = require("mongoose");
const auth = require("./routes/auth");
const cors = require("cors");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/dev")
  .then(() => console.log("Connected to MongoDb ...."))
  .catch((error) => console.log("Failed to connect to MongoDb"));

app.use(express.json());
app.use(cors());
app.use("/api/auth", auth);

const port = process.env.PORT || 8075;
app.listen(port, () => console.log(`Listening on port ${port} ....`));
