<?php
/**
 * Created by PhpStorm.
 * User: project
 * Date: 9/6/2015
 * Time: 4:32 AM
 */
    require_once "connect.php";
    $groupid = $_POST['val1']; //to check this user has privileges to access the group
    $memberid = $_POST['val2'];
    $msg = $_POST['val3'];
    $privacy = $_POST['val4'];
    $date_time = date("Y/m/d")." at ".date("h:i:sa");
    $addPost = mysql_query("INSERT INTO post (group_id, member_id, note, date_time, privacy) VALUES ('$groupid','$memberid','$msg','$date_time', '$privacy')");
    if($addPost===True){
        print "success";
    }else{
        print "Error102";
    }
?>
