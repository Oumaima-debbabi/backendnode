const router = require("express").Router();
const Association = require("../model/Association");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fs=require('fs');
const multer=require('multer');
const upload=multer({dest:__dirname+"/uploads/images"})


router.post("/addimage",upload.single("image"),function(req,res){
  var file=__dirname+"/uploads/images/"+req.file.originalname
  fs.readFile(req.file.path,function(err,data) {
  fs.writeFile(file,data,function(err){
   if(err){
     console.error(err)
    var responce ={
    message:'sorry file couldnt  upload',
    filename:req.file.originalname,

    }}
  
   else
   {
     res.json({state:'ok',msg:'okkk ajouter'})
   
   }
   });
 
  }
  )
 })
router.post("/register", upload.single("image") ,async (req, res) => {
  // checking association email id in database
  const emailExit = await Association.findOne({
    email: req.body.email
  });

  if (emailExit) return res.status(400)
  {
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  // create new association
  const association = new Association({
    nombre_membre:req.body.nombre_membre,
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    statut:req.body.statut,
civilite: req.body.civilite,
prenom:req.body.prenom,
adresse: req.body.adresse,
numero_telephone:req.body.numero_telephone,
code_postal:req.body.code_postal,
annee_naissance:req.body.date_naissance,
profession:req.body.profession,
role:req.body.role,
 nom_association: req.body.nom_association,
 numero_association:req.body.numero_association,
date_creation:req.body.date_creation,
code_postal:req.body.code_postal,
 adresse_asso: req.body.adresse_asso,
 password:hashedPassword,
secteur:req.body.secteur,
  });

  try {
    const savedAssociation= await association.save();
    res.send(savedAssociation).populate('Secteur');
  } catch (error) {
    res.status(400).send(error);
  }
});



router.get("/", async (req, res) => {
  try {
    const associations = await Association.find();
    res.json(associations);
  } catch (error) {
    res.json({ message: error });
  }
});

// Single association
router.get("/:associationId", async (req, res) => {
  try {
    const association = await Association.findById(req.params.associationId);
    res.json(association);
  } 
    catch (error) {
    res.json({ message: error });
  }
});

router.put("/:AssoicationId", async (req, res) => {
  try {
    const Assoication = {
    
    nom_association: req.body.nom_association,
    nom_responsable:req.body.nom_responsable,
    numero_association:req.body.numero_association,
  date_creation:req.body.date_creation,
  email:req.body.email,
    code_postal:req.body.code_postal,
     adresse: req.body.adresse,
  password:hashedPassword,
  secteur:req.body.secteur,
    
    };
  
    const updatedAssoication = await Assoication.findByIdAndUpdate(
    { _id: req.params.AssoicationId },
    assoication
    );
    res.json(updatedAssoication);
  } catch (error) {
    res.json({ message: error });
  }
  });
  
  // Delete Assoication
  router.delete("/:associationId",async (req, res) => {
  try {
    const removeAsoociation= await Association.findByIdAndDelete(req.params.associationId);
    res.json(removeAsoociation);
  } catch (error) {
    res.json({ message: error });
  }
  });

module.exports = router;