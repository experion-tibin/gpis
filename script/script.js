var response,username,password;
var status;
var xhttp;

xhttp = new XMLHttpRequest();

var loginuser = function(){
  return new Promise(function(resolve,reject){
          if(validate() == true)
              {
                resolve();
              }
          else
              {
                reject();
              }
          
  })
}

loginuser().then(function(){

  xhttp.onreadystatechange = function() {
            if (this.readyState == 4  && this.status == 200 )
                {
                  console.log("gallery");
                  status = this.status; 
                  response = this.responseText;
                  console.log(response);
                  response =JSON.parse(response);
                }
  
 }

})
.catch
  (console.log("failure"));



xhttp.open('GET','https://exptest.herokuapp.com/api/imageGallery', true);
xhttp.send();


function validate(){

 //username = document.getElementById("email").value;
// password = document.getElementById("pword").value;
      username ="demo@experionglobal.com";
      password = "exp@123";
      sendrequest(username,password);
      
}

function sendrequest(uname,pword){
  //to send request to server
      xhttp1 = new XMLHttpRequest();
      xhttp1.open("POST", "https://exptest.herokuapp.com/api/login", true);
      xhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      var data ="userName="+ username+"&password="+ password;
      xhttp1.send(data);
      xhttp1.onreadystatechange = function() {

        if (this.readyState == 4   ){
              console.log("success");
              status = this.status; 
              response = this.responseText;
              console.log(response);
              response =JSON.parse(response);
              status =response.status;

              if ( status == 200){  
                  alert ("Login successfully");
                  // window.location = "dashboard.html"; // Redirecting to other page.
                  //return false;
              }
              else{

                   alert (response.status);
              }
         }
       };
}        
// function ValidateEmail(mail)   
// {  //to validate email
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
//   {  
//     return true  ;
//   }  
//     alert("You have entered an invalid email address!");  
//     return false ; 
// }  

// function validate(){

//  username = document.getElementById("email").value;
//  password = document.getElementById("pword").value;
//  sendrequest(username,password);


// function sendrequest(uname,pword){
// 	//to send request to server
//     xhttp = new XMLHttpRequest();
//  	xhttp.open("POST", "https://exptest.herokuapp.com/api/login", true);
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     var data ="userName="+ username+"&password="+ password;
//  	xhttp.send(data);
//   	xhttp.onreadystatechange = function() {
//     if (this.readyState == 4   ){
//     	console.log("c");
//         status = this.status;	
//    	    response = this.responseText;
//         console.log(response);
//         response =JSON.parse(response);
// 		status =response.status;
// 		if ( status == 200){	
// 		alert ("Login successfully");
// 		window.location = "dashboard.html"; // Redirecting to other page.
// 		return false;
// }
// 	else{
// 		alert (response.status);
// 	}
      
//     }
//   };
  
  
  
// }