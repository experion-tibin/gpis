var jsobject = {
        
    };
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
    
 var oldpass=document.getElementById("password1").value;
 var newpass=document.getElementById("password2").value;
 var conpass=document.getElementById("password3").value;
 if(newpass != conpass){
 	alert("passwords do not match");
 	return false;
 }

    oldpass=(Crypto.MD5(oldpass)).toString();
    conpass=(Crypto.MD5(conpass)).toString();
    newpass=(Crypto.MD5(newpass)).toString();
	 jsobject.oldpass=oldpass;
	 jsobject.newpass=newpass;
     console.log(oldpass);
     console.log(newpass);
     
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
                document.getElementById("result").innerHTML = result.message;
                bootbox.alert({backdrop:true,message:result.message});
                 bootbox.confirm({backdrop:true,
                    message:"logout?",
                    callback:function(){logout();}
                });
                 	
                 
                 

                // 		//window.location="user.html";
            } else {
                //		console.log(result.message);
                document.getElementById("result").innerHTML = result.message;
                 bootbox.alert({backdrop:true,message:result.message});
               

            }
        }
    }

    httpObj1.open('PUT', 'http://192.168.1.234:8088/api/user/'+userid , true);
    httpObj1.setRequestHeader('content-type', 'application/json');
    httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
    httpObj1.send(JSON.stringify(jsobject));
}