<?php

$dataArray = array();
$message = "";

//check if form was submitted
if(isset($_POST['enter-button'])){ 
	$fortuneDatabase = new mysqli("localhost:3306", "fortuned_eJI", "Helpontheway2112!", "fortuned_Fortunes");

	// Check connection
	if ($fortuneDatabase->connect_error) {
		die('Connect error: ' . $fortuneDatabase->connect_errno . ': ' . $fortuneDatabase->connect_error);
	} 

	//get input text
  $input = $_POST['fortune-input']; 
	$message = "Boom Shakalaka! You entered: ".$input;
	
	// Insert data 
	$fortuneData = "INSERT INTO allFortunes (user,fortuneText) VALUES ( '{$fortuneDatabase->real_escape_string($_POST['user'])}', '{$fortuneDatabase->real_escape_string($_POST['fortuneText'])}')";
	$insertFortune = $fortuneDatabase->query($fortuneData);
	
	// Print response from mysql
	if ($insertFortune) {
		echo $message;
	} else {
		die("Error: {$fortuneDatabase->errno} : {$fortuneDatabase->error}");
	}
	$fortuneDatabase->close();
}

?>