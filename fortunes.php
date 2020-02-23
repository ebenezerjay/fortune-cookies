<?php

// display existing table data
$conn = new mysqli("localhost:3306", "fortuned_eJI", "Helpontheway2112!", "fortuned_Fortunes");

if ($conn->connect_error) {
	die('Connect error: ' . $conn->connect_errno . ': ' . $conn->connect_error);
}

// include 'config.php';

$sel = mysqli_query($conn,"select * from allFortunes");
$data = array();

while ($row = mysqli_fetch_array($sel)) {
 $data[] = array("ID"=>$row['ID'],"user"=>$row['user'],"fortuneText"=>$row['fortuneText'],"dateSubmitted"=>$row['dateSubmitted'],"favoriteAmount"=>$row['favoriteAmount']);
}
echo json_encode($data);

//check if form was submitted
if(isset($_POST['enter'])){ 
	$message = "";
	$fortuneDatabase = new mysqli("localhost:3306", "fortuned_eJI", "Helpontheway2112!", "fortuned_Fortunes");

	// Check connection
	if ($fortuneDatabase->connect_error) {
		die('Connect error: ' . $fortuneDatabase->connect_errno . ': ' . $fortuneDatabase->connect_error);
	} 
	
	//get input text
	$user = $_POST['user'];
	$input = $_POST['fortuneText']; 
	
	$message = "Boom Shakalaka! " . $user . " entered " . $input;
	
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