const router = require("express").Router();
const verify = require("./verifyToken");
const Partenaire = require("../model/Partenaire");  

router.post("/", async (req, res) => {  
    // create new association
    const partenaire = new Partenaire({
      nom:req.body.nom,
      photo:req.body.photo
    });
  
    try {
      const savedPartenaire= await partenaire.save();
      res.send(savedPartenaire);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  router.post("/addpart",upload.single('Photo'), function (req, res) {
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
  
		 partenaire = new Partenaire({
			nom: req.body.nom,
		
		Photo: req.file.originalname
		  });
		  partenaire.save(function (err) {
  
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
  
// // Get All secteurs

router.get("/", async (req, res) => {
  try {
    const partenaires = await Partenaire.find();
    res.json(partenaires);
  } catch (error) {
    res.json({ message: error });
  }
});


	router.get("/getById", function(req, res) {
		console.log(req.body);
		Partenaire.findById(req.params.partenaireId, function(err, partenaireInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "secteur found!!!", data:{partenaires: partenaireInfo}});
			}
		});
	})

router.get("/getAll", function(req, res,) {
	
		Partenaire.find({}, function(err, partenaires){
			if (err){
				next(err);
			} else{
			
				res.json({status:"success", message: "partenaires list found!!!", data:{partenaires}});
							
			}

		});
	})

router.post("/create", function(req, res, next) {
		
		Partenaire.create({
      nom:req.body.nom,
      photo:req.body.photo
      },
            function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "secteur added successfully!!!", data: null});
				  
				});
	},)
router.put("/:partenaireId", async (req, res) => {
		try {
		  const partenaire = {
			type_activite: req.body.type_activite,
			
		  };
	  
		  const updatedPartenaire = await Partenaire.findByIdAndUpdate(
			{ _id: req.params.partenaireId },
			partenaire
		  );
		  res.json(updatedPartenaire);
		} catch (error) {
		  res.json({ message: error });
		}
	  });  
	  // Delete partenaire
	  router.delete("/:partenaireId",async (req, res) => {
		try {
		  const removePartenaire = await Partenaire.findByIdAndDelete(req.params.partenaireId);
		  res.json(removePartenaire);
		} catch (error) {
		  res.json({ message: error });
		}
	  });

	  
	  router.get("/:partenaireId", async (req, res) => {
		try {
		  const partenaire = await Partenaire.findById(req.params.partenaireId);
		  res.json(partenaire);
		} catch (error) {
		  res.json({ message: error });
		}
	  });

	  module.exports = router;
