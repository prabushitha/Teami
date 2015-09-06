/**
 * Created by project on 9/5/2015.
 */
var storage=window.localStorage;
var memberid;
var email;
$(document).ready(initHome);
window.onload = function() {
    initHome();
    /*if(storage.getItem("userdata")!=null){
        updateUserData();
    }*/
}
function initHome(){
    storage = window.localStorage;
    if(storage.getItem("userdata")!=null){
        updateUserData();
        var userD = JSON.parse(storage.getItem("userdata"));
        var userGroupInfo = [];
        var userid = userD[0].UserID;
        memberid = userid;
        var username = userD[0].UserName;
        var useremail = userD[0].UserEmail;
        email = useremail;
        var usergender = userD[0].UserGender;
        var lines = [];
        var innerH = "";

        for(var i=0;i<userD[1].length;i++){

            var roleid = userD[1][i].RoleID;
            var role = userD[1][i].Role;
            var groupid = userD[1][i].RoleGroupID;
            var groupname = userD[1][i].GroupName;
            var groupdescription = userD[1][i].GroupDescription;
            var groupprivacy = userD[1][i].GroupPrivacy;
            var grouptype = userD[1][i].GroupType;
            lines.push(createhtmlMiddle(groupname,groupprivacy,role,groupid,groupdescription,grouptype));
            if((i+1)%4==0 || i==userD[1].length-1){

                var lineL = "";
                for(var j=0;j<lines.length;j++){
                    lineL += lines[j];
                }

                innerH += createhtmlRow(lineL);
                lines = [];
            }
            //make the group boxes here-----------------------------------------------------------------------------
        }
        document.getElementById("grouploadingarea").innerHTML = innerH;
        document.getElementById("profile_username").innerHTML = username;
        document.getElementById("profile_email").innerHTML = useremail;
        document.getElementById("profile_gender").innerHTML = usergender;
        document.getElementById("header_email").innerHTML = useremail;

    }else {
        //redirect to the login page
        window.location = "index.html";
    }
}
function createGroup(groupname,groupdescription,groupprivacy,grouptype){
        var member = new PhpPostRequest("CreateGroup.php",[groupname,groupdescription,groupprivacy,grouptype,memberid],successGCreation,"profile.html");
        window.location = "profile.html";
}
function successGCreation(response){
    if(response!="Error102"){
        var groupid = response;//set group id here------------------------------------------------------------------
        notification("success","Successful!");
        alert(groupid);
        visitGroup(groupid);
    }else{
        notification("error","Error!");
    }
}
function visitGroup(groupid){
    storage.setItem("getGroup",groupid);
    window.location = "group.html";
}
function createhtmlRow(middleL){
    var firstLine = '<div class="row"> <div class="col-xs-12"><div class="row" style="margin-top:20px;">';
    var middleLine = middleL;
    var lastLine = '</div></div></div>';
    return firstLine+middleLine+lastLine;
}
function createhtmlMiddle(name,privacy,role,groupid,desc,typ){
    var firstL = '<div class="col-lg 3 col-sm-3 col-xs-6" ><button id="'+groupid+'" name="'+name+'" val1="'+privacy+'" val2="'+desc+'" val3="'+typ+'" onclick="getGroup(this.id,this.name,this.val1,this.val2,this.val3)" class="thumbnail"  style=" height:120px;width:100%; border-radius:10px;">';
    var secondL = '<p class="group-T">'+name+'</p>';
    var thirdL = '<p style="text-align: center;">'+privacy+'</p>';
    var fourthL = '<p style="text-align: center;">'+role+'</p></button> </div>';
    return firstL+secondL+thirdL+fourthL;
}
function updateUserData(){
    var refresh = new PhpPostRequest("RefreshUserData.php",[memberid,email],onUpdateSucess,"profile.html");
}
function onUpdateSucess(response){
    var userData = {};
    if(response!="Error102"){
        userData = response;
        storage.setItem("userdata",userData);
    }else{
        //if error occurred while logging

    }
}
function checkEmpty(str){
    if(str.split(" ").join("")){
        return true;
    }else{
        return false;
    }

}
function getGroup(id,name,privacy,desc,typ){
    var jsn = {groupId:id, userid:memberid, groupname:name, privacy:privacy, description:desc,type:typ};
    storage.setItem("getGroup",JSON.stringify(jsn));
    window.location = "group.html";
}