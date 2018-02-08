const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require("./routes");
const nodemailer = require("nodemailer");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/happy-choice"); //mongodb://localhost/fullstack-jeopardy

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('Mongoose Connected Successfully');    
}); 

// If the connection throws an error
connection.on('error', (err) => {  
  console.log('Mongoose default connection error: ' + err);
}); 

app.use(bodyParser.json());


app.use(express.static(__dirname + '/client/build/'));
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
  })

app.post("/send", (req, res) => {
    
const emailList = [];

for (let i = 0; i<req.body.emails.length; i++) {
        emailList.push(req.body.emails[i].email);
    }

const recipients = emailList.toString();
console.log(recipients);

let link = req.body.link;
let name = req.body.admin;
let decision = req.body.decision;

    var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
            user: "smartgroupdecision@gmail.com", // generated ethereal user
           pass: "1354!#%$" // generated ethereal password
        },
        tls:{
          rejectUnauthorized: false
        }
   
    });

    
    let mailOptions = {
        from: '"Nodemailer Contact" <smartgroupdecision@gmail.com>', // sender address
        to: recipients, // list of receivers
        subject: 'Time to Make a Decision', // Subject line
        html: "You have been requested by  " + name + " to cast your votes relating to " + decision + ". Follow the instructions included in the link" + link + ", and happy voting!" // html body
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
    //  smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        
        res.render('contact', {msg: "email has been sent"})
    });

});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Magic happening on port " + PORT);
})