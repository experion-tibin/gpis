//$.material.init();


var httpObj=new	XMLHttpRequest();
function loginuser(){
    var	 password=document.getElementById('inputPassword').value;
    password=(Crypto.MD5(password)).toString();
    console.log(password);
var httpObj=new	XMLHttpRequest();
httpObj.onreadystatechange=function()
{	
	console.log(this.readyState);
	document.getElementById("result").innerHTML=this.status;
	if(this.readyState=='4' && this.status=='200')
	{
		var result=this.responseText;
		result=JSON.parse(result);
				if(result.status==200)
			
			{
				
				console.log("result.message");
				document.getElementById("result").innerHTML=result.message;
				if(result.type== 1)
				{

				
				localStorage.setItem('token',result.token);
				localStorage.setItem('userid',result.uid);
				localStorage.setItem('usertype',result.type);
				localStorage.setItem('username',result.username);
				window.location="admin.html";
			}
			else{
				localStorage.setItem('token',result.token);
				localStorage.setItem('userid',result.uid);
				localStorage.setItem('usertype',result.type);
				localStorage.setItem('username',result.username);
				window.location="create.html";
			}
			}
			else{
				console.log(result.message);
				document.getElementById("result").innerHTML=result.message;
			}
	}
}
httpObj.open('POST','http://192.168.1.234:8088/login',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send('name='+document.getElementById('inputName').value+'&password='+password);
}
$(function() {
    if (localStorage.chkbx && localStorage.chkbx != '') {
        $('#remember_me').attr('checked', 'checked');
        $('#inputName').val(localStorage.usrname);
        $('#inputPassword').val(localStorage.pass);
    } else {
        $('#remember_me').removeAttr('checked');
        $('#inputName').val('');
        $('#inputPassword').val('');
    }
    $('#remember_me').click(function() {
         if ($('#remember_me').is(':checked')) {
            localStorage.usrname = $('#inputName').val();
            localStorage.pass = $('#inputPassword').val();
            localStorage.chkbx = $('#remember_me').val();
        } else {
            localStorage.usrname = '';
            localStorage.pass = '';
            localStorage.chkbx = '';
        }
    });
});

 localStorage.removeItem('token1');
function modalopen(){
	$('#fullCalModal').modal();
}
function forgotpass(){
	var email=document.getElementById('resetemail').value;
	

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!(email.match(mailformat))) {
        bootbox.alert("invalid email");
        return false;
    }


    httpObj.open('GET','http://192.168.1.234:8088/login/password'+'?email='+email,true);
	httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
	httpObj.send();
	console.log("pass");
}

