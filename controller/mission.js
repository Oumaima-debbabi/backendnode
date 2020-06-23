const Association = require("../model/Association");
const bcrypt = require("bcryptjs");

exports.uploadFile = (req, res) => {
  if (typeof req.file !== 'undefined') {
    res.json({
      imageUrl: 'http://localhost:4000/images/' + req.file.filename
    })
  } else {
    res.status(400).json({
      msg: 'Please upload valid file'
    })
  }
}


exports.signup = (req, res) => {
  const association = new Association({
    nom_association: req.body.nom_association,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  association.save((err, association) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.secteur) {
      Secteur.find(
        {
          type_activite: { $in: req.body.secteur }
        },
        (err, secteur) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          association.secteur = secteur.map(Secteur => Secteur._id);
          association.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } 
   
  });
};
exports.getone =function(req, res) {
  console.log(req.body);
  Mission.findById(req.params.missionId, function(err,missionInfo){
    if (err) {
      next(err);
    } else {
      res.json({status:"success", message: "secteur found!!!", data:{missions: missionInfo}});
    }
  });
}
