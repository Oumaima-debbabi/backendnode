const router = require("express").Router();
const Benevole = require("../model/Benevole");
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
  const emailExit = await User.findOne({
    email: req.body.email
  });

  if (emailExit) return res.status(400)
  {
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  // create new association
  const benevole = new Benevole({
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
 association:req.body.association

  });

  try {
    const savedBenevole= await benevole.save();
    res.send(savedBenevole);
  
  } catch (error) {
    res.status(400).send(error);
  }
});

// association login
router.post("/login", async (req, res) => {
  // checking association email id in database
  const benevole = await Benevole.findOne({ email: req.body.email });
  if (!benevole) return res.status(400).send("Email is wrong");

  // checking password
  const validPass = await bcrypt.compare(req.body.password, benevole.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // creat and assign a token
  const token = jwt.sign({ _id: benevole._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token: token });
});
router.get("/", async (req, res) => {
  try {
    const benevoles = await Benevole.find();
    res.json(benevoles);
  } catch (error) {
    res.json({ message: error });
  }
});

// Single association
router.get("/:benevoleId", async (req, res) => {
  try {
    const benevole = await Benevole.findById(req.params.benevoleId);
    res.json(benevole);
  } catch (error) {
    res.json({ message: error });
  }
});
  // Delete Assoication
 // Delete Mission
  router.delete("/:benevoleId",async (req, res) => {
  try {
    const removeBenevole = await Benevole.findByIdAndDelete(req.params.benevoleId);
    res.json(removeBenevole);
  } catch (error) {
    res.json({ message: error });
  }
  });
router.post("/update/:id",function (req, res) {
		Benevole.findById(req.params.id, function(err, benevole) {
		  if (!benevole)
			res.status(404).send("Record not found");
		  else {
        benevole.name= req.body.name,
        benevole.email= req.body.email,
        benevole.statut=req.body.statut,
        benevole.civilite= req.body.civilite,
        benevole.prenom=req.body.prenom,
        benevole.adresse= req.body.adresse,
        benevole.numero_telephone=req.body.numero_telephone,
        benevole.code_postal=req.body.code_postal,
        benevole.annee_naissance=req.body.date_naissance,
        benevole.profession=req.body.profession,
        benevole.role=req.body.role,
        benevole.association=req.body.association,
        benevole.isVerified = false;
			benevole.save().then(benevole => {
				res.json('Update complete');
			})
			.catch(err => {
				  res.status(400).send("unable to update the database");
			});
		  }
		});
	  });
module.exports = router;

