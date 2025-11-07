require('dotenv').config();
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/connection");
const userRoutes = require("./routes/userRoute");
const petRoutes = require("./routes/petRoute");
const foundPetRoutes = require("./routes/foundPetRoute");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());

app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

connectDB();

app.use("/pets", petRoutes);
app.use("/user", userRoutes);
app.use("/found-pets", foundPetRoutes);


app.use(express.static(path.join(__dirname, "build")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
