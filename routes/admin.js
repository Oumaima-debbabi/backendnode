const router = require("express").Router();
const Admin = require("../model/Admin");
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
role:"admin",


  });

  try {
    const savedAdmin= await admin.save();
    res.send(savedAdmin).populate(user)
  } catch (error) {
    res.status(400).send(error);
  }
});

// association login
// router.post("/login", async (req, res) => {
//   // checking association email id in database
//   const admin = await Admin.findOne({ email: req.body.email });
//   if (!admin) return res.status(400).send("Email is wrong");

//   // checking password
//   const validPass = await bcrypt.compare(req.body.password, admin.password);
//   if (!validPass) return res.status(400).send("Invalid password");

//   // creat and assign a token
//   const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
//   res.header("x-access-token", token).send({ token: token });
// });
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return next(new Error('Email does not exist'));
    const validPassword = await validatePassword(password, admin.password);
    if (!validPassword) return next(new Error('Password is not correct'))
    const accessToken = jwt.sign({ adminId: admin._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d"
    });
    await Admin.findByIdAndUpdate(admin._id, { accessToken })
    res.status(200).json({
      data: { email: admin.email,
          name:admin.name,
           role: user.role },
      accessToken
    })
  } catch (error) {
    next(error);
  }
}) 
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.json({ message: error });
  }
});

// Single association
router.get("/:adminId", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.adminId)
    .populate('User');
    res.json(admin);
  } catch (error) {
    res.json({ message: error });
  }
});
router.put("/:AdminId", async (req, res) => {
  try {
    const Admin = {
    
 nom_association: req.body.nom_association,
 nom_responsable:req.body.nom_responsable,
numero_association:req.body.numero_association,
date_creation:req.body.date_creation,
email:req.body.email,
code_postal:req.body.code_postal,
 adresse: req.body.adresse,
 password:hashedPassword,
    
    };
  
    const updatedAdmin = await Admin.findByIdAndUpdate(
    { _id: req.params.adminId },
    admin
    );
    res.json(updatedAdmin);
  } catch (error) {
    res.json({ message: error });
  }
  });
  
  // Delete admin
  router.delete("/:adminId",async (req, res) => {
  try {
    const removeAdmin= await Association.findByIdAndDelete(req.params.adminId);
    res.json(removeAdmin);
  } catch (error) {
    res.json({ message: error });
  }
  });

module.exports = router;