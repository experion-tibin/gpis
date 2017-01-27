function logout() {

    //console.log(token);
    //console.log(usertype);

    bootbox.confirm("Proceed with logout? ",function(result)
    	{ 
    		if(result == true)
    		{
    		console.log('This was logged in the callback: ' + result);
    		localStorage.removeItem('token');
		    localStorage.removeItem('userid');
		    localStorage.removeItem('usertype');
		    localStorage.clear();
		    window.location = "l.html";
		    }
		    
    }); 
   
    
}