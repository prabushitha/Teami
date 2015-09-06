<?php
/**
 * Created by PhpStorm.
 * User: project
 * Date: 9/6/2015
 * Time: 5:54 AM
 */
    require_once "connect.php";
    $groupid = $_POST['val2'];
    $role = $_POST['val3'];
    $memberemail = $_POST['val1'];
    $requestUsers = mysql_query("SELECT * FROM member WHERE email='$memberemail'");
    if (mysql_num_rows($requestUsers) > 0) {
        while ($data = mysql_fetch_array($requestUsers)) {
            $userid = $data["id"];
            $requestExist = mysql_query("SELECT * FROM role WHERE member_id='$userid'");
            if(mysql_num_rows($requestExist) > 0){

            }else{
                $addUser = mysql_query("INSERT INTO role (group_id, member_id, role) VALUES ('$groupid','$userid','$role')");
            }

            if($addUser===True){
                print "success";
            }else{
                print "Error102";
            }
        }

    } else {
        print "Error102";
        mysql_close();
    }
?>