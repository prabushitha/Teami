<?php
/**
 * Created by PhpStorm.
 * User: project
 * Date: 9/5/2015
 * Time: 1:57 PM
 */

    require_once "connect.php";
    $email = $_POST['val1'];
    $password = $_POST['val2'];
    $useravailable  = mysql_query("SELECT * FROM member WHERE email='$email' AND password='$password' OR forgetpassword='$password'");
    if(mysql_num_rows($useravailable)>0){
        //if user email is available fetch user data
        print getData($email);
    }else{
        print "Error102";
        mysql_close();
    }
    function getData($email){
        $requestMember  = mysql_query("SELECT * FROM member WHERE email='$email'");
        $userdata = array();
        $userID = array();
        $groupID = array();
        if(mysql_num_rows($requestMember)>0){
            while ($data = mysql_fetch_array($requestMember)){
                $obj = new stdClass();
                array_push($userID,$data["id"]);
                $obj->UserID = $data["id"];
                $obj->UserName = $data["username"];
                $obj->UserEmail = $data["email"];
                $obj->UserGender = $data["gender"];
                array_push($userdata,$obj);
            }
            $mId = array_values($userID)[0];
            $requestRoles = mysql_query("SELECT * FROM role WHERE member_id='$mId'");
            if(mysql_num_rows($requestRoles)>0){
                $groupData = array();
                while ($data2 = mysql_fetch_array($requestRoles)){
                    $obj2 = new stdClass();
                    $gId = $data2["id"];
                    $obj2->RoleID = $gId;
                    $obj2->RoleGroupID = $data2["group_id"];
                    $obj2->Role = $data2["role"];
                    $requestGroups = mysql_query("SELECT * FROM group_details WHERE id='$gId'");
                    if(mysql_num_rows($requestGroups)>0){
                        while ($data3 = mysql_fetch_array($requestGroups)){
                            $obj2->GroupName = $data3["gname"];
                            $obj2->GroupDescription = $data3["description"];
                            $obj2->GroupPrivacy = $data3["privacy"];
                            $obj2->GroupType = $data3["gtype"];
                        }
                    }
                    array_push($groupData,$obj2);
                }
                array_push($userdata,$groupData);

            }
            return json_encode($userdata);
        }else{
            return "Error102";
        }
    }
?>