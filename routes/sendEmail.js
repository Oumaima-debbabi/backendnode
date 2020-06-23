const express = require('express');
const router=express.Router();
const nodemailer=require('nodemailer');
router.post("/send", function(req,res){
    let data=req.body;
    let smtpTransport= nodemailer.createTransport({
        service:'gmail',
        port:465,
        secure:true,
        auth:{
            user:'contactchifco@gmail.com',
            pass:'1234567890abc/'
        },
       
    })
    let mailOptions={
from: data.email,
to:data.emailasso,
subject:`Message from ${data.email}`,
html:`
<h3> Les informations 
</h3>
<a>sujet: ${data.subject}</a>
<p>${data.message}</p>
<ul>
</ul>
`
    };
    smtpTransport.sendMail(mailOptions,(error,response)=>{
        if(error){
            res.send(error)
        }
        else{
            res.send('Succes')
        }
        smtpTransport.close();
    })

});
module.exports=router;
