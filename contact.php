<?php

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
}

?>