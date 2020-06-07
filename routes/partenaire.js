const router = require("express").Router();
const verify = require("./verifyToken");
const Partenaire = require("../model/Partenaire");  

const upload = require('../middelware/upload')
const fileimg = require('../controller/mission');
router.post('/upload', [
	upload.single('image'),
	fileimg.uploadFile
  ])
router.post("/", upload.single('imageUrl') , async (req, res) => {  
    // create new association
    const partenaire = new Partenaire({
      nom:req.body.nom,
      imageUrl:req.body.imageUrl
    });
  
    try {
      const savedPartenaire= await partenaire.save();
      res.send(savedPartenaire);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  
// // Get All secteurs

router.get("/", async (req, res) => {
  try {
    const partenaires = await Partenaire.find();
    res.json(partenaires);
  } catch (error) {
    res.json({ message: error });
  }
});
router.post("/update/:id", upload.single('imageUrl'),function (req, res) {
    Partenaire.findById(req.params.id, function(err, partenaire) {
      if (!partenaire)
      res.status(404).send("Record not found");
      else {
      
      partenaire.nom=req.body.nom,

      partenaire.save().then(partenaire => {
        res.json('Update complete');
      })
      .catch(err => {
          res.status(400).send("unable to update the database");
      });
      }
    });
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
