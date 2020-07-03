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
            user:'sadakaconatct@gmail.com',
            pass:'123456789sadaka'
        },
       
    })
 let mailOptions={
from: data.email,
to:data.emailasso,
subject:`Message from ${data.email}`,
text:'',
html:`
<a>sujet: ${data.subject}</a>
<br>
<p>${data.text}</p>
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
