const router = require("express").Router();
const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
var crypto = require('crypto');

const config = require('config.json');
const fs=require('fs');
const multer=require('multer');
const upload=multer({dest:__dirname+"/uploads/images"})


router.post("/addimage",upload.single("image"),function(req,res){
  var file=__dirname+"/uploads/images/"+req.file.originalname
  fs.readFile(req.file.path,function(err,data) {
  fs.writeFile(file,data,function(err){
   if(err){
     console.error(err)
    var responce ={
    message:'sorry file couldnt  upload',
    filename:req.file.originalname,

    }}
  
   else
   {
     res.json({state:'ok',msg:'okkk ajouter'})
   
   }
   });
 
  }
  )
 })
router.post("/register", upload.single("image") ,async (req, res) => {
  // checking association email id in database
  const emailExit = await Admin.findOne({
    email: req.body.email
  });

  if (emailExit) return res.status(400)
  {
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  // create new association
  const admin = new Admin({
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
role:"admin",


  });

  try {
    const savedAdmin= await admin.save();
    res.send(savedAdmin).populate(user);
    var transporter = nodemailer.createTransport({ service: 'Sendgrid'});
    var mailOptions = { from: 'debbabimimii@gmail.com', to: admin.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
    transporter.sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send('A verification email has been sent to ' + admin.email + '.');
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
// router.post("/sendVerificationEmail",function (req, res) {
//   let message;
//   if (req) {
//       message = `<p>Please click the below link to verify your email address:</p>
//                  <p><a href="hello"</a></p>`;
//   } else {
//       message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
//                  <p><code>"hello"</code></p>`;
//   }
//   sendEmail({
//     to: req.query.email,
//     subject: 'Sign-up Verification API - Verify Email',
//     html: `<h4>Verify Email</h4>
//            <p>Thanks for registering!</p>
//            ${message}`
// });

 
// })
// module.exports = sendEmail;

// function sendEmail({ to, subject, html, from = config.emailFrom }) {
//     const transporter = nodemailer.createTransport(config.smtpOptions);
//     transporter.sendMail({ from, to, subject, html });
// }
// association login
// router.post("/login", async (req, res) => {
//   // checking association email id in database
//   const admin = await Admin.findOne({ email: req.body.email });
//   if (!admin) return res.status(400).send("Email is wrong");

//   // checking password
//   const validPass = await bcrypt.compare(req.body.password, admin.password);
//   if (!validPass) return res.status(400).send("Invalid password");

//   // creat and assign a token
//   const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
//   res.header("x-access-token", token).send({ token: token });
// });
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return next(new Error('Email does not exist'));
    const validPassword = await validatePassword(password, admin.password);
    if (!validPassword) return next(new Error('Password is not correct'))
    const accessToken = jwt.sign({ adminId: admin._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d"
    });
    await Admin.findByIdAndUpdate(admin._id, { accessToken })
    res.status(200).json({
      data: { email: admin.email,
          name:admin.name,
           role: user.role },
      accessToken
    })
  } catch (error) {
    next(error);
  }
}) 
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.json({ message: error });
  }
});

// Single association
router.get("/:adminId", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.adminId)
    .populate('User');
    res.json(admin);
  } catch (error) {
    res.json({ message: error });
  }
});
router.put("/:AdminId", async (req, res) => {
  try {
    const Admin = {
    
 nom_association: req.body.nom_association,
 nom_responsable:req.body.nom_responsable,
numero_association:req.body.numero_association,
date_creation:req.body.date_creation,
email:req.body.email,
code_postal:req.body.code_postal,
 adresse: req.body.adresse,
 password:hashedPassword,
    
    };
  
    const updatedAdmin = await Admin.findByIdAndUpdate(
    { _id: req.params.adminId },
    admin
    );
    res.json(updatedAdmin);
  } catch (error) {
    res.json({ message: error });
  }
  });
  
  // Delete admin
  router.delete("/:adminId",async (req, res) => {
  try {
    const removeAdmin= await Association.findByIdAndDelete(req.params.adminId);
    res.json(removeAdmin);
  } catch (error) {
    res.json({ message: error });
  }
  });
//   router.post('/sendemail', function(req,res){

//     Admin.find({email:req.query.email}, function(err, result){
//       console.log(result.length)
//       res.send(result)
//       if(result.length != 0){
  
//         var transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: 'sadakacontactasso@gmail.com',
//             pass: 'mdp'
//           }
//         });
  
  
//         var mailOptions = {
//           from: 'sadakacontactasso@gmail.com',
//           to: req.query.email,
//           subject: 'Sending Email using Node.js',
//           text: 'hawaha email sadakacontactasso@gmail.com w password',
//           html: '<htm><p>Votre adhésion a été prise en compte. </p>'+

//              '<p>Veuillez activer votre compte</p>'+

//          '<p><button>Cliquez ici</button></p>' +
//            '<p>Pour valider votre adhésion, veuillez payer la cotisation annuelle.</p>' +
 

//           '<p>RIB: TN59 1750 3000 0002 2957 9702</p>'+

//           '<p>Regards,</p>'+
//         ' <p>Association de Recherche Scientifique et Innovation en Informatique- ARSII</p>'+
   
// '</html>'
  
//         }
  
  
//         transporter.sendMail(mailOptions, function(error, info){
//           if (error) {
//             console.log(error);
//             res.json({yo: 'error'});
//           } else {
//             console.log('Email sent: '+ info.response);
//             infor=info.response;
//             res.json({yo: info.response});
//           }
//         });
//       }
//     })
//   })
module.exports = router;