const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
dotenv.config();
app.use('/uploads', express.static('uploads'));

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);
// Import routes
const userRoutes = require("./routes/user");
const associationRoutes =require("./routes/association");
const secteurRoutes=require("./routes/secteur");
const evenetRoutes=require("./routes/evenet");
const missionRoutes=require("./routes/mission");
const adminRoutes=require("./routes/admin");
//const PartenaireRoutes=require("./routes/partenaire");
// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
// route Middlewares
app.use("/api/user", userRoutes);
app.use("/api/association",associationRoutes);
app.use("/api/secteur",secteurRoutes);
app.use("/api/mission",missionRoutes);
app.use("/api/evenet",evenetRoutes);
app.use("/api/admin", adminRoutes);
//app.use("/api/partenaire", PartenaireRoutes);

app.listen(4000, () => console.log("server up and runing on port 4000!"));
