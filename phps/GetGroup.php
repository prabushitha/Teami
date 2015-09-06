<?php
/**
 * Created by PhpStorm.
 * User: project
 * Date: 9/5/2015
 * Time: 7:37 PM
 */
    require_once "connect.php";
    $userid = $_POST['val1']; //to check this user has privileges to access the group
    $groupid = $_POST['val2'];
    $userPriviledged  = mysql_query("SELECT * FROM role WHERE member_id='$userid' AND group_id='$groupid'");
    if(mysql_num_rows($userPriviledged)>0) {
        //if user has previledges
        if (mysql_num_rows($userPriviledged) > 0) {
            $role = "";
            $privacy = "";
            while ($data = mysql_fetch_array($userPriviledged)) {
                $role = $data["role"];
            }
            if($role=="Admin"){
                $privacy = 0;
            }elseif($role=="Moderator"){
                $privacy = 1;
            }elseif($role=="Member"){
                $privacy = 2;
            }
            $requestGroup = mysql_query("SELECT * FROM post WHERE group_id='$groupid' AND privacy>='$privacy'");
            $userdata = array();
            if (mysql_num_rows($requestGroup) > 0) {
                while ($data = mysql_fetch_array($requestGroup)) {
                    $obj = new stdClass();
                    $obj->GroupID = $data["group_id"];
                    $obj->PostID = $data["post_id"];
                    $obj->UserID = $data["member_id"];
                    $obj->PostNote = $data["note"];
                    $obj->PostFile = $data["file"];
                    $obj->PostTask = $data["task_id"];
                    $obj->PostDate = $data["date_time"];
                    $obj->PostPrivacy = $data["privacy"];
                    $xx = $data["member_id"];
                    $requestMember = mysql_query("SELECT * FROM member WHERE id='$xx'");
                    if (mysql_num_rows($requestMember) > 0) {
                        while ($data = mysql_fetch_array($requestMember)) {
                            $obj->UserName = $data["username"];
                        }
                    }
                    array_push($userdata, $obj);
                }
                print json_encode($userdata);
            } else {
                print "Error102";
                mysql_close();
            }
        }

    }
?>