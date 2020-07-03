const router = require("express").Router();
const Experience = require("../model/Experience");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

//const upload = multer({dest:__dirname + 'uploadsimages'});
///const cloudinary = require('cloudinary')
const User = require("../model/User");


router.get("/", verify,async (req, res) => {
  try {
    const experiences = await Experience.find({creator:req.user.userId})
    .populate("creator");
    res.json(experiences);
  } catch (error) {
    res.json({ message: error });
  }
});
router.post("/",verify,async (req, res) => {  
  // create new association 
  const experience = new Experience({
        
  description:req.body.description,
 
  creator:req.user.userId,
 
  });

  try {
    const saveExperience = await experience.save();
    res.send(saveExperience);
  } catch (error) {
    res.status(400).send(error);
  }
});


  router.post("/update/:id",function (req, res) {
    Experience.findById(req.params.id, function(err, experience) {
		  if (!experience)
			res.status(404).send("Record not found");
		  else {
			
            experience.description=req.body.description,
      experience.save().then(experience => {
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
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.json({ message: error });
  }
});
router.get("/getexperiences", async (req, res) => {
  try {
    const experiences = await Experience.find({})
    res.json(experiences);
  } catch (error) {
    res.json({ message: error });
  }
});
router.get("/get4/:experienceId", async function (req, res) {
  try {
  
    const experiences = await Experience.find({creator:req.params.id});
    res.json(experiences);
    console.log(experienceId)

  } catch (error) {
    res.json({ message: error });
  }
});


  router.get("/:experienceId", async (req, res) => {
		try {
          const experience = await Experience.findById(req.params.experienceId)
		  res.json(experience);
		} catch (error) {
		  res.json({ message: error });
		}
	  });
  // Delete Mission
  router.delete("/:experienceId", async (req, res) => {
    try {
      const removeExperience = await Experience.findByIdAndDelete(req.params.experienceId);
      res.json(removeExperience);
    } catch (error) {
      res.json({ message: error });
    }
    });
    router.get("/myexp",verify, async (req, res) => {
      try {
        const experiences = await Experience.find();
        res.json(experiences);
      } catch (error) {
        res.json({ message: error });
      }
    });
    router.get("/test/:creatorId",async (req, res) => {
      try {
        const experiences = await Experience.find({creator:Object(req.params.creatorId)})
        .populate("creator");
        res.json(experiences);
      } catch (error) {
        res.json({ message: error });
      }
    });

module.exports = router;