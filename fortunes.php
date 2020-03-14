<?php

// display existing table data
$fortuneTable = new mysqli("localhost:3306", "fortuned_eJI", "Helpontheway2112!", "fortuned_Fortunes");

if ($fortuneTable->connect_error) {
	die('Connect error: ' . $fortuneTable->connect_errno . ': ' . $fortuneTable->connect_error);
}

$sel = mysqli_query($fortuneTable,"select * from allFortunes");
$data = array();

while ($row = mysqli_fetch_array($sel)) {
 $data[] = array("ID"=>$row['ID'],"user"=>$row['user'],"fortuneText"=>$row['fortuneText'],"dateSubmitted"=>$row['dateSubmitted'],"favoriteAmount"=>$row['favoriteAmount']);
}
echo json_encode($data);

// sort the table rows

// check if contact form was submitted
if(isset($_POST['contact-enter'])) {
	$fortuneDatabaseContact = new mysqli("localhost:3306", "fortuned_eJI", "Helpontheway2112!", "fortuned_Fortunes");
	$contactResponse = "";

	// Check connection
	if ($fortuneDatabaseContact->connect_error) {
		die('Connect error: ' . $fortuneDatabaseContact->connect_errno . ': ' . $fortuneDatabaseContact->connect_error);
	}

	// get input data
	$contactName = $_POST['contact-name'];
	// $contactEmail = $_POST['contact-email'];
	// $contactTopic = $_POST['contact-topic'];
	// $contactMessage = $_POST['contact-message'];

	$contactResponse = "Thank you " . $contactName . " . " . " Your message has been submitted.";

	// insert into database
	$contactData = "INSERT INTO contactFormData (contactName,contactEmail,contactTopic,contactMessage) VALUES ('{$fortuneDatabaseContact->real_escape_string($_POST['contactName'])}', 
	'{$fortuneDatabaseContact->real_escape_string($_POST['contactEmail'])}',
	'{$fortuneDatabaseContact->real_escape_string($_POST['contactTopic'])}',
	'{$fortuneDatabaseContact->real_escape_string($_POST['contactMessage'])}')";

	$insertContact = $fortuneDatabaseContact->query($contactData);

	// print response for user after submission
	if ($insertContact) {
		echo $contactResponse;
	} else {
		die("Error: {$fortuneDatabaseContact->errno} : {$fortuneDatabaseContact->error}");
	}

	$fortuneDatabaseContact->close();
}

//check if fortune form was submitted
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
	$fortuneData = "INSERT INTO allFortunes (user,fortuneText) VALUES ( '{$fortuneDatabase->real_escape_string($_POST['user'])}', 
	'{$fortuneDatabase->real_escape_string($_POST['fortuneText'])}')";

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