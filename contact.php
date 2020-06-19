<?php
	// connect to database
	$fortuneDatabaseContact = new mysqli("localhost:3306", "fortuned_eJI", "Helpontheway2112!", "fortuned_Fortunes");

	// Check connection
	if ($fortuneDatabaseContact->connect_error) {
		die('Connect error: ' . $fortuneDatabaseContact->connect_errno . ': ' . $fortuneDatabaseContact->connect_error);
	}

	// insert into database

	$contactData = "INSERT INTO contactFormData (contactName,contactEmail,contactTopic,contactMessage) VALUES 
  ('{$fortuneDatabaseContact->real_escape_string($_POST['contactName'])}', 
	'{$fortuneDatabaseContact->real_escape_string($_POST['contactEmail'])}',
	'{$fortuneDatabaseContact->real_escape_string($_POST['contactTopic'])}',
	'{$fortuneDatabaseContact->real_escape_string($_POST['contactMessage'])}')";

	$insertData = $fortuneDatabaseContact->query($contactData);

?>