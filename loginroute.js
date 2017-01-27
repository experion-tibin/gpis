var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var validator = require('validator');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tibin",
    database: "gatepass",
    multipleStatements: true
});
//conn = mysql.createConnection({});
var json;
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

        var name = req.body.name;
        var pass = req.body.password;
        console.log("name");
        console.log(name,pass);
        //console.log(req);
        if (name.length < 1 || pass.length < 5) {
            js.status = '403';
            js.message = "invalid credentials";
            res.send(js);
            return false;
        }
        conn.query('select name,password,type,uid from user_login where name="' + name + '"', function(err, rows) {
            var data = JSON.stringify(rows);
            console.log("data",data);
            var json = JSON.parse(data);

            var js = {
                "status": "",
                "message": "",
                "type": ""
            };
            if (json.length) {
                if (name == json[0].name && pass == json[0].password) {

                    var token = jwt.sign({
                        uid: json[0].uid,
                        type: json[0].type
                    }, 'tibin', {
                        expiresIn: 60 * 10000
                    });
                    console.log("hii");
                    js.status = '200';
                    js.uid = json[0].uid;
                    js.token = token;
                    js.type = json[0].type;
                    js.username = json[0].name;
                    console.log(js.username);
                    js.message = "success";
                    res.send(js);
                } else {
                    js.status = '403';
                    js.message = "failed";
                    res.send(js);
                }
            } else {
                js.status = '403';
                js.message = "failed";
                res.send(js);
            }

        });

    });




module.exports = router;