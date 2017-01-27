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
        console.log("timeee", req.requestTime);
        var tokenh = req.headers.authorization;
        console.log("token head", tokenh);
        //var gatepass  = {date: date, time: time ,purpose: purpose };
        var querystring = 'INSERT INTO gatepass_details SET ?';

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

        var data = req.body;
        console.log(data, typeof data);
        var date = data.date;
        console.log(date);
        var mydate = new Date(date);
        console.log(typeof mydate);
        console.log(mydate);
        mydate = mydate.toISOString().split('T')[0];
        console.log(mydate);

        var time = data.time;
        console.log(time);
        var purpose = data.purpose;

        var visitors = data.visitors;

        var uid = data.uid;
        var usertype = data.usertype;
        var token = data.token;
        //console.log(req);
        function validate() {
            if (!validator.isDate(date)) {
                errmessage += "Invalid date.";
                console.log("errmessage");
                return false;
            }
            var regex = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;
            if (!regex.test(time)) {
                errmessage += "Invalid time.";
                console.log("errmessage time");
                return false;
            } else {
                console.log("errmess  time age");
            }
            var regex2 = /^([01]?[0-9]|2[0-3])(:[0-5][0-9]){2}$/;



        }
        validate();
       
            var querystring = 'INSERT INTO gatepass_details SET ?';
            var gatepass = {
                date: mydate,
                time: time,
                purpose: purpose,
                uid: uid
            };

            querydb(querystring, gatepass)
                .then(function(result) {
                    if (result) {

                        return querydb("select max(gdid) as gdid from gatepass_details ; select max(vid) as vid from visitor");
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


                })
                .then(function(result) {
                    var gdid = result[0];
                    var vid = result[1];
                    gdid = gdid[0].gdid;
                    vid = vid[0].vid;
                    for (i = 0; i < visitors.length; i++) {
                        vid = vid + 1;
                        var visitor = {
                            vid: vid,
                            name: visitors[i].name,
                            mobile: visitors[i].mobile,
                            email: visitors[i].email,
                            idtype: visitors[i].idtype,
                            identity: visitors[i].identity,
                            vehicleid: visitors[i].vehicleid
                        };
                        var query = conn.query('INSERT INTO visitor SET ?', visitor, function(err, result) {
                            // Neat! 
                            if (result) {

                                console.log(result);


                            } else {
                                // var js={"status":"","message":""};
                                console.log("db err");
                                // js.status='200';
                                // js.message="failed";
                                // res.send(js);
                            }
                        });
                        var gate = {
                            visitorid: vid,
                            gateid: gdid
                        };
                        var query2 = conn.query('INSERT INTO gatepass SET ?', gate, function(err, result) {

                            if (result) {

                                console.log(result);
                                var js = {
                                    "status": "",
                                    "message": ""
                                };
                                console.log("gatepas");
                                js.status = '200';
                                js.message = "saved";
                                res.send(js);


                            } else {
                                var js = {
                                    "status": "",
                                    "message": ""
                                };
                                console.log("db err");
                                js.status = '403';
                                js.message = "failed";
                                res.send(js);
                            }
                        });
                        console.log(query.sql);
                    }

                })
                .catch(function(err) {
                    console.log("Something went wrong!!", err);
                });


        

    })
    .get(function(req, res) {
        console.log("pppppppp");
        var query = conn.query('select * from gatepass g,visitor v,gatepass_details gd  where g.gateid=gd.gdid and g.visitorid=v.vid ; select * from user_login u,company c where u.cid=c.cid ', function(err, rows) {
            console.log("rows");
            var data = JSON.stringify(rows[0]);
            console.log(rows);
            json = JSON.parse(data);
            if (!err) {
                js.status = '200';
                js.message = 'fetched';
                js.data = json;
                js.data2 = rows[1];
                console.log("fetched2222");
                res.send(js);
            } else {
                js.status = '403';
                js.message = 'fetched';
                res.send(js);
                //console.log(json[0].assetid);	
            }

            //console.log(json[0].assetid);	
        });
        console.log(query.sql);	



    });

router.route('/:userid')
    .get(function(req, res) {
        var id = req.params.userid;
        if (id.length < 1) {
            js.status = '403';
            js.message = 'error id';
            res.send(js);
            return false;
        }
        console.log(id);
        var query = conn.query('select * from gatepass g,visitor v,gatepass_details gd where g.gateid=gd.gdid and g.visitorid=v.vid and gd.uid = ?', [id], function(err, rows) {
            // var data=JSON.stringify(rows[0]);
            //    json=JSON.parse(data);
            if (!err) {
                js.status = '200';
                js.message = 'fetched';
                // js.data=json;
                js.data = rows;

                console.log("fetched232");
                res.send(js);
            } else {
                js.status = '403';
                js.message = 'error';
                res.send(js);
                //console.log(json[0].assetid);	
            }
        });
        //console.log(query.sql);	



    });




module.exports = router;