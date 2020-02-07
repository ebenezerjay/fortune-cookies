<?php

// if (isset($_POST['enter'])) {
//     // echo htmlspecialchars($_POST['fortune-input']);
//     echo htmlspecialchars("Something is supposed to happen here");
// }

if (!empty($_POST)) {
	// Create connection to mysql
	$fortuneDatabase = new mysqli("localhost", "fortuned_eJI", "Helpontheway2112!", "fortuned_Fortunes");

	// Check connection
	if ($fortuneDatabase->connect_error) {
		die('Connect error: ' . $fortuneDatabase->connect_errno . ': ' . $fortuneDatabase->connect_error);
	} 

	// Insert data 
	$fortuneData = "INSERT INTO allFortunes (user,fortuneText) VALUES ( '{$fortuneDatabase->real_escape_string($_POST['user'])}', '{$fortuneDatabase->real_escape_string($_POST['fortuneText'])}')";

	$insertFortune = $fortuneDatabase->query($fortuneData);
	
	function test_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}

	// Print response from mysql
	if ($insertFortune) {
		echo htmlspecialchars($_SERVER["PHP_SELF"]);
		echo "Boom! Row ID: {$fortuneDatabase->insert_id}";
	} else {
		die("Error: {$fortuneDatabase->errno} : {$fortuneDatabase->error}");
	}
	$fortuneDatabase->close();
}



?>