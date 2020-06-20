const router = require("express").Router();
const Benevole = require("../model/Benevole");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Missionss = require('../routes/mission');

const fs=require('fs');
//const multer=require('multer');
//const upload=multer({dest:__dirname+"/uploads/images"})
const upload = require('../middelware/upload')
const fileimg = require('../controller/mission');
const { verify } = require("crypto");
const Mission = require("../model/Mission");
router.post('/upload', [
  upload.single('image'),
  fileimg.uploadFile
])
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
router.post("/register",upload.single('imageUrl'),async (req, res) => {
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
 annee_naissance:req.body.annee_naissance,
 profession:req.body.profession,
 imageUrl:req.body.imageUrl,
 role:"benevole",
 association:req.body.associationId
 //association:req.body.association

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
    const benevoles = await Benevole.find().populate("association","-__v");
    res.json(benevoles);
  } catch (error) {
    res.json({ message: error });
  }
});


//liste participants
router.get("/getparticipant/:missionId", async (req, res) => {
  try { 
    const benevoles = await Benevole.find({missions:
      {missionId:req.params.missionId}})
    .populate("association","-__v");
  
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
        benevole.annee_naissance=req.body.annee_naissance,
        benevole.profession=req.body.profession,
        benevole.role=req.body.role,
        benevole.association=req.body.association,
        benevole.imageUrl=req.body.imageUrl,
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

    router.get("/participer/:benevoleId/:missionId",async function (req, res) {
    
       try {
           let missionId = req.params.missionId;
           let benevoleId = req.params.benevoleId;
           let benevole = await Benevole.findById(benevoleId)
           //console.log(benevoleId)
           let inmission = false;
           let missionLength = benevole.missions.length;
           for (let i = 0; i < missionLength; i++) {
               if (benevole.missions[i].missionId === missionId) {
                 inmission = true;
                   break;
               }
               //console.log(missionId)
           }
           if (!inmission) {
               benevole.missions.push({ missionId: missionId});
                await benevole.save();
               res.send({status:1,message:"Added Successfully"}).status(200);
           } 
      } catch (error) {
           res.send(error);
      }
  },
)
router.get("/remove/:benevoleId/:missionId", async function(req,res){
  try{
      let benevoleId = req.params.benevoleId;
    
      let missionId = req.params.missionId;
      let benevole = await Benevole.findById(benevoleId)
      let temparray = [];
      let missionLength = benevole.missions.length;
      for(let i=0;i<missionLength;i++)
      {
          
          if(benevole.missions[i].missionId===missionId){
              //console.log('hello');
              benevole.missions.splice(i,1);
              //console.log(benevole.missions)
              benevole.save();
              break;
          }
      }
      res.send(benevole.missions).status(200);


  }catch(err)
  {
      res.send("Internal Server Erro").status(500);
  }
},)
router.get("/showmission/:benevoleId",async function (req, res) {
  try {
      let benevoleId = req.params.benevoleId;
      let benevole = await Benevole.findById(benevoleId);
      let temparray = [];
      let missionLength = benevole.missions.length;
      //console.log(missionLength);
      if (missionLength > 0) {
          for (let i = 0; i < missionLength; i++) 
          {
              let missionId = benevole.missions[i].missionId;
              let missiondetails = await Mission.findById(missionId);
              temparray.push({mission:missiondetails});
          }
          res.send(temparray).status(200);
      
      } 
  } catch (error) {
      res.send("Internal Error").status(500);
  }
},)
module.exports = router;

