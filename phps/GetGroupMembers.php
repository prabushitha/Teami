<?php
/**
 * Created by PhpStorm.
 * User: project
 * Date: 9/6/2015
 * Time: 5:06 AM
 */
    require_once "connect.php";
    $groupid = $_POST['val1'];
    $requestUsers = mysql_query("SELECT * FROM role WHERE group_id='$groupid'");
    $userdata = array();
    if (mysql_num_rows($requestUsers) > 0) {
        while ($data = mysql_fetch_array($requestUsers)) {
            $userid = $data["member_id"];
            $userRole = $data["role"];
            $obj = new stdClass();
            $obj->UserRole = $userRole;
            $requestName = mysql_query("SELECT * FROM member WHERE id='$userid'");
            if (mysql_num_rows($requestName) > 0) {
                while ($data2 = mysql_fetch_array($requestName)) {
                    $obj->UserName = $data2["username"];
                }
            }
            array_push($userdata, $obj);
        }
        print json_encode($userdata);
    } else {
        print "Error102";
        mysql_close();
    }

?>