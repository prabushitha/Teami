<?php
/**
 * Created by PhpStorm.
 * User: project
 * Date: 9/5/2015
 * Time: 7:15 PM
 */
    require_once "connect.php";
    $groupname = $_POST['val1']; //to check this user has privileges to access the group
    $groupdescription = $_POST['val2'];
    $groupprivacy = $_POST['val3'];
    $grouptype = $_POST['val4'];

    $memberid = $_POST['val5'];
    $role = 'Admin';
    $isExist = mysql_query("SELECT * FROM group_details WHERE gname='$groupname'");
    if(mysql_num_rows($isExist)>0){
        print "Error103";

    }else{
        $addGroup = mysql_query("INSERT INTO group_details (gname, description, privacy, gtype) VALUES ('$groupname','$groupdescription','$groupprivacy','$grouptype')");
        if($addGroup===True){
            $requestGid =  mysql_query("SELECT * FROM group_details WHERE gname='$groupname'");
            $gid = 0;
            if(mysql_num_rows($requestGid)>0){
                while ($data = mysql_fetch_array($requestGid)){
                    $gid = $data["id"];
                }
                $addRole = mysql_query("INSERT INTO role (group_id, member_id, role) VALUES ('$gid','$memberid','$role')");
            }

            print $gid;
        }else{
            print "Error102";
        }

    }

?>