<?php
// decode json
if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)){
	$_POST = json_decode(file_get_contents('php://input'), true);
}

	// connect to database
	$fortuneDatabaseContact = new mysqli("localhost:3306", "fortuned_eJI", "Helpontheway2112!", "fortuned_Fortunes");

	// Check connection
	if ($fortuneDatabaseContact->connect_error) {
		die('Connect error: ' . $fortuneDatabaseContact->connect_errno . ': ' . $fortuneDatabaseContact->connect_error);
	}

	$message = "Your message was sent.";

	// insert into database

	$contactData = "INSERT INTO contactFormData (contactName,contactEmail,contactTopic,contactMessage) VALUES 
  ('{$fortuneDatabaseContact->real_escape_string($_POST['contactName'])}', 
	'{$fortuneDatabaseContact->real_escape_string($_POST['contactEmail'])}',
	'{$fortuneDatabaseContact->real_escape_string($_POST['contactTopic'])}',
	'{$fortuneDatabaseContact->real_escape_string($_POST['contactMessage'])}')";

	$insertData = $fortuneDatabaseContact->query($contactData);

	if ($insertFortune) {
		echo "Thank you, ". $contactName. " " . $message;
	} else {
		die("Error: {$fortuneDatabase->errno} : {$fortuneDatabase->error}");
	}

?>