/**
 * Created by project on 9/5/2015.
 */
var storage = window.localStorage;
// creating a member
var CreateMember = function(username,email,password,rpassword){
    if(validateEmail(email) && password==rpassword){
        genderMale = document.getElementById("optradiomale").checked;
        if(genderMale==false){
            genderMale = "Female";
        }else{
            genderMale = "Male";
        }
        var member = new PhpPostRequest("MemberRegistration.php",[username,email,password,genderMale],CreateMember.onSuccessC,"index.html");
    }else{
        window.location = "index.html";
        notification('error','Not a valid email');
    }

};
CreateMember.onSuccessC = function(response){
    //check whether the correct response is getting from php
    window.location = "index.html";
    if(response!="Error101"){
        notification('error','Error occured!');
    }else{
        //if user successfully added to the db
        notification('success','Member added successfully, confirmation email has sent to you');
    }
};
var validateEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};
//user login
var Login = function(email,password){
    if(validateEmail(email)){
        var member = new PhpPostRequest("Login.php",[email,password],Login.onSuccessL,null);
    }
}
Login.onSuccessL=function(respose){
    //getting user data
    var userData = {};
    if(respose!="Error102"){
        userData = respose;
        storage.setItem("userdata",userData);
    }else{
        //if error occurred while logging
    }
};
function userLogin(username,email){
    var jn = {bk:username,fk:email};
    storage.setItem("indata",JSON.stringify(jn));
    var login = new Login(username,email);
}
$(document).ready(startFunctioning);
function startFunctioning(){
    if(storage.getItem("userdata")!=null){
        //redirect to the home page
        var userD = JSON.parse(storage.getItem("userdata"));
        //alert(userD[0].UserID);
        //alert(userD[1][0].RoleID);
        window.location = "profile.html";
    }
    if(storage.getItem("indata")!=null){
        var jn = JSON.parse(storage.getItem("indata"));
        var ch = jn.bk;
        var kh = jn.fk;;
        storage.clear();
        //userLogin(ch,kh);
        new Login(ch,kh);
        window.location = "index.html";
    }
}
window.onload = function() {
    startFunctioning();
    /*if(storage.getItem("userdata")!=null){
     updateUserData();
     }*/
}