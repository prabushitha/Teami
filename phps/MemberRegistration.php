<?php
/**
 * Created by PhpStorm.
 * User: project
 * Date: 9/5/2015
 * Time: 10:11 AM
 */
    require_once "connect.php";
    $username = $_POST['val1'];
    $email = $_POST['val2'];
    $password = $_POST['val3'];
    $gender = $_POST['val4'];
    $useravailable  = mysql_query("SELECT * FROM member WHERE email='$email'");
    if(mysql_num_rows($useravailable)>0){
        //if user email already exists in the db
        print "Error101";
    }else{
        $addUser = mysql_query("INSERT INTO member (email, username, password, gender) VALUES ('$email','$username','$password','$gender')");
        if($addUser===True){
            print "success";
        }else{
            print "Error102";
        }
        mysql_close();
    }

?>