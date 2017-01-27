var response,username,password;
var status;
var xhttp;
var element=document.getElementById('gallery');

function confirmlogout()
{ 
 if(confirm("Logout?"))
  window.location = "index.html";
}
 
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4   )
   {
      	  console.log("c");
          status = this.status;	
     	    response = this.responseText;
          console.log(response);
          response =JSON.parse(response);

  for(var i=0; i < response.data.length; i++)
        { 
          console.log("rrrrr");
      		var url =response.data[i].imageUrl;
          var caption=response.data[i].caption;
          // var node = document.createElement("img");                 
          //      document.body.appendChild(node);
          var divelem = document.createElement("div");
          var chiddiv = document.createElement("div");
          var elem = document.createElement("img");console.log("i");
          //var elem = document.createElement("");
          elem.setAttribute("src", url);
          elem.setAttribute("height", "168");
          elem.setAttribute("width", "324");
          elem.setAttribute("alt", "Flower");
          elem.setAttribute("title", caption);
          divelem.setAttribute("class", "caption");
          var content = document.createTextNode(caption);
          document.getElementById("gallery").appendChild(divelem);
          divelem.appendChild(elem);
          divelem.appendChild(content);
        }
		if ( status == 201){	
      		alert ("Login successfully");
      		window.location = "dashboard.html"; // Redirecting to other page.
      		return false;
                    }
	else{
		//alert (response.status);
	     }
      
    }
  };

        xhttp.open('GET','https://exptest.herokuapp.com/api/imageGallery', true);
  
  
        xhttp.send();
  
  
  
