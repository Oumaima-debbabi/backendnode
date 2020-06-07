const router = require("express").Router();
const verify = require("./verifyToken");
const Proposition = require("../model/Proposition");

// // Add New secteur

const UserController = require('../controller/UserController');

 module.exports = router;

	
	router.get("/getById",verify, function(req, res) {
		console.log(req.body);
		proposition.findById(req.params.propositionId, function(err, propositionInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "propositions found!!!", data:{propositions: propositionInfo}});
			}
		});
	})

	router.post("/",verify, async (req, res) => {  
		// create new association
		const proposition = new Proposition({
            
       titre:req.body.titre,
       description:req.body.description,
       type:req.body.type,
        lieu:req.body.lieu,
        precision:req.body.precision
		});
	  
		try {
		  const savedproposition= await proposition.save();
		  res.send(savedproposition);
		} catch (error) {
		  res.status(400).send(error);
		}
	  });
	  
	// // Get All propositions
	
	router.get("/", async (req, res) => {
	  try {
		const propositions = await Proposition.find();
		res.json(propositions);
	  } catch (error) {
		res.json({ message: error });
	  }
	});
	
router.get("/getAll", function(req, res,) {
	

		Proposition.find({}, function(err, propositions){
			if (err){
				next(err);
			} else{
			
				res.json({status:"success", message: "secteurs list found!!!", data:{propositions}});
							
			}

		});
	})

router.post("/create",verify,function(req, res, next) {
		
		proposition.create({
       titre:req.body.titre,
    description:req.body.description,
type:req.body.type,
lieu:req.body.lieu,
       precision:req.body.precision

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
router.put("/:propositionId",verify, async (req, res) => {
	try {
	  const proposition = {
		
	  };
  
	  const updatedproposition = await proposition.findByIdAndUpdate(
		{ _id: req.params.propositionId },
		proposition
	  );
	  res.json(updatedproposition);
	} catch (error) {
	  res.json({ message: error });
	}
  });
  
  // Delete listing
  router.delete("/:propositionId",verify, async (req, res) => {
	try {
	  const removeProposition = await Proposition.findByIdAndDelete(req.params.propositionId);
	  res.json(removeProposition);
	} catch (error) {
	  res.json({ message: error });
	}
  });
	  
  router.get("/:propositionId", async (req, res) => {
		try {
		  const proposition = await Proposition.findById(req.params.propositionId);
		  res.json(proposition);
		} catch (error) {
		  res.json({ message: error });
		}
	  });
  router.post("/update/:propositionId",function (req, res) {
	Proposition.findById(req.params.propositionId,function(err,proposition) {
		  if (!proposition)
			res.status(404).send("Record not found");
		  else {
			
            proposition.titre=req.body.titre,
            proposition.description=req.body.description,
			proposition.type=req.body.type,
			proposition.lieu=req.body.lieu,
		proposition.precision=req.body.precision
	  
			proposition.save().then(proposition => {
				res.json('Update complete');
			})
			.catch(err => {
				  res.status(400).send("unable to update the database");
			});
		  }
		});
	  });