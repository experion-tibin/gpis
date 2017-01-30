//$.material.init();
var comp, sel, build;
var httpObj1 = new XMLHttpRequest();
var eventsource=[];
//viewAll();
userid = localStorage.getItem('userid');
token = localStorage.getItem('token');
usertype = localStorage.getItem('usertype');
username = localStorage.getItem('username');
console.log(token, userid, usertype);
var auth = {
    token: token,
    userid: userid,
    usertype: usertype
};
console.log(auth);
/*-------------------------------------------authentication----------------------------------------*/
if (typeof userid == 'undefined' || userid == null || usertype == 0) {
    console.log(userid);
    window.location = "l.html";
} else {
    console.log(userid);
    console.log(token);
    //window.location="l.html";
}
/*-------------------------------------to display building ----------------------------------------*/
function toggleSelect(id) {
    var selected = document.getElementById(id).value;
    comp.forEach(function(element) {
            if (element.cname == selected) {
                build.innerHTML = "<option>" + element.building + "</option>";
                build.setAttribute("name", element.cid);
            }
        }

    );
}
/*-------------------------------------------save the user----------------------------------------*/
function save() {
    //$('#table1').DataTable();
    if (!validate()) {
        document.getElementById('result').innerHTML = "unable to proceed";
        return false;
    }

    console.log("validate");
    var jsobject = {
        name: "",
        email: "",
        mobile: "",
        password: "",
        company: "",
        building: ""
    };


    jsobject.name = document.getElementById('name').value;
    jsobject.email = document.getElementById('email').value;
    jsobject.mobile = document.getElementById('mobile').value;
    jsobject.password = document.getElementById('password').value;
    jsobject.password=(Crypto.MD5(jsobject.password)).toString();
    jsobject.company = document.getElementById('company').value;
    jsobject.building = document.getElementById('building').value;
    jsobject.cid = build.name;
    jsobject.token = token;
    jsobject.uid = userid;
    jsobject.usertype = usertype;
    console.log("cid" + build.name);

    console.log(jsobject);

    httpObj1.onreadystatechange = function() {
        console.log(this.readyState);
        document.getElementById("result").innerHTML = this.status;
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            console.log(result);
            result = JSON.parse(result);
            if (result.status == 200)

            {

                console.log("result.message");
                document.getElementById("result").innerHTML = result.message;

                //window.location="user.html";
            } else {
                console.log("result.message");
                document.getElementById("result").innerHTML = result.message;
            }
        }
    }

    httpObj1.open('POST', 'http://192.168.1.234:8088/api/user/', true);
    httpObj1.setRequestHeader('content-type', 'application/json');
    httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
    httpObj1.send(JSON.stringify(jsobject));
    document.getElementById("userform").reset();

}
/*---------------------------------------to display company list------------------------------------*/
function companylist()

