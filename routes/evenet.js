const router = require("express").Router();
const Evenement= require("../model/Evenet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
router.post("/",verify, async (req, res) => {  
  // create new association
  const evenement = new Evenement({
   sujet:req.body.sujet,
  nombre_preson:req.body.nombre_preson,
  nom_res:req.body.nom_res,
  lieu:req.body.lieu,
  date:req.body.date,
 contenu:req.body.contenu,
  
  });

  try {
    const savedEvenement= await evenement.save();
    res.send(savedEvenement);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/", async (req, res) => {
  try {
    const evenements = await Evenement.find();
    res.json(evenements);
  } catch (error) {
    res.json({ message: error });
  }
});

// Single 
router.get("/:evenementId", async (req, res) => {
  try {
    const evenement = await evenement.findById(req.params.evenementId);
    res.json(evenement);
  } catch (error) {
    res.json({ message: error });
  }
});

router.put("/:evenementId", async (req, res) => {
  try {
    const Evenement = {
    type_activite: req.body.type_activite,
    
    };
  
    const updatedEvenement = await Evenement.findByIdAndUpdate(
    { _id: req.params.EvenementId },
    evenement
    );
    res.json(updatedEvenement);
  } catch (error) {
    res.json({ message: error });
  }
  });
  
  // Delete Evenement
  router.delete("/:evenementId",async (req, res) => {
  try {
    const removeEvenement = await Evenement.findByIdAndDelete(req.params.evenementId);
    res.json(removeEvenement);
  } catch (error) {
    res.json({ message: error });
  }
  });
  


 
module.exports = router;