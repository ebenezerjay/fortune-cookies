<?php

// if (isset($_POST['enter'])) {
//     // echo htmlspecialchars($_POST['fortune-input']);
//     echo htmlspecialchars("Something is supposed to happen here");
// }

$servername = "localhost:3306";
$fortuneInput = "fortune-input";
$userName = "user-name";

if (!empty($_POST)) {
	print_r($_POST); exit;

	// Create connection
	$conn = new mysqli($servername, $fortuneInput, $userName);
	
	// Check connection
	if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
	}
	echo "Connected successfully";
}



?>