const router = require("express").Router();
const Association = require("../model/Association");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Secteur = require("../model/Secteur");

const fs=require('fs');
//const multer=require('multer');
//const upload=multer({dest:__dirname+"/uploads/images"})
const upload = require('../middelware/upload')
const fileimg = require('../controller/mission');


// router.post("/addimage",upload.single("image"),function(req,res){
//   var file=__dirname+"/uploads/images/"+req.file.originalname
//   fs.readFile(req.file.path,function(err,data) {
//   fs.writeFile(file,data,function(err){
//    if(err){
//      console.error(err)
//     var responce ={
//     message:'sorry file couldnt  upload',
//     filename:req.file.originalname,

//     }}
  
//    else
//    {
//      res.json({state:'ok',msg:'okkk ajouter'})
   
//    }
//    });
 
//   }
//   )
//  })
router.post("/register", upload.single('imageUrl'),async (req, res)  => {
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
    annee_naissance:req.body.annee_naissance,
    profession:req.body.profession,
   role:req.body.role,
 nom_association: req.body.nom_association,
 numero_association:req.body.numero_association,
date_creation:req.body.date_creation,
 adresse_asso: req.body.adresse_asso,
secteur:req.body.secteur,
imageUrl:req.body.imageUrl,

  });

  try {
    const savedAssociation= await association.save();
    res.send(savedAssociation);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get(	"/getAll", function(req, res, next) {

  Association.find({}).populate("secteur","-__v").
  exec(function(err, associations){
    if (err){
      next(err);
    } else{

      res.json({status:"success", message: "associations list found!!!", data:{associations}});

    }

  }
  );

},)
router.post("/after", upload.single('imageUrl'),async (req, res) => {  
  // create new association 
  const association = new Association({
  lien:req.body.lien,
  imageUrl:req.body.imageUrl,
  });

  try {
    const savedAssociation = await association.save();
    res.send(savedAssociation);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post('/upload', [
  upload.single('image'),
  fileimg.uploadFile
])
router.post('/signup',fileimg.signup
)
router.get("/", async (req, res) => {
  try {
    const associations = await Association.find({});
    res.json(associations);
  } catch (error) {
    res.json({ message: error });
  }
});
router.get("/get", async (req, res) => {
  try {
    const associations = await Association.find().limit(8);
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
router.get("/search/:", async (req, res) => {
  try {
    const association = await Association.findOne(req.params.nom_association);
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
  router.post("/update/:id", upload.single('imageUrl'),function (req, res) {
		Association.findById(req.params.id, function(err, association) {
		  if (!association)
			res.status(404).send("Record not found");
		  else {
    association.lien=req.body.lien,
    association.imageUrl=req.body.imageUrl
	  
			association.save().then(association => {
				res.json('Update complete');
			})
			.catch(err => {
				  res.status(400).send("unable to update the database");
			});
		  }
		});
	  });
  router.put("/:AssoicationId", upload.single('imageUrl'),async (req, res) => {
    try {
      const Assoication = {
      imageUrl: req.body.imageUrl,
      lien:req.body.lien,

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