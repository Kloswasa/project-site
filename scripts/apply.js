"use strict";

function validate() {
    var errMsg = "";
    var result = true;


/*Job reference number*/

    var jobrefnumber = document.getElementById("jobrefnumber").value;

/*Firstname*/

    var firstname = document.getElementById("firstname").value;

    document.getElementById("firstnameError").textContent = "";

    if (!firstname.match(/^[a-zA-Z]+$/)) {
        errMsg = "* Your first name must only contain alpha character *\n"
        result = false;
    }

    document.getElementById("firstnameError").textContent = errMsg;

/*Lastname*/

    var lastname = document.getElementById("lastname").value;

    document.getElementById("lastnameError").textContent = "";

    if (!lastname.match(/^[a-zA-Z]+$/)) {
        errMsg = "* Your last name must only contain alpha character *\n"
        result = false;
    }

    document.getElementById("lastnameError").textContent = errMsg;

/*Date of birth*/

    var dateofbirth = document.getElementById("dateofbirth").value;

    document.getElementById("dateofbirthError").textContent = "";

    errMsg = checkDOB(dateofbirth).errMsg;
    result = checkDOB(dateofbirth).result

    document.getElementById("dateofbirthError").textContent = errMsg;

/* Gender */

    document.getElementById("genderError").textContent = "";

    var male = document.getElementById("male").checked;
    var female = document.getElementById("female").checked;
    if (!(male || female)) {
        errMsg = "Please select your gender.\n";
        result = false;
    }
    else {
        errMsg = "";
    }

    document.getElementById("genderError").textContent = errMsg;

/*Street address*/

    var staddress = document.getElementById("staddress").value;

    document.getElementById("staddressError").textContent = "";

    if (!staddress.match(/[a-zA-Z0-9 ]+/)) {
        errMsg = "* Your street address must only contain alpha character and number. *\n"
        result = false;
    }
    else {
        errMsg = "";
    }

    document.getElementById("staddressError").textContent = errMsg;

/*Suburb*/

    var suburb = document.getElementById("suburb").value;

    document.getElementById("suburbError").textContent = "";

    if (!suburb.match(/[a-zA-Z ]+/)) {
        errMsg = "* Suburb information must only contain alpha character. *\n"
        result = false;
    }
    else {
        errMsg = "";
    }

    document.getElementById("suburbError").textContent = errMsg;

/*State*/

    document.getElementById("stateError").textContent = "";

    if(document.getElementById("state").value == "none") {
        errMsg = "* You need to choose your state *"
        result = false;
    }
    else {
        errMsg = "";
    }

    document.getElementById("stateError").textContent = errMsg;

/*Postcode*/

    var postcode = document.getElementById("postcode").value;

    document.getElementById("postcodeError").textContent = "";

    if (!postcode.match(/^[0-9]{4}$/)) {
        errMsg = "* Invalid postcode format *\n"
        result = false;
    }
    else {
        errMsg = "";
    }

    document.getElementById("postcodeError").textContent = errMsg;

/*Postcode Validation*/  

    var state = document.getElementById("state").options[document.getElementById("state").selectedIndex].text;

    document.getElementById("postcodeError").textContent = "";

    var regex;
    switch (state) {
        case "Please Select":
            return false;
        case "VIC":
            regex = new RegExp(/(3|8)\d+/);
            break;
         case "NSW":
            regex = new RegExp(/(1|2)\d+/);
            break;
         case "QLD":
            regex = new RegExp(/(4|9)\d+/);
            break;
         case "NT":
            regex = new RegExp(/0\d+/);
            break;
         case "WA":
            regex = new RegExp(/6\d+/);
            break;
         case "SA":
            regex = new RegExp(/5\d+/);
            break;
         case "TAS":
            regex = new RegExp(/7\d+/);
            break;
         case "ACT":
            regex = new RegExp(/0\d+/);
            break;
     }
     if(!postcode.match(regex)){
        errMsg = "State and postcode do not match\n";
        result = false;
      }

      document.getElementById("postcodeError").textContent = errMsg;

/*Email*/
    var email = document.getElementById("email").value;

    document.getElementById("emailError").textContent = "";

    if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
        errMsg = "* Invalid Email format *\n"
        result = false;
    }
    else {
        errMsg = "";
    }

    document.getElementById("emailError").textContent = errMsg;

/*Phone number*/
    var phonenumber = document.getElementById("phonenumber").value;

    document.getElementById("phonenumberError").textContent = "";

    if (!phonenumber.match(/^\d{8,12}$/)) {
        errMsg = "* Phone number must only contain number with min 8 and max 12 *\n"
        result = false;
    }
    else {
        errMsg = "";
    }

    document.getElementById("phonenumberError").textContent = errMsg;

