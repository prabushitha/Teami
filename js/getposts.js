/**
 * Created by project on 9/6/2015.
 */
var storage=window.localStorage;
var groupidnum;
window.onload = function() {
    storage=window.localStorage;
    if(storage.getItem("userdata")==null){
        window.location = "index.html";
    }
    initGroup();
    /*if(storage.getItem("userdata")!=null){
     updateUserData();
     }*/
}
function initGroup(){
    if(storage.getItem("getGroup")!=null){
        var jsn = JSON.parse(storage.getItem("getGroup"));
        //alert(jsn.groupId);
        //alert(jsn.userid);
        var group = new PhpPostRequest("GetGroup.php",[jsn.userid,jsn.groupId],groupSuccess,null);
        groupidnum = jsn.groupId;
        getMembers(jsn.groupId);
    }
}
function groupSuccess(response){
    storage.setItem("PostData",response);

    var userdatas = JSON.parse(storage.getItem("userdata"));
    var jsn = JSON.parse(storage.getItem("getGroup"));
    if(storage.getItem("PostData")!="Error102"){
        var postData = JSON.parse(storage.getItem("PostData"));
        var htmlTxt = "";
        for(var i=postData.length-1;i>=0;i--){
            htmlTxt+=makeAPost(postData[i].UserName,postData[i].PostDate,postData[i].PostNote);
        }
        document.getElementById("postArea").innerHTML = htmlTxt;
    }
    document.getElementById("header_email").innerHTML = userdatas[0].UserEmail;
    document.getElementById("header_group").innerHTML = jsn.groupname;

}
function makeAPost(name,date,note){
    var htmlText = '<div class="row" style="margin-top:20px;"> <div class="col-xs-12 comment" style="margin:0 auto;"> <div style="text-align: left;">';
    htmlText+='<h4>'+name+'</h4>';
    htmlText+='<p style="margin-top:-10px;font-size:10px;">'+date+'</p>';
    htmlText+='</div> <div style="text-align: right; margin-top:-30px"> <a href="#"> <span class="glyphicon glyphicon-pencil" aria-hidden="true" style="margin-right:5px;color: #25a2a6; "></span> </a> <a href="#"> <span class="glyphicon glyphicon-trash" aria-hidden="true" style=" color: #25a2a6;"></span> </a> </div> <div>';
    htmlText+='<p style="margin-top:30px; font-size:20px; text-align:justify;color: #101010;margin-bottom:30px !important;">'+note+'</p></div> </div></div>';
    return htmlText;
}
function createAPost(msg,privacy){
    var dat = JSON.parse(storage.getItem("getGroup"));
    var gid=dat.groupId;
    var mid=dat.userid;
    var group = new PhpPostRequest("CreateAPost.php",[gid,mid,msg,privacy],postSuccess,null);
}
function postSuccess(response){
    alert(response);
}
function getMembers(gid){
    var group = new PhpPostRequest("GetGroupMembers.php",[gid],memberSuccess,null);
}
function memberSuccess(response){
    storage.setItem("groupMembers",response);
    var jsn = JSON.parse(storage.getItem("groupMembers"));
    var htmlTxt = "";
    for(var i=0;i<jsn.length;i++){
        htmlTxt += '<button type="button" class="list-group-item">'+jsn[i].UserName+'   ['+jsn[i].UserRole+']</button>';
    }
    document.getElementById("groupMembers").innerHTML = htmlTxt;
}

function AddUser(useremail,role){
    var group = new PhpPostRequest("AddUser.php",[useremail,groupidnum,role],addSuccess,null);
}
function addSuccess(response){
    window.location = "group.html";
}