const router = require("express").Router();
const Mission = require("../model/Mission");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
var fs = require("fs")
const multer = require('multer');
const upload = multer({dest:__dirname + 'uploadsimages'});


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

router.post("/", async (req, res) => {  
  // create new association
  const mission = new Mission({
        sujet:req.body.sujet,
  besoin:req.body.besoin,
  nombre_preson:req.body.nombre_preson,
  nom_res:req.body.nom_res,
  lieu:req.body.lieu,
  date:req.body.date,
  datefin:req.body.datefin,
  type:req.body.type,
  description:req.body.description,
  qd:req.body.qd
  });

  try {
    const savedMission= await mission.save();
    res.send(savedMission);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/",upload.single('Photo'), function (req, res) {
	var file = __dirname + 'uploadsimages' + req.file.originalname;
  
	fs.readFile(req.file.path, function (err, data) {
  
	  fs.writeFile(file, data, function (err) {
		if (err) {
		  console.error(err);
		  var response = {
			message:'Sorry, file couldn\'t be uploaded.',
		  filename:req.file.originalname
		};
		} else {
		  response = {
			message:'File uploaded successfully',
			filename:req.file.originalname
		  };
  
		 mission = new Mission({
       description:req.body.description,
      sujet:req.body.sujet,
      besoin:req.body.besoin,
      nombre_preson:req.body.nombre_preson,
      nom_res:req.body.nom_res,
      lieu:req.body.lieu,
      date:req.body.date,
      datefin:req.body.datefin,
      type:req.body.type,
		Photo: req.file.originalname
		  });
		  mission.save(function (err) {
  
			if (err) {
			  console.log('erreur dajout utilisateur :', err);
			  res.send({status: 400, message: err})
			}
			else {
			  console.log('ok');
			  res.send({status: 200, message: 'utilisateur créer'})
			}
		  });
		}
		});
  
  
	})
	})
  router.post("/update/:id",function (req, res) {
		Mission.findById(req.params.id, function(err, mission) {
		  if (!mission)
			res.status(404).send("Record not found");
		  else {
			mission.sujet=req.body.sujet,
      mission.besoin=req.body.besoin,
      mission.nombre_preson=req.body.nombre_preson,
      mission.nom_res=req.body.nom_res,
      mission.lieu=req.body.lieu,
      mission.date=req.body.date,
      mission.datefin=req.body.datefin,
      mission.type=req.body.type,
      mission.description=req.body.description,
      mission.qd=req.body.qd,
			mission.save().then(mission => {
				res.json('Update complete');
			})
			.catch(err => {
				  res.status(400).send("unable to update the database");
			});
		  }
		});
	  });
router.get("/", async (req, res) => {
  try {
    const missions = await Mission.find();
    res.json(missions);
  } catch (error) {
    res.json({ message: error });
  }
});
router.get("/get4", async (req, res) => {

    try {
      const missions = await Mission.find().limit(4);
     
      res.json(missions);
   
    }
    
    catch (error) {
    res.json({ message: error });

  }
  

});
// Single mission

router.put("/:missionId", async (req, res) => {
  try {
    const mission = {
      sujet:req.body.sujet,
      besoin:req.body.besoin,
      nombre_preson:req.body.nombre_preson,
      nom_res:req.body.nom_res,
      lieu:req.body.lieu,
      date:req.body.date,
      datefin:req.body.datefin,
      type:req.body.type,
      description:req.body.description,
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
		  const mission = await Mission.findById(req.params.missionId);
		  res.json(mission);
		} catch (error) {
		  res.json({ message: error });
		}
	  });
  // Delete Mission
  router.delete("/:missionId",async (req, res) => {
  try {
    const removeMission = await Mission.findByIdAndDelete(req.params.missionId);
    res.json(removeMission);
  } catch (error) {
    res.json({ message: error });
  }
  });


module.exports = router;