/*Skill list*/

    document.getElementById("skillError").textContent = "";

    var html = document.getElementById("html").checked;
    var css = document.getElementById("css").checked;
    var javascript = document.getElementById("javascript").checked;
    var python = document.getElementById("python").checked;
    var other = document.getElementById("other").checked;

    if (!(html || css || javascript ||  python || other)) {
        errMsg = "Please select at least one skill.\n";
        result = false;
    }
    else {
        errMsg = "";
    }
    if (other && document.getElementById("otherskills").value.trim() === "") {
        errMsg = "If other is selected, please provide your other skills.\n";
        result = false;
    }

    document.getElementById("skillError").textContent = errMsg;

    var otherskills = document.getElementById("otherskills").value;

    if (result) {
        storeRegister(jobrefnumber, firstname, lastname, dateofbirth, staddress, suburb, state, postcode, email, phonenumber, html, css, javascript, python, other, otherskills, gender);
    }

    prefill_form();
    return result;

}

function checkDOB(dateofbirth) {
    var errMsg = ""
    var result = true
    if (!dateofbirth.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        errMsg = "* Invalid date of birth format. *\n"
        result = false;
    }
    else {
        var dobParts = dateofbirth.split("/");
        var dobDate = new Date(dobParts[2], dobParts[1] - 1, dobParts[0]);
        var today = new Date();
        var age = today.getFullYear() - dobDate.getFullYear(); 
        var monthDiff = today.getMonth() - dobDate.getMonth(); 
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        if (age < 15 || age > 80) {
            errMsg = "* Applicants must be between 15 and 80 years old. *\n";
            result = false;
        }
 
    }
    return { errMsg, result }
}

function storeRegister (jobrefnumber, firstname, lastname, dateofbirth, staddress, suburb, state, postcode, email, phonenumber, html, css, javascript, python, other, otherskills, gender) {
    var skill = ""
    if(html) skill = "html";
    if(css) skill += ", css";
    if(javascript) skill += ", javascript";
    if(python) skill += ", python";
    if(other) skill += ", other";
    sessionStorage.jobrefnumber = jobrefnumber;
    sessionStorage.firstname = firstname;
    sessionStorage.lastname = lastname;
    sessionStorage.dateofbirth = dateofbirth;
    sessionStorage.gender = getGender();
    sessionStorage.staddress = staddress;
    sessionStorage.suburb = suburb;
    sessionStorage.state = state;
    sessionStorage.postcode = postcode;
    sessionStorage.email = email;
    sessionStorage.phonenumber = phonenumber;
    sessionStorage.skill = skill;
    sessionStorage.otherskills = otherskills;

}

function getGender() {
    var gender = "Unknow";
    var genderArray = document.getElementById("gender").getElementsByTagName("input");

    for(var i = 0; i < genderArray.length; i++) {
        if (genderArray[i].checked)
        gender = genderArray[i].value;
    }
    return gender;
}

function prefill_form() {
    if (sessionStorage.firstname !== undefined){
        document.getElementById("firstname").value = sessionStorage.firstname;
    }
    if (sessionStorage.lastname !== undefined){
        document.getElementById("lastname").value = sessionStorage.lastname;
    }
    if (sessionStorage.dateofbirth !== undefined){
        document.getElementById("dateofbirth").value = sessionStorage.dateofbirth;
    }
    if (sessionStorage.staddress !== undefined){
        document.getElementById("staddress").value = sessionStorage.staddress;
    }
    if (sessionStorage.suburb !== undefined){
        document.getElementById("suburb").value = sessionStorage.suburb;
    }
    if (sessionStorage.state !== undefined){
        document.getElementById("state").value = sessionStorage.state;
    }
    if (sessionStorage.postcode !== undefined){
        document.getElementById("postcode").value = sessionStorage.postcode;
    }
    if (sessionStorage.email !== undefined){
        document.getElementById("email").value = sessionStorage.email;
    }
    if (sessionStorage.phonenumber !== undefined){
        document.getElementById("phonenumber").value = sessionStorage.phonenumber;
    }

    if (sessionStorage.otherskills !== undefined){
        document.getElementById("otherskills").value = sessionStorage.otherskills;
    }

    if (sessionStorage.gender !== undefined) {
        document.getElementById("gender").value = sessionStorage.gender;
    }

    switch(sessionStorage.gender) {
        case "male":
            document.getElementById("male").checked = true;
            break;
        case "female":
            document.getElementById("female").checked = true;
            break;
    }

    if (sessionStorage.skill !== undefined) {
        var skill = sessionStorage.skill.split(", ");
        skill.forEach(skill => {
            switch (skill) {
                case "html":
                    document.getElementById("html").checked = true;
                    break;
                case "css":
                    document.getElementById("css").checked = true;
                    break;
                case "javascript":
                    document.getElementById("javascript").checked = true;
                    break;
                case "python":
                    document.getElementById("python").checked = true;
                    break;
                case "other":
                    document.getElementById("other").checked = true;
                    break;
            }
            
        });
    }
}

function getJobRefNumberFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobRefNumber = urlParams.get('ref');
    return jobRefNumber;
}

function displayJobRefNumber() {
    const jobRefNumber = getJobRefNumberFromURL();
    const jobRefNumberInput = document.getElementById("jobrefnumber");
    jobRefNumberInput.value = jobRefNumber;
    jobRefNumberInput.setAttribute("readonly", true);
}


function init() {
    displayJobRefNumber();
    var regForm = document.getElementById("applicationform");
    regForm.onsubmit = validate;
    prefill_form();
}

window.onload = init;