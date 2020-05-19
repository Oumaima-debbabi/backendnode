const router = require("express").Router();
const verify = require("./verifyToken");
const Secteur = require("../model/Secteur");

// // Add New secteur

const UserController = require('../controller/UserController');

 module.exports = router;

	
	router.get("/getById",verify, function(req, res) {
		console.log(req.body);
		Secteur.findById(req.params.secteurId, function(err, secteurInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "secteur found!!!", data:{secteurs: secteurInfo}});
			}
		});
	})

	router.post("/",verify, async (req, res) => {  
		// create new association
		const secteur = new Secteur({
		  type_activite:req.body.type_activite
		});
	  
		try {
		  const savedSecteur= await secteur.save();
		  res.send(savedSecteur);
		} catch (error) {
		  res.status(400).send(error);
		}
	  });
	  
	// // Get All secteurs
	
	router.get("/", async (req, res) => {
	  try {
		const secteurs = await Secteur.find();
		res.json(secteurs);
	  } catch (error) {
		res.json({ message: error });
	  }
	});
	
router.get("/getAll", function(req, res,) {
	

		Secteur.find({}, function(err, secteurs){
			if (err){
				next(err);
			} else{
			
				res.json({status:"success", message: "secteurs list found!!!", data:{secteurs}});
							
			}

		});
	})

router.post("/create",verify,function(req, res, next) {
		
		Secteur.create({
       type_activite:req.body.type_activite
      },
            function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "secteur added successfully!!!", data: null});
				  
				});
	},)
	// router.put("/edit/:secteurId", async (req, res) => {
	// 	try {
	// 	  const secteur = {
	// 		type_activite: req.body.type_activite,
	
	// 	  };
	  
	// 	  const updatedSecteur = await Secteur.findByIdAndUpdate(
	// 		{ _id: req.params.secteurId },
	// 		secteur
	// 	  );
	// 	  res.json(updatedSecteur);
	// 	} catch (error) {
	// 	  res.json({ message: error });
	// 	}
	//   });
	  
// Update listing
router.put("/:secteurId",verify, async (req, res) => {
	try {
	  const secteur = {
		type_activite: req.body.type_activite
		
	  };
  
	  const updatedSecteur = await Secteur.findByIdAndUpdate(
		{ _id: req.params.secteurId },
		secteur
	  );
	  res.json(updatedSecteur);
	} catch (error) {
	  res.json({ message: error });
	}
  });
  
  // Delete listing
  router.delete("/:secteurId",verify, async (req, res) => {
	try {
	  const removeSecteur = await Secteur.findByIdAndDelete(req.params.secteurId);
	  res.json(removeSecteur);
	} catch (error) {
	  res.json({ message: error });
	}
  });
	  
	  router.get("/:secteurId", async (req, res) => {
		try {
		  const secteur = await Secteur.findById(req.params.secteurId);
		  res.json(secteur);
		} catch (error) {
		  res.json({ message: error });
		}
	  });
	  router.post("/update/:secteurId",verify,function (req, res) {
		Secteur.findById(req.params.id, function(err, secteur) {
		  if (!secteur)
			res.status(404).send("Record not found");
		  else {
			secteur.type_activite = req.body.type_activite;
			
	  
			secteur.save().then(secteur => {
				res.json('Update complete');
			})
			.catch(err => {
				  res.status(400).send("unable to update the database");
			});
		  }
		});
	  });