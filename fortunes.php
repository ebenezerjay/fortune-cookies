<?php

// display existing table data
$fortuneTable = new mysqli("localhost:3306", "fortuned_eJI", "Helpontheway2112!", "fortuned_Fortunes");

if ($fortuneTable->connect_error) {
	die('Connect error: ' . $fortuneTable->connect_errno . ': ' . $fortuneTable->connect_error);
}

$sel = mysqli_query($fortuneTable,"SELECT * from allFortunes order by ID DESC");
$data = array();

while ($row = mysqli_fetch_array($sel)) {
 $data[] = array("ID"=>$row['ID'],"user"=>$row['user'],"fortuneText"=>$row['fortuneText'],"dateSubmitted"=>$row['dateSubmitted'],"favoriteAmount"=>$row['favoriteAmount']);
}
echo json_encode($data);


?>