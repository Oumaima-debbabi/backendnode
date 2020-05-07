const router = require("express").Router();
const Admin = require("../model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// router.post("/register ",async (req, res, next) => {
//   try {
//     const { numero_telephone, name,annee_naissance,profession,email,code_postal,adresse, password ,prenom,statut,civilite} = req.body
//     const hashedPassword = await hashPassword(password);
//     const newadmin = new admin({ numero_telephone,code_postal,adresse,name,annee_naissance,profession,email,prenom,statut,civilite, password: hashedPassword});
//     const accessToken = jwt.sign({ adminId: newadmin._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d"
//     });
//     newadmin.accessToken = accessToken;
//     await newadmin.save();
//     res.json({
//       data: newadmin,
//       message: "You have signed up successfully"
//     })
//   } catch (error) {
//     next(error)
//   } })
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
  const emailExit = await Admin.findOne({
    email: req.body.email
  });

  if (emailExit) return res.status(400)
  {
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  // create new association
  const admin = new Admin({
    
 name: req.body.name,
 prenom:req.body.prenom,
numero:req.body.numero,
date_naissance:req.body.date_naissance,
email:req.body.email,
code_postal:req.body.code_postal,
 adresse: req.body.adresse,
 password:hashedPassword,
  });

  try {
    const savedAdmin= await admin.save();
    res.send(savedAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
});

// association login
router.post("/login", async (req, res) => {
  // checking association email id in database
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send("Email is wrong");

  // checking password
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // creat and assign a token
  const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token: token });
});
// router.post("/addassocia",function(req, res){
//  {
//     const admin=new admin({
//     name: req.body.name,
//      prenom:req.body.prenom,
//      type_activite:req.body.type_activite,
//     numero_admin:req.body.numero_admin,
//     date_naissance:req.body.date_naissance,
//     adresse_email:req.body.adresse_email,
//      adresse: req.body.adresse,
//      secteur:req.body.secteur,
  
//     });
//     admin.save(function (err)
//     {
//     if(err)
//     {console.log(err)
//      res.json ({state:'no',msg:'vous avez un erreur'})
//     }
//     else
//     {
//       res.json({state:'yes',msg:"admin ajouter"})
//     }
//     })
  
  
//   }
//   })
// router.get("/", async (req, res) => {
//   try {
//     const admins = await admin.find()
//     .populate('secteur');
//     res.json(admins);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });
router.get("/", async (req, res) => {
  try {
    const admins = await admin.find();
    res.json(admins);
  } catch (error) {
    res.json({ message: error });
  }
});

// Single admin
router.get("/:adminId", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.adminId).select("secteur secteur_id")
    .populate('secteur');
    res.json(admin);
  } catch (error) {
    res.json({ message: error });
  }
});
// router.post("/addassocia", async (req, res) => {  
//   // create new admin
//   const admin = new admin({
//     name: req.body.name,
//     //      prenom:req.body.prenom,
//     //      type_activite:req.body.type_activite,
//     //     numero_admin:req.body.numero_admin,
//     //     date_naissance:req.body.date_naissance,
//          adresse_email:req.body.adresse_email,
//        adresse: req.body.adresse,
//          secteur:req.body.secteur,
//   });

//   try {
//     const savedAdmin= await admin.save();
//     res.send(savedAdmin);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
module.exports = router;