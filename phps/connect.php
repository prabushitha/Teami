<?php
/**
 * Created by PhpStorm.
 * User: project
 * Date: 9/5/2015
 * Time: 10:13 AM
 */

	$db_name = "teami";
	$db_username = "whileloop";
	$db_password = "whileloop123";
	$db_host = "localhost";
	mysql_connect($db_host, $db_username, $db_password, $db_name);
	mysql_select_db($db_name) or die (mysql_error());
?>