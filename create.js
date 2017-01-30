//$.material.init();
var visitorcount = 0;
var eventsource=[];
var httpObj1 = new XMLHttpRequest();

userid = localStorage.getItem('userid');
token = localStorage.getItem('token');
usertype = localStorage.getItem('usertype');
username = localStorage.getItem('username');
var auth = {
    token: token,
    userid: userid,
    usertype: usertype
};
if (typeof userid == 'undefined' || userid == null || usertype == 1) {
    console.log(userid);
    window.location = "l.html";
} else {
    console.log(userid);
    console.log(token);
    //window.location="l.html";
}


function save() {
   // var  dateformated=moment(jsobject.date).format('DD-MM-YYYY');
    if (!validateu()) {
        document.getElementById('result').innerHTML = "unable to proceed";
        return false;
    }
    var jsobject = {
        date: "",
        time: "",
        purpose: "",
        visitors: []
    };
    var table = document.getElementById("vtable");
    
    var datef = toDate("#date");

    console.log(datef);
    jsobject.date = datef;
    jsobject.time = document.getElementById('time').value;
    console.log(jsobject.time);
    jsobject.purpose = document.getElementById('purpose').value;
    jsobject.uid = userid;
    jsobject.usertype = usertype;
    jsobject.token = token;

        var visitor = {
            name: "",
            mobile: "",
            idtype: "",
            identity: "",
            email: "",
            vehicleid: ""
        };
    //	console.log(jsobject.items[0]);
    for (var i = 1; row = table.rows[i]; i++) {
        row = table.rows[i];
        
        var arr = [];
        for (var j = 0; col = row.cells[j]; j++) {

            arr[j] = col.firstChild.value;
            if (j < 6) {
                if (!(col.firstChild.value)) {
                    bootbox.alert("empty fields");
                    document.getElementById('result').innerHTML = "un";
                    console.log(col);
                    col.firstChild.focus();
                    return false;
                }
            }
        }

        if (!visitorvalidate(arr)) {
            document.getElementById("result").innerHTML = "at row" + i;
            return false;
        }
        visitor.name = arr[0];
        visitor.mobile = arr[1];
        visitor.email = arr[2];
        visitor.idtype = arr[3];
        visitor.identity = arr[4];
        visitor.vehicleid = arr[5];
        //namevalidate(arr[0]);
        jsobject.visitors.push(visitor);


    }
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

                console.log("created gdid");
                console.log("gatepass",result.message);
                document.getElementById("result").innerHTML = result.message;

                //window.location="user.html";
            } else {
                //		console.log(result.message);
                document.getElementById("result").innerHTML = result.message;
            }
        }
    }

    httpObj1.open('POST', 'http://192.168.1.234:8088/api/gatepass', true);
    httpObj1.setRequestHeader('content-type', 'application/json');
    httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
    httpObj1.send(JSON.stringify(jsobject));
    document.getElementById("userform").reset();
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

