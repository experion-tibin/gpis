// var bmd = require('bootstrap-material-design');
// var bs = require('bootstrap');
var jwt = require('jsonwebtoken');

var verify = function (req, res, next) {
  var auth=req.headers.authorization;
  auth=JSON.parse(auth);
  console.log(auth);
  req.requestTime = Date.now();
  var token=auth.token;
  var uid=auth.userid;
  var usertype=auth.usertype;
  var decoded = jwt.verify(token, 'tibin');
  if(decoded.uid == uid && decoded.type == usertype)
	{
		req.auth=true;
		next();
	}
	else{
		req.auth=false;
		console.log("false");
		res.status=403;
		var js = {
                    "status": "",
                    "message": ""
                };
                
        js.status = '403';
        js.message = "invalid request";
        res.send(js);
		res.end();
	}
  
}

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');

var router= express.Router();
var gateroute= require('./gaterouter.js');
//var auth= require('./authenticate.js');
var userroute= require('./userroute.js');
var loginroute= require('./loginrouter.js');
var conn=mysql.createConnection({host:"localhost",user:"root",password:"tibin",database:"gatepass"});
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
 app.use('/api',verify);
app.use('/api/gatepass',gateroute);
app.use('/api/user',userroute);
app.use('/login',loginroute);








var server = app.listen(8088,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Listening at %s on port %s", host, port);
});