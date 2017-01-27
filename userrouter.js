
var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var validator = require('validator');
var conn=mysql.createConnection({host:"localhost",user:"root",password:"tibin",database:"gatepass",multipleStatements: true});
 //conn = mysql.createConnection({});
var json;
var errmessage="";
var js={"status":"","message":"","data":{},"data2":{}};
	// define the home page route
	router.route('/login')
		.post(function (req, res) {

		  	var name=req.body.name;
			var pass=req.body.password;
			//console.log(req);
			if(name.length<1 || pass.length<5)
			{
				    js.status='403';
					js.message="invalid credentials";
					res.send(js);
					return false;
			}
			conn.query('select name,password,type,uid from user_login where name="'+name+'"',function(err,rows){
			var data=JSON.stringify(rows);
			console.log(data);
			var json=JSON.parse(data);
			
			var js={"status":"","message":"","type":""};
			if(json.length )
			{
			if(name==json[0].name && pass==json[0].password)
			{

				var token = jwt.sign({ uid: json[0].uid,type:json[0].type}, 'tibin',{expiresIn:60*10000});
				console.log("hii");
				js.status='200';
				js.uid =json[0].uid;
				js.token=token;
				js.type=json[0].type;
				js.username=json[0].name;
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


	
	
    router.route('/adduser')
        .post(function (req, res) {
			var data=req.body;
		 	console.log(data,typeof data);
			var name=data.name;
			var email=data.email;
			var mobile=data.mobile;
			var password=data.password;
			var company=data.company;
			var building=data.building;
			var cid=data.cid;
			//res.send("ss");
			//console.log(req);

			var user  = {name: name, email: email ,mobile: mobile ,password: password ,cid : cid };
			var query = conn.query('INSERT INTO user_login SET ? ', user, function(err, result) {
		  // Neat! 
			  if(result)
			  {
			  	var js={"status":"","message":""};
			  	console.log("hii");
					js.status='200';
					js.message="success";
					res.send(js);
			  	console.log(result);
					

			  }
			  else{
			  	var js={"status":"","message":""};
			  	console.log("hii");
					js.status='403';
					js.message="failed";
					res.send(js);
			  }
			});
			console.log(query.sql);
			
	});
	router.route('/adduser/:userid')	
		
	   .delete(function(req, res){
		     var userid=req.params.userid;
		     if(userid.length<1)
			{
				  js.status='403';
				  js.message='error id';	
				  res.send(js);
				  return false;
			}
			console.log("delete",userid);
			var query=conn.query('delete from user_login where uid = ?',[userid],function(err,rows){
			var data=JSON.stringify(rows);
		    //json=JSON.parse(data);
		    if(! err)
		    {
		    js.status='200';
			js.message='deleted';
			js.data=json;
			
			console.log("fetched2");
				res.send(js);
			}
			else
		    {
		    js.status='403';
			js.message='failed';
			
			
			console.log("failed2",err);
				res.send(js);
			}
			
				//console.log(json[0].assetid);	
		});
			console.log(query.sql);
	});
	router.route('/adduser/:userid/:name/:email/:mobile')   
	  .put(function(req, res){
		     var userid=req.params.userid;
		     var name=req.params.name;
		     var email=req.params.email;
		     var mobile=req.params.mobile;
		     if(userid.length<1 || name.length<1 || email.length<1 ||  mobile.length<1)
			{
				  js.status='403';
				  js.message='error id name';	
				  res.send(js);
				  return false;
			}
		     var user  = {name: name, email: email ,mobile: mobile};
			console.log("put",name);
			var query=conn.query('UPDATE user_login SET ? where uid = ?',[user,userid],function(err,rows){
			var data=JSON.stringify(rows);
		    //json=JSON.parse(data);
		    if(! err)
		    {
		    js.status='200';
			js.message='updated';
			js.data=json;
			
			console.log("fetched2");
				res.send(js);
			}
			else
		    {
		    js.status='403';
			js.message='failed';
			
			
			console.log("failed2",err);
				res.send(js);
			}
			
				//console.log(json[0].assetid);	
		});
			console.log(query.sql);
	});	


		router.route('/company')
		.get(function(req, res){
			
			var query=conn.query('select * from company where cid <> 1',function(err,rows){
			var data=JSON.stringify(rows);
		    json=JSON.parse(data);
		    if(! err)
		    {
		    js.status='200';
			js.message='fetched';
			js.data=json;
			
			console.log("fetched2");
				res.send(js);
			}
			else
		    {
		    js.status='403';
			js.message='failed';
			
			
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