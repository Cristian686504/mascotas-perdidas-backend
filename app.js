require('dotenv').config();
const express = require("express");
var connectDB = require("./db/connection");
const userRoutes = require("./routes/userRoute");
const petRoutes = require("./routes/petRoute");
const path = require("path");
const http = require("http"); const morgan = require("morgan");
const cors = require("cors");

const app = express();
const server = http.createServer(app); // Crear servidor HTTP

const PORT = process.env.PORT;

app.use(morgan("combined")); //Logs detallados de peticiones

app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware para parsear JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

connectDB();

// Usar rutas con prefijos
app.use("/pets", petRoutes);

app.use((req, res) => {
  if (!req.path.startsWith("/pet") && !req.path.startsWith("/user")) {
    res.redirect("/user/mapa");
  } else {
    res.status(404).json({ error: "Ruta no encontrada" });
  }
});

// Usar server.listen en lugar de app.listen
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});