const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


dotenv.config();
app.use("/images", express.static(path.join("uplods/images")));

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

const propositonRoutes=require("./routes/proposition");
const benevoleRoutes=require("./routes/benevole");
const partenaireRoutes=require("./routes/partenaire");

// Middlewares
app.use(express.json());
app.use(cors());


app.use(express.static('public'))
//app.use("/images", express.static(path.join("uplods/images")));
// route Middlewares
app.use("/api/user", userRoutes);
app.use("/api/association",associationRoutes);
app.use("/api/secteur",secteurRoutes);
app.use("/api/mission",missionRoutes);
app.use("/api/evenet",evenetRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/partenaire", partenaireRoutes);
app.use("/api/proposition", propositonRoutes);
app.use("/api/benevole", benevoleRoutes)

app.listen(4000, () => console.log("server up and runing on port 4000!"));