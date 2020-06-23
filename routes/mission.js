const router = require("express").Router();
const Mission = require("../model/Mission");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
var fs = require("fs")
const multer = require('multer');
//const upload = multer({dest:__dirname + 'uploadsimages'});
///const cloudinary = require('cloudinary')
const upload = require('../middelware/upload')
//require('../middelware/cloudinary')

const mission = require('../controller/mission');
const User = require("../model/User");
const Association = require("../model/Association");

// router.post('/mission', upload.single('image'), async (req, res) => {
//   const result = await cloudinary.v2.uploader.upload(req.file.path)
//   const mission = new Mission()
//   mission.sujet=req.body.sujet,
//   mission.besoin=req.body.besoin,
//   mission.nombre_preson=req.body.nombre_preson,
//   mission.nom_association1=req.body.nom_association1,
//   mission.lieu=req.body.lieu,
//   mission.date=req.body.date,
//   mission.datefin=req.body.datefin,
//   mission.type=req.body.type,
//   mission.action=req.body.action,
 
//   mission.description=req.body.description,
//   mission.qd=req.body.qd
//   mission.imageUrl = result.secure_url
//   await mission.save()
//   res.send({
//     message: 'mission is Created'
//   })
// })
router.get("/getById/:missionId", function(req, res) {
  console.log(req.body);
  Mission.findById(req.params.missionId, function(err,missionInfo){
    if (err) {
      next(err);
    } else {
      res.json({status:"success", message: "secteur found!!!", data:{missions: missionInfo}});
    }
  });
})

router.post("/",verify, upload.single('imageUrl'),async (req, res) => {  
  // create new association 
  const mission = new Mission({
        sujet:req.body.sujet,
  besoin:req.body.besoin,
  nombre_preson:req.body.nombre_preson,
  nom_association1:req.body.associationId,
  lieu:req.body.lieu,
  date:req.body.date,
  datefin:req.body.datefin,
  type:req.body.type,
  action:req.body.action,
  imageUrl:req.body.imageUrl,
  description:req.body.description,
  qd:req.body.qd,
  creator:req.user.userId
  });

  try {
    const saveMission = await mission.save();
    res.send(saveMission);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post('/upload', [
  upload.single('image'),
  mission.uploadFile
])

  router.post("/update/:id",function (req, res) {
		Mission.findById(req.params.id, function(err, mission) {
		  if (!mission)
			res.status(404).send("Record not found");
		  else {
			mission.sujet=req.body.sujet,
      mission.besoin=req.body.besoin,
      mission.nombre_preson=req.body.nombre_preson,
      mission.nom_association1=req.body.nom_association1,
      mission.lieu=req.body.lieu,
      mission.date=req.body.date,
      mission.datefin=req.body.datefin,
      mission.type=req.body.type,
      mission.action=req.body.action,
	  
			mission.save().then(mission => {
				res.json('Update complete');
			})
			.catch(err => {
				  res.status(400).send("unable to update the database");
			});
		  }
		});
	  });
router.get("/get4", async (req, res) => {
  try {
    const missions = await Mission.find().limit(12).populate("nom_association1");
    res.json(missions);
  } catch (error) {
    res.json({ message: error });
  }
});
router.get("/getmissions", async (req, res) => {
  try {
    const missions = await Mission.find({}).populate("nom_association1");
    res.json(missions);
  } catch (error) {
    res.json({ message: error });
  }
});
router.get("/get4/:associationId", async function (req, res) {
  try {
  
    const missions = await Mission.find({creator:req.params.id}).limit(10).populate("nom_association1");
    res.json(missions);
    console.log(associationId)

  } catch (error) {
    res.json({ message: error });
  }
});
// Single mission
// router.post("/addimage",upload.single("image"),function(req,res){
//   var file=__dirname+"/uploads/images/"+req.file.originalname
//   fs.readFile(req.file.path,function(err,data) {
// fs.writeFile(file,data,function(err){
//    if(err){
//      console.error(err)
//     var responce ={
//       message:'sorry file couldnt  upload',
//       filename:req.file.originalname,
//     }}

//    else
//    {
//      res.json({state:'ok',msg:'okkk ajouter'})
 
//    }
//  });

//   }
//   )
// },)

router.put("/:missionId", async (req, res) => {
  try {
    const mission = {
      sujet:req.body.sujet,
      besoin:req.body.besoin,
      nombre_preson:req.body.nombre_preson,
      nom_association1:req.body.nom_association1,
      lieu:req.body.lieu,
      date:req.body.date,
      datefin:req.body.datefin,
      type:req.body.type,
      action:req.body.action,
    };
  
    const updatedMission = await Mission.findByIdAndUpdate(
    { _id: req.params.MissionId },
    mission
    );
    res.json(updatedMission);
  } catch (error) {
    res.json({ message: error });
  }
  });
  router.get("/:missionId", async (req, res) => {
		try {
		  const mission = await Mission.findById(req.params.missionId).populate("nom_association1","-__v");
		  res.json(mission);
		} catch (error) {
		  res.json({ message: error });
		}
	  });
  // Delete Mission
  router.delete("/:missionId", async (req, res) => {
    try {
      const removeMission = await Mission.findByIdAndDelete(req.params.missionId);
      res.json(removeMission);
    } catch (error) {
      res.json({ message: error });
    }
    });
    router.get("/", verify,async (req, res) => {
      try {
        const missions = await Mission.find({creator:req.user.userId}).populate("nom_association1","-__v").populate("creator");
        res.json(missions);
      } catch (error) {
        res.json({ message: error });
      }
    });
    router.get("/test/:creatorId",async (req, res) => {
      try {
        const missions = await Mission.find({creator:Object(req.params.creatorId)})
        .populate("nom_association1","-__v").populate("creator");
        res.json(missions);
      } catch (error) {
        res.json({ message: error });
      }
    });
    // router.get('/miss', verify, (req, res, next) => {
    //   Mission.find({ creator: req.user.user._id })
      
    //     .exec((err, mission) => {
    //       if (err) {
    //         res.json({
    //           success: false,
    //           message: "Couldn't find your order"
    //         });
    //       } else {
    //         res.json({
    //           success: true,
    //           message: 'Found your order',
    //           mission: mission
    //         });
    //       }
    //     });
    // });
  
    router.get("/particier/:missionId/:userId",verify,function(req ,res){
      const missionId = req.params.missionId;
      const userId=req.params.userId;
  
      Mission.findById({_id: missionId})
        .select('userId')
        .exec(function (err, data) {
  
          if (err) {
  
            console.log(err)
  
          }
          const response = {
            exist: data.filter(function(a){
              return a.id === user.userId
            })};
            if (response.exist.length === 0 ){
               res.send({ result: true })
            }else{
  
                res.send({ result: false })
              }
  
        })
  
  
  
    }
)
module.exports = router;