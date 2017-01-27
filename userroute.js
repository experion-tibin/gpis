var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var validator = require('validator');
var nodemailer = require('nodemailer');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tibin",
    database: "gatepass",
    multipleStatements: true
});
//conn = mysql.createConnection({});
var json;
var result;
var errmessage = "";
var js = {
    "status": "",
    "message": "",
    "data": {},
    "data2": {}
};
// define the home page route


router.route('/')
    .post(function(req, res) {
        var data = req.body;
        console.log(data, typeof data);
        var name = data.name;
        var email = data.email;
        var mobile = data.mobile;
        var password = data.password;
        var company = data.company;
        var building = data.building;
        var cid = data.cid;
        //res.send("ss");
        //console.log(req);

        var user = {
            name: name,
            email: email,
            mobile: mobile,
            password: password,
            cid: cid
        };
        var query = conn.query('INSERT INTO user_login SET ? ', user, function(err, result) {
            // Neat! 
            if (result) {
                var js = {
                    "status": "",
                    "message": ""
                };
                console.log("hii");
                js.status = '200';
                js.message = "success";
                res.send(js);
                console.log(result);
                var emailtext = "Your username is : " + name + " and password is :" + password;
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
                    to: email, // list of receivers
                    subject: 'password ✔', // Subject line
                    text: emailtext, // plaintext body
                    //html: '<b>Hello world ?</b>' // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });


            } else {
                var js = {
                    "status": "",
                    "message": ""
                };
                console.log("hii");
                js.status = '403';
                js.message = "failed";
                res.send(js);
            }
        });
        console.log(query.sql);

    });
router.route('/:userid')

    .delete(function(req, res) {
        var userid = req.params.userid;
        if (userid.length < 1) {
            js.status = '403';
            js.message = 'error id';
            res.send(js);
            return false;
        }
        console.log("delete", userid);
        var query = conn.query('delete from user_login where uid = ?', [userid], function(err, rows) {
            var data = JSON.stringify(rows);
            //json=JSON.parse(data);
            if (!err) {
                js.status = '200';
                js.message = 'deleted';
                js.data = json;

                console.log("fetched2");
                res.send(js);
            } else {
                js.status = '403';
                js.message = 'failed';


                console.log("failed2", err);
                res.send(js);
            }

            //console.log(json[0].assetid);	
        });
        console.log(query.sql);
    })
    .put(function(req, res) {




			var querydb = function(querystr, querydata) {
			            return new Promise(function(resolve, reject) {

			                var query = conn.query(querystr, querydata, function(err, result) {
			                        // Neat! 
			                        if (result) {

			                            resolve(result);


			                        } else {

			                            reject(err);
			                        }
			                    }

			                );
			                console.log(query.sql);

			            });

			        }

        var userid = req.params.userid;
        var data = req.body;
        var oldpass=data.oldpass;
        var newpass=data.newpass; 
        if (userid.length < 1) {
            js.status = '403';
            js.message = 'error id';
            res.send(js);
            return false;
        }
        console.log("reset", userid);
        var querystring='select * from user_login where uid = ? ';
        querydb(querystring,userid)
          .then(function(result){
          	var ret=result;
          	var user = {
            password: newpass
            
          };
          	if(ret[0].password==oldpass)
          	{
          	  return querydb('UPDATE user_login SET ? where uid = ?',[user,userid]);
          	}
          	else{
          		js.status = '403';
            js.message = 'error password';
            res.send(js);
          	}

          })
          .then(function(result){
          	if(result){
          		console.log("success");
          	
          	js.status = '200';
            js.message = 'updated password';
            res.send(js);
            }
          });
       
    });
router.route('/:userid/:name/:email/:mobile')
    .put(function(req, res) {
        var userid = req.params.userid;
        var name = req.params.name;
        var email = req.params.email;
        var mobile = req.params.mobile;
        if (userid.length < 1 || name.length < 1 || email.length < 10 || mobile.length < 10) {
            js.status = '403';
            js.message = 'error id name';
            res.send(js);
            return false;
        }
        var user = {
            name: name,
            email: email,
            mobile: mobile
        };
        console.log("put", name);
        var query = conn.query('UPDATE user_login SET ? where uid = ?', [user, userid], function(err, rows) {
            var data = JSON.stringify(rows);
            //json=JSON.parse(data);
            if (!err) {
                js.status = '200';
                js.message = 'updated';
                js.data = json;

                console.log("fetched2");
                res.send(js);
            } else {
                js.status = '403';
                js.message = 'failed';


                console.log("failed2", err);
                res.send(js);
            }

            //console.log(json[0].assetid);	
        });
        console.log(query.sql);
    });


router.route('/company')
    .get(function(req, res) {

        var query = conn.query('select * from company where cid <> 1', function(err, rows) {
            var data = JSON.stringify(rows);
            json = JSON.parse(data);
            if (!err) {
                js.status = '200';
                js.message = 'fetched';
                js.data = json;

                console.log("fetched2");
                res.send(js);
            } else {
                js.status = '403';
                js.message = 'failed';


                console.log("failed2");
                res.send(js);
            }

            //console.log(json[0].assetid);	
        });
    });

module.exports = router;