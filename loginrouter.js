
var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var validator = require('validator');
var nodemailer = require('nodemailer');
var conn=mysql.createConnection({host:"localhost",user:"root",password:"tibin",database:"gatepass",multipleStatements: true});
 //conn = mysql.createConnection({});
var json;
var errmessage="";
var js={"status":"","message":"","data":{},"data2":{}};
	// define the home page route
	router.route('/')
		.post(function (req, res) {

		  	var name=req.body.name;
			var pass=req.body.password;
			console.log(pass);
			//console.log(req);
			if(name.length<1 || pass.length<5)
			{
				    js.status='403';
					js.message="invalid credentials";
					res.send(js);
					return false;
			}
			conn.query('select uname,password,type,uid from user_login where uname="'+name+'"',function(err,rows){
			var data=JSON.stringify(rows);
			console.log(data);
			var json=JSON.parse(data);
			
			var js={"status":"","message":"","type":""};
			if(json.length )
			{
			if(name==json[0].uname && pass==json[0].password)
			{

				var token = jwt.sign({ uid: json[0].uid,type:json[0].type}, 'tibin',{expiresIn:60*10000});
				console.log("hii");
				js.status='200';
				js.uid =json[0].uid;
				js.token=token;
				js.type=json[0].type;
				js.username=json[0].uname;
				console.log(js.username);
				js.message="success";
				res.send(js);
			}
			else{
					js.status='403';
					js.message="failed";
					res.send(js);
			}
			}
			else
			{
				js.status='403';
				js.message="failed";
				res.send(js);
			}	

		});

	});

	router.route('/password')
    .get(function(req, res) {
    	js.data="";
    	//console.log(req);
    	var email = req.query.email;
        //var email=req.body.email;
       
        var query = conn.query('select * from user_login where uemail = ?', email,function(err, rows) {
            
            if (!err) {
            	console.log(rows[0]);
            	var data = JSON.stringify(rows);
            json = JSON.parse(data);
            //console.log(json);
            if(json[0]){
            	console.log(json[0]);
            

            var token = jwt.sign({ uid: json[0].uid,type:json[0].type}, 'tibin',{expiresIn:60*10000});

            //var emailtext = "Your username is : " + name + " and password is :" + password;
                // create reusable transporter object using the default SMTP transport
                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'bugtrackerndm@gmail.com', // Your email id
                        pass: 'bugtracker' // Your password
                    }
                });

                // setup e-mail data with unicode symbols
                var mailOptions = {
                    from: '"admin@gpis.com " <admin@gpis.com>', // sender address
                    to: "tibin.thomas@experionglobal.com", // list of receivers
                    subject: 'password ✔', // Subject line
                    text: "emailtext", // plaintext body
                    html: '<li><a href="http://192.168.1.234:8088/login/password/token='+token+'">hai</a></li>' // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });



                js.status = '200';
                js.message = 'fetched';
                js.data = json;

                console.log("fetched2");
                res.send(js);
            }
            } 





            else {
                js.status = '403';
                js.message = 'failed';


                console.log("failed2");
                res.send(js);
            }

            //console.log(json[0].assetid); 
        });
    });
	
	
   
	router.route('/verifyuser')
		.post(function(req, res){
			var data=req.body;
			var uid=data.uid;
			var usertype=data.usertype;
			var token=data.token;
		    var verified=verify(token,uid,usertype);
			
			if(verified)
			{
		   var js={"status":"","message":""};
			  		console.log("hii");
					js.status='200';
					js.message="success";
					res.send(js);
			
			}
			else
			{
			var js={"status":"","message":""};
			  		console.log("hii");
					js.status='403';
					js.message="failed";
					res.send(js);	
			}
			
				//console.log(json[0].assetid);	
		});
			

function verify(token,uid,type)
{
	var decoded = jwt.verify(token, 'tibin');
	console.log(token,uid,type);
	if(decoded.uid == uid && decoded.type == type)
	{
		return true;
	}
	return false;
}
module.exports = router;