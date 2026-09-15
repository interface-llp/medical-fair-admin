<?php

$apiUrl = "https://medicalfair.iddllp.com/api/survey.php";
$token = "ejnhiksmsfjnttjkehveiogw";

$ch = curl_init($apiUrl);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: ".$token
]);

$response = curl_exec($ch);

curl_close($ch);

header('Content-Type: application/json');

echo $response;

?>