function add() {


//  var datepicker = $.fn.datepicker.noConflict(); // return $.fn.datepicker to previously assigned value
// $.fn.bootstrapDP = datepicker;     
   var  dateformat=moment().format('DD-MM-YYYY');

     $('#date').datepicker({
    format: 'dd-mm-yyyy',
    startDate: '-0d'
});

     document.getElementById('date').value=dateformat;
    var table = document.getElementById("vtable");
    var length = table.rows.length;
    var row = table.insertRow(length);
    var elementId = "c" + length;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var input1 = document.createElement("input");
    var input2 = document.createElement("input");
    var input3 = document.createElement("input");
    var input4 = document.createElement("select");

    input4.innerHTML = "<option>aadhar</option><option>passport</option>";
    // var sel=document.getElementById("idtype");
    // var input3=sel.cloneNode(true);
    var input5 = document.createElement("input");
    var input6 = document.createElement("input");
    var input7 = document.createElement("a");

    input7.onclick = function() {
        visitorcount--;
        if (visitorcount < 1) {
            document.getElementById("result").innerHTML = "cannot delete";
            visitorcount++;
            return false;
        }

        //	this.parentNode.parentNode.removeChild(this);
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    };
    cell1.appendChild(input1);
    //input1.style.width="90%";
    input1.setAttribute("id", elementId + "1");
    input1.setAttribute("class", "form-control vname");
    // console.log(elementId+"1");
    cell2.appendChild(input2);
    //input2.style.width="90%";
    input2.setAttribute("id", elementId + "2");
    input2.setAttribute("class", "form-control vmobile");
    // console.log(elementId+"2");
    cell3.appendChild(input3);
    //input3.style.width="90%";
    input3.setAttribute("id", elementId + "3");
    input3.setAttribute("class", "form-control vemail");
    cell4.appendChild(input4);
    //input4.style.width="90%";
    input4.setAttribute("id", elementId + "4");
    input4.setAttribute("class", "form-control ");
    cell5.appendChild(input5);
    input5.setAttribute("id", elementId + "5");
    input5.setAttribute("class", "form-control vid");
    cell6.appendChild(input6);
    input6.setAttribute("id", elementId + "6");
    input6.setAttribute("class", "form-control vvehicleid");
    cell7.appendChild(input7);
    input7.setAttribute("id", elementId + "7");
    input7.setAttribute("title", "remove");
    input7.setAttribute("data-toggle", "tooltip");
    input7.innerHTML = "<span style=\"color:red;\" class=\"glyphicon glyphicon-remove\"></span>";
    visitorcount++;
    view();




}


function toggle_visibility(id) {
    var e = document.getElementById(id);
    var viewall = document.getElementById('viewall');

    var create = document.getElementById('createnew');
    var calendar=document.getElementById('calendar');
    if (e == viewall) {

        e.style.display = 'block';
        create.style.display = 'none';
        document.getElementById('calendar').style.display='none';
        view();
    } else if(e == calendar){
        e.style.display = 'block';
        viewall.style.display = 'none';
        create.style.display = 'none';
        $('#calendarview').fullCalendar('render');


    }
    else {
        e.style.display = 'block';
        viewall.style.display = 'none';
        document.getElementById('calendar').style.display='none';

    }
}

function view() {



    httpObj1.onreadystatechange = function() {
        document.getElementById("result").innerHTML = this.status;
        if (this.readyState == '4' && this.status == '200') {
            var result = this.responseText;
            result = JSON.parse(result);
            var test = result.data;
            console.log(test);

            if (result.status == 200)

            {

                console.log("result.message");
                var test = result.data;

                //var pdetails = _.groupBy(test, 'gateid');
                var pdetails = _.groupBy(test, function(b){
                    return b.gateid+b.date;
                });
                console.log(pdetails,"pppp");
                addtable(pdetails);
                //createcalendarevent(pdetails);
                document.getElementById("result").innerHTML = result.message;


            } else {
                // 		console.log(result.message);
                document.getElementById("result").innerHTML = result.message;
            }
        }
    }
    userid = localStorage.getItem('userid');

    console.log(auth);
    httpObj1.open('GET', 'http://192.168.1.234:8088/api/gatepass/' + userid, true);
    httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
    console.log(auth);
    httpObj1.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    httpObj1.send();

    document.getElementById("display").innerHTML = username;
}

function addtable(arr) {
     
    eventsource=[];
    console.log(eventsource);
    console.log("eeeee");
    var table = document.getElementById("viewtable");
    var length = arr.length;

    // content = "<div class='table-responsive'><table class='table table-hover' id='table1'><thead><tr><th>No.</th><th>GatepassID</th><th>Date</th><th>Time</th><th>Purpose</th><th>Name</th><th>Email</th><th>Idtype</th><th>Identity</th><th>VehicleID</th></tr></thead><tbody>";
    // var i = 1;
    // arr.forEach(function(element) {
    //     var mydate = new Date(element.date);
    //     mydate = mydate.toISOString().split('T')[0];
    //     element.date = mydate;
    //     var x = "'" + element.gdid + "'";
    //     //var gid=element.gid;

    //     content += "<tr><td>" + i + "</td><td>" + element.gdid + "</td><td>" + element.date + "</td><td>" + element.time + "</td><td>" + element.purpose + "</td><td>" + element.name + "</td><td>" + element.email + "</td><td>" + element.idtype + "</td><td>" + element.identity + "</td><td>" + element.vehicleid + "</td></tr>";
    //     i++;
    // });
    // content += "</tbody> </table> </div>";
     content = "<div class='table-responsive'><table class='table table-hover' id='table1'><thead><tr><th>No.</th><th>GatepassID</th><th>Date</th><th>Time</th><th>Purpose</th><th>Visitors</th></tr></thead><tbody>";
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

        console.log("each out",index);
        $.each(value, function(index1, element) {
            console.log("each in",index1);
            console.log(eventsource);
            console.log(element.date);
            var mydate = new Date(element.date) ;
            mydate.setDate(mydate.getDate() + 1);
            mydate = mydate.toISOString().split('T')[0];
            var datetime=mydate+" "+element.time;
            element.date = toDate2(mydate);
            element.time=toTime(element.time);
            console.log(datetime);
            if (index1 == 0) {
                // innerHTML += "<h3>"+value1.gid+"</h3>";
                content += "<tr><td>" + i + "</td><td>" + element.gdid + "</td><td>" + element.date + "</td><td>" + element.time + "</td><td>" + element.purpose + "</td><td><table class=\"table table-responsive\"><thead><tr><th>Name</th><th>Email</th><th>Idtype</th><th>Idno</th><th>VehicleId</th></tr></thead><tbody><tr><td>" + element.name + "</td><td>" + element.email + "</td><td>" + element.idtype + "</td><td>" + element.identity + "</td><td>" + element.vehicleid + "</td></tr>";

                eventobj.title=element.purpose+" at "+element.cname;
                eventobj.id=element.gdid;
                eventobj.purpose=element.purpose;
                eventobj.company=element.cname;
                eventobj.end=datetime;
                eventobj.start=datetime;
                eventobj.visitor.push({name:element.name,email:element.email,mobile:element.mobile,idtype:element.idtype,identity:element.identity,vehicleid:element.vehicleid});

            } 

            else {
                content += "<tr><td>" + element.name + "</td><td>" + element.email + "</td><td>" + element.idtype + "</td><td>" + element.identity + "</td><td>" + element.vehicleid + "</td></tr>";
                eventobj.visitor.push({name:element.name,email:element.email,mobile:element.mobile,idtype:element.idtype,identity:element.identity,vehicleid:element.vehicleid});


            }
            console.log(eventobj);
                

        });
        //eventsource[i-1]=eventobj;
        eventsource.push(eventobj);
                console.log(eventsource);
        i++;
        content += "</tbody> </table></td></tr>";
        
    });
    content += "</tbody> </table> </div>";
    document.getElementById('view').innerHTML = content;

     $('#table1').DataTable();
//      $('#calendar').fullCalendar({
//     events: eventsource      
// });

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


function startpage() {
    add();

}
$(function() {
    console.log("ready");
    $("#vtable").on("blur", ".vname", namevalidate);
    $("#vtable").on("blur", ".vemail", emailvalidate);
    $("#vtable").on("blur", ".vmobile", mobilevalidate);
    $("#vtable").on("blur", ".vid", idvalidate);
    $("#vtable").on("blur", ".vvehicleid", vehiclevalidate);
    $("#display").on("click", resetpass);
    $("#display2").on("click", resetpass2);
});
function resetpass(){
	document.getElementById('display2').style.display = 'block';

}
function resetpass2(){
	window.location="resetpass.html";

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