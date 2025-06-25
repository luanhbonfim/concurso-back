const express = require("express");
const cors = require("cors");
require("dotenv").config();

const materiaRoutes = require("./routes/materiaRoutes");
const estudoRoutes = require("./routes/estudoRoutes");
const revisaoRoutes = require("./routes/revisaoRoutes");

const app = express();
app.use(cors({
  origin: "https://concursomayara.netlify.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(express.json());

app.use("/materias", materiaRoutes);
app.use("/estudos", estudoRoutes);
app.use("/revisoes", revisaoRoutes);

module.exports = app;