{
    var httpObj = new XMLHttpRequest();
    build = document.getElementById('building');

    httpObj.onreadystatechange = function() {
        console.log(this.readyState);
        document.getElementById("result").innerHTML = this.status;
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            console.log(result);
            result = JSON.parse(result);
            if (result.status == 200)

            {
                comp = result.data;
                sel = document.getElementById('company');
                console.log(sel);
                sel.addEventListener(
                    'change',
                    function() {
                        toggleSelect(this.id);
                    },
                    false
                );
                //sel.setAttribute("onchange", function(){	toggleSelect('company');});
                sel.innerHTML = "";
                comp.forEach(function(element) {
                    sel.innerHTML += "<option>" + element.cname + "</option>";


                });
                build.innerHTML = "<option>" + comp[0].building + "</option>";
                build.setAttribute("name", comp[0].cid);
                // 		console.log("result.message");
                document.getElementById("result").innerHTML = result.message;

                // 		//window.location="user.html";
            } else {
                // 		console.log(result.message);
                document.getElementById("result").innerHTML = result.message;
            }
        }
    }
    console.log("company");
    console.log(auth);
    httpObj.open('GET', 'http://192.168.1.234:8088/api/user/company', true);
    httpObj.setRequestHeader('content-type', 'application/json');
    httpObj.setRequestHeader("Authorization", JSON.stringify(auth));
    httpObj.send();
}
/*------------------------------------------to add a table row--------------------------------------*/
function add() {

    var table = document.getElementById("vtable");
    var length = table.rows.length;
    var row = table.insertRow(length);
    var elementId = "c" + length;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var input1 = document.createElement("input");
    var input2 = document.createElement("input");
    var input3 = document.createElement("select");
    input3.innerHTML = "<option>aadhar</option><option>passport</option>";
    // var sel=document.getElementById("idtype");
    // var input3=sel.cloneNode(true);
    var input4 = document.createElement("input");
    var input5 = document.createElement("button");
    input5.onclick = function() {

        //	this.parentNode.parentNode.removeChild(this);
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    };
    cell1.appendChild(input1);
    //input1.style.width="90%";
    input1.setAttribute("id", elementId + "1");
    // console.log(elementId+"1");
    cell2.appendChild(input2);
    //input2.style.width="90%";
    input2.setAttribute("id", elementId + "2");
    // console.log(elementId+"2");
    cell3.appendChild(input3);
    //input3.style.width="90%";
    input3.setAttribute("id", elementId + "3");
    cell4.appendChild(input4);
    //input4.style.width="90%";
    input4.setAttribute("id", elementId + "4");
    cell5.appendChild(input5);

}
/*----------------------------------------toggle between panels-----------------------------------*/
function toggle_visibility(id) {

    var e = document.getElementById(id);
    var view = document.getElementById('viewall');
    var viewusers = document.getElementById('viewusers');
    var adduser = document.getElementById('adduser');
    if (e == view) {
        console.log("view");
        view.style.display = 'block';
        adduser.style.display = 'none';
        viewusers.style.display = 'none';
        viewAll();
         
    } else if (e == viewusers) {
        console.log("viewusers");
        view.style.display = 'none';
        adduser.style.display = 'none';
        viewusers.style.display = 'block';
        viewAll();
       
    } else {
        console.log("adduser");
        view.style.display = 'none';
        adduser.style.display = 'block';
        viewusers.style.display = 'none';
    }
}
/*--------------------------------------show users and gatepass-------------------------------------*/
function viewAll() {

    companylist();
    httpObj1.onreadystatechange = function() {
        //document.getElementById("result2").innerHTML=this.status;
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            console.log(result);
            var test = result.data;

            //var pdetails = _.groupBy(test, 'gateid');
            //var tes = pdetails[1];
            var pdetails = _.groupBy(test, function(b){
                    return b.gateid+b.date;
                });



            console.log(JSON.stringify(result));
            console.log("pdetails", JSON.stringify(pdetails));

            if (result.status == 200)

            {

                console.log("result.message");
                addtable(pdetails);
                //addtable(result.data);
                addtable1(result.data2);


                $(".deleter").on("click", deleterow);
                $(".editr").on("click", editrow);


                document.getElementById("result2").innerHTML = result.message;


            } else {
                // 		console.log(result.message);
                document.getElementById("result").innerHTML = result.message;
            }
        }
    }

    httpObj1.open('GET', 'http://192.168.1.234:8088/api/gatepass', true);
    httpObj1.setRequestHeader('content-type', 'application/json');
    httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
    httpObj1.send();
    document.getElementById("display").innerHTML = username;
    console.log(userid);
}
/*-------------------------------------generate gatepass table-----------------------------------*/
function addtable(arr) {


    var table = document.getElementById("viewtable");
    var length = arr.length;


    content = "<div class='table-responsive'><table class='table table-hover' id='table1'><thead><tr><th>No.</th><th>GatepassID</th><th>Company</th><th>Date</th><th>Time</th><th>Purpose</th><th>Visitors</th></tr></thead><tbody>";
    var i = 1;
    $.each(arr, function(index, value) {
        var eventobj={"allDay": "",
        "title": "",
        "id": "",
        "end": "",
        "start": "",
        "visitor": [],
        "company": ""
        



    };


        $.each(value, function(index1, element) {
            // var mydate = new Date(element.date);
            // mydate = mydate.toISOString().split('T')[0];
            // element.date = mydate;

             var mydate = new Date(element.date) ;
            mydate.setDate(mydate.getDate() + 1);
            mydate = mydate.toISOString().split('T')[0];
            element.date = toDate2(mydate);
            var datetime=mydate+" "+element.time;
            element.time=toTime(element.time);

            if (index1 == 0) {
                // innerHTML += "<h3>"+value1.gid+"</h3>";
                content += "<tr><td>" + i + "</td><td>" + element.gdid + "</td><td>" + element.cname + "</td><td>"+ element.date + "</td><td>" + element.time + "</td><td>" + element.purpose + "</td><td><table class=\"table table-responsive\"><thead><tr><th>Name</th><th>Email</th><th>Idtype</th><th>Idno</th><th>VehicleId</th></tr></thead><tbody><tr><td>" + element.name + "</td><td>" + element.email + "</td><td>" + element.idtype + "</td><td>" + element.identity + "</td><td>" + element.vehicleid + "</td></tr>";

            

                eventobj.title=element.purpose+" at "+element.cname;
                eventobj.id=element.gdid;
                eventobj.purpose=element.purpose;
                eventobj.company=element.cname;
                eventobj.end=datetime;
                eventobj.start=datetime;
                eventobj.visitor.push({name:element.name,email:element.email,mobile:element.mobile,idtype:element.idtype,identity:element.identity,vehicleid:element.vehicleid});

         

            } else {
                content += "<tr><td>" + element.name + "</td><td>" + element.email + "</td><td>" + element.idtype + "</td><td>" + element.identity + "</td><td>" + element.vehicleid + "</td></tr>";
            
                  eventobj.visitor.push({name:element.name,email:element.email,mobile:element.mobile,idtype:element.idtype,identity:element.identity,vehicleid:element.vehicleid});


            }

        });
         eventsource.push(eventobj);
        i++;
        content += "</tbody> </table></td></tr>";
    });
    content += "</tbody> </table> </div>";
    document.getElementById('view').innerHTML = content;
    $('#table1').DataTable();
    console.log(content);



    $('#calendarview').fullCalendar({
    events: eventsource,
    // header: { left: 'today',
    //         center: 'prev title next',
    //         right: 'basicDay month' }


            header:
                {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listDay'
                }, 
        defaultView: 'listDay',

   
     eventClick:  function(event, jsEvent, view) {

            $('#modalTitle').html(
                "Purpose:"+
                event.purpose
                +"  <br>   GatepassID:"+event.id+"  <br> Date:"+moment(event.start).format('MMM Do h:mm A')+"  <br> Company:"+event.company+""
                );
             //$('#modalTitle').html(event.title);
            $('#modalBody').html(visitordetails(event.visitor));
            //#myModal4.modal-dialog  {width:75%;};
            $('#fullCalModal').modal();
        }
//         eventRender: function(event, element)
// { 
//     element.find('.fc-event-title').append("<br/>" + event.company); 
// }

    // eventRender: function (event, element) {
    //     element.attr('href', 'javascript:void(0);');
    //     element.click(function() {
    //         $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
    //         $("#endTime").html(moment(event.end).format('MMM Do h:mm A'));
    //         $("#eventInfo").html(event.description);
    //         $("#eventLink").attr('href', event.url);
    //         $("#eventContent").dialog({ modal: true, title: event.title, width:350});
    //     });
    // }
});



     console.log("event",eventsource);


}
/*-------------------------------------generate user table-----------------------------------*/
function addtable1(arr) {

    var table = document.getElementById("viewutable");
    var length = arr.length;

    content = "<div class='table-responsive '><table class='table table-hover table-striped table-bordered' cellspacing=\"0\" width=\"100%\" id='table2'><thead><tr><th>No.</th><th>Name</th><th>Email</th><th>Mobile</th><th>Company</th><th>Building</th><th>Edit/Save</th><th>Delete</th></tr></thead><tbody>";
    var i = 1;
    arr.forEach(function(element) {

        var x = "'" + element.gdid + "'";
        //var gid=element.gid;

        content += "<tr id=\"" + element.uid + "\"><td>" + i + "</td><td contenteditable=\"false\">" + element.uname + "</td><td contenteditable=\"false\">" + element.uemail + "</td><td contenteditable=\"false\">" + element.umobile + "</td><td>" + element.cname + "</td><td>" + element.building + "</td><td><a class=\"editr\" ><span  class=\"glyphicon glyphicon-pencil\"></span></a>" + "</td><td><a class=\"deleter\" data-toggle=\"tooltip\" title=\"Delete User\"><span style=\"color:red;\" class=\"glyphicon glyphicon-remove\"></span></a>" + "</td></tr>";
        i++;
    });
    content += "</tbody> </table> </div>";
    document.getElementById('viewu').innerHTML = content;
    $('#table2').DataTable();
}
/*----------------------------------------delete a row--------------------------------------------*/
function deleterow() {


    var currentTR = $(this).parent().parent();
    var pr = $(this).parent() // Moves up from <button> to <td>
        .parent();
    var uid = currentTR.attr('id');

    console.log(userid);


    httpObj1.onreadystatechange = function() {
        console.log(this.readyState);
        document.getElementById("result").innerHTML = this.status;
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            console.log(result);
            result = JSON.parse(result);
            if (result.status == 200)

            {

                // 		console.log("result.message");
                document.getElementById("result3").innerHTML = result.message;

                // 		//window.location="user.html";
            } else {
                // 		console.log(result.message);
                document.getElementById("result3").innerHTML = result.message;
            }
        }
    }

    httpObj1.open('DELETE', 'http://192.168.1.234:8088/api/user/' + uid, true);
    httpObj1.setRequestHeader('content-type', 'application/json');
    httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
    httpObj1.send();

    currentTR.remove();

}
/*----------------------------------------edit a user--------------------------------------------*/
function editrow() {
    var editdata = [];
    var currentTR = $(this).parent().parent();
    var pr = $(this).parent() // Moves up from <button> to <td>
        .parent();
    var uid = currentTR.attr('id');

    console.log(uid);
    var currentTD = $(this).parents('tr').find('td[contenteditable=false]');
    console.log($(this).html());
    if ($(this).html() == '<span class=\"glyphicon glyphicon-pencil\"></span>') {
        $.each(currentTD, function() {
            //if($(this).prop('contenteditable') == false)
            $(this).prop('contenteditable', true);
        });
        currentTD[0].focus();
    } else {
        console.log("eeeelse");
        var currentTD = $(this).parents('tr').find('td[contenteditable=true]');
        $.each(currentTD, function() {

            $(this).prop('contenteditable', false);
            var temp = $(this).html();
            editdata.push(temp);


        });
        dbsaverow(editdata, uid);
    }

    $(this).html($(this).html() == '<span class=\"glyphicon glyphicon-pencil\"></span>' ? '<span class=\"glyphicon glyphicon-ok\"></span>' : '<span class=\"glyphicon glyphicon-pencil\"></span>');
}


