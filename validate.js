function validateu() {



    if (!(document.userform.date.value) || isNaN(Date.parse(document.userform.date.value))) {
        bootbox.alert("Please provide date!");
        document.userform.date.focus();
        return false;
    }
    if (document.userform.time.value == "") {
        bootbox.alert("Please provide time!");
        document.userform.time.focus();
        return false;
    }
    if (document.userform.purpose.value.length < 1) {
        bootbox.alert("Please provide your purpose!");
        document.userform.purpose.focus();
        return false;
    }


    return (true);
}


function idvalidate(name) {

    var ele = $(this);
    console.log(ele.val());
    name = name || ele.val();
    if (ele.val() == "") {
        bootbox.alert("Please enter id");
    }

}


function vehiclevalidate(name) {

    var ele = $(this);
    console.log(ele.val());
    if (ele.val() == "") {
        bootbox.alert("Please enter vehicleid");
    }
}


function namevalidate(name) {

    var ele = $(this);
    console.log(ele.val());
    // if(typeof name === 'string')
    // 	{ console.log(name);}
    console.log("namessssss", "name");
    if (ele.val() == "") {
        bootbox.alert("Please enter name");
    }
}


function mobilevalidate(name) {

    var ele = $(this);
    console.log(ele.val());
    if (ele.val() == "") {
         bootbox.alert("Please enter mobile");
    }
}


function emailvalidate(name) {

    var ele = $(this);
    console.log(ele.val());
    if (ele.val() == "") {
        bootbox.alert("Please enter Email");
    }
}

function visitorvalidate(arr) {

    if (arr[0].length < 1) {
        bootbox.alert("invalid name");
        return false;
    }
    if (arr[1].length < 10 || isNaN(arr[1])) {
        bootbox.alert("invalid mobile");
        return false;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!(arr[2].match(mailformat))) {
        bootbox.alert("invalid email");
        return false;
    }
    if (arr[4].length < 5) {
        bootbox.alert("invalid id");
        return false;
    }
    if (arr[5].length < 5) {
        bootbox.alert("invalid vehicleid");
        return false;
    }
    return true;
}


function validate() {

    if (document.userform.name.value == "") {
        bootbox.alert("Please provide your name!");
        document.userform.name.focus();
        return false;
    }
    if (document.userform.password.value.length < 4) {
        bootbox.alert("Please provide a valid password!");
        document.userform.password.focus();
        return false;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!(document.userform.email.value.match(mailformat))) {
        bootbox.alert("Please provide a valid Email!");
        document.userform.email.focus();
        return false;
    }

    if (document.userform.mobile.value == "" ||
        isNaN(document.userform.mobile.value) ||
        document.userform.mobile.value.length != 10) {
        bootbox.alert("Please provide a valid mobile number");
        document.userform.mobile.focus();
        return false;
    }

    return (true);
}