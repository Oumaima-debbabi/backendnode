const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var fs = require("fs");
const multer = require('multer');
//const upload = multer({dest: __dirname + '/uploads/images'});
const UserController = require('../controller/UserController');

const upload = require('../middelware/upload')
//require('../middelware/cloudinary')

const addimg = require('../controller/mission');
router.post('/upload', [
  upload.single('image'),
  addimg.uploadFile
])
router.post("/register",async (req, res) => {
  // checking user email id in database
  const emailExit = await User.findOne({
    email: req.body.email
 
  });

  if (emailExit) return res.status(400).send("Email already exists");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = new User({
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
   imageUrl:req.body.imageUrl
  });

  try {
    const savedUser = await user.save();
    
  
  }
  catch (error) {
    res.status(400).send(error);
  }

});
// router.post("/update/:id", upload.single('imageUrl'),function (req, res) {
//   Association.findById(req.params.id, function(err, association) {
//     if (!association)
//     res.status(404).send("Record not found");
//     else {
//   association.lien=req.body.lien,
//   association.imageUrl=req.body.imageUrl
  
//     association.save().then(association => {
//       res.json('Update complete');
//     })
//     .catch(err => {
//         res.status(400).send("unable to update the database");
//     });
//     }
//   });
//   });
// router.post("/updatePhoto/:userId",upload.single('imageUrl'),async (req, res)=>{
//   console.log('file', req.file);
//   console.log('id', req.params.userId);
//   const id = req.params.userId;

//   if (req.file) {
//     var photo = req.file.path;
//   }else{
//     var photo= "assets/img/jobs/avatar-1.jpg";
//   }

//   User.update({_id: id}, {$set: {imageUrl: immageUrl}})
//     .exec()
//     .then(function (result) {

//       const response = {
//         message: "Candidat updated"

//       };

//       res.status(200).json(response)


//     }).catch(function (err) {
//     console.log(err);
//     res.status(500).json({
//       error: err
//     });
//   });

// },)
// router.post("/updateProfil/:userId",upload.single('Photo'),async (req, res) =>{
//   console.log(req.params.userId);
//   const id = req.params.userId;
//   const updateOps = req.body;
//   console.log('body', req.body);

//     updateOps['Photo'] = 'uploads/2019-07-02T22-29-36.395Zamin.png';

//   console.log('updateOps', updateOps);
//   User.update({_id: id}, {$set: updateOps})
//     .exec()
//     .then(function (result) {

//       const response = {
//         message: "user updated"

//       };

//       res.status(200).json(response)


//     }).catch(function (err) {
//     console.log(err);
//     res.status(500).json({
//       error: err
//     });
//   });


// },
//)
router.get('/getAll', UserController.getAll);
//router.post('/login', UserController.login);
router.delete('/user/:userId', UserController.deleteUser);
router.post("/login", async (req, res) => {
  // checking user email id in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is wrong");

  // checking password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // creat and assign a token
  //const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "1d"
       });
  res.header("auth-token", token).send({ token: token,
     email:user.email,name:user.name,role:user.role,
     profession:user.profession,prenom:user.prenom,
  adresse:user.adresse,annee_naissance:user.annee_naissance,imageUrl:user.imageUrl,
  numero_telephone:user.numero_telephone,
_id:user._id
});
     
})

router.post("/updatePhoto/:id", upload.single('imageUrl'),function (req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user)
    res.status(404).send("Record not found");
    else {
  
    user.imageUrl=req.body.imageUrl,
  
    user.save().then(user => {
      res.json('Update complete');
    })
    .catch(err => {
        res.status(400).send("unable to update the database");
    });
    }
  });
  });
  router.post("/update/:id",upload.single('imageUrl'),function (req, res) {
    User.findById(req.params.id, function(err, user) {
      if (!user)
      res.status(404).send("Record not found");
      else {
      user.name= req.body.name,
      user.statut=req.body.statut,
      user.civilite= req.body.civilite,
      user.prenom=req.body.prenom,
      user.adresse= req.body.adresse,
      user.numero_telephone=req.body.numero_telephone,
      user.code_postal=req.body.code_postal,
      user.annee_naissance=req.body.annee_naissance,
      user.profession=req.body.profession,
     
      user.save().then(user => {
        res.json('Update complete');
      })
      .catch(err => {
          res.status(400).send("unable to update the database");
      });
      }
    });
    });
  router.get("/:userId", async (req, res) => {
		try {
		  const user = await User.findById(req.params.userId);
		  res.json(user);
		} catch (error) {
		  res.json({ message: error });
		}
	  });
module.exports = router;