/*--------------------------------------save an edited user----------------------------------------*/
function dbsaverow(arr, uid) {
    var name = arr[0];
    var email = arr[1];
    var mob = arr[2];

    httpObj1.onreadystatechange = function() {
        console.log(this.readyState);
        document.getElementById("result").innerHTML = this.status;
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            console.log(result);
            result = JSON.parse(result);
            if (result.status == 200)

            {

                //		console.log("result.message");
                document.getElementById("result3").innerHTML = result.message;

                // 		//window.location="user.html";
            } else {
                //		console.log(result.message);
                document.getElementById("result3").innerHTML = result.message;
            }
        }
    }

    httpObj1.open('PUT', 'http://192.168.1.234:8088/api/user/' + uid + '/' + name + '/' + email + '/' + mob, true);
    httpObj1.setRequestHeader('content-type', 'application/json');
    httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
    httpObj1.send();
}

function toDate(selector) {
    var from = $(selector).val().split("-");
    var str=from[2]+"-"+ from[1] +"-"+ from[0];
    return (str);
}
function toDate2(str) {
   // var str = moment(str).add(1, 'day');
    var from = str.split("-");
    
    var str=from[2]+"-"+ from[1] +"-"+ from[0];
    return (str);
}
function toTime(str) {
    var from = str.split(":");
    var dt = moment(from[0]+":"+from[1], ["HH:mm"]).format("hh:mm a");
    //var str=(Number(from[2])+1)+"-"+ from[1] +"-"+ from[0];
    return (dt);
}
function visitordetails(arr){
   var i=1;
    var str="<div class='table-responsive'><table class='table table-hover' id='table1'><thead><tr><th>#.</th><th>Name</th><th>Email</th><th>Mobile</th><th>Idtype</th><th>Idno</th><th>VehicleID</th></tr></thead><tbody>";
   
    $.each(arr, function(index, value) {

                str+= "<tr><td>" + i + "</td><td>"+ value.name + "</td><td>" + value.email + "</td><td>"+ value.mobile + "</td><td>" + value.idtype + "</td><td>" + value.identity + "</td><td>" + value.vehicleid + "</td></tr>";
            i++; 

        
       
    });
    str += "</tbody> </table> </div>";
return str;
console.log("event",eventsource);
}