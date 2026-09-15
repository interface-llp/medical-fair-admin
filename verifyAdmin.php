<?php

session_start();

header('Content-Type: application/json');

$password = $_POST["password"] ?? "";

$correctPassword = "Medical@2026";

if ($password === $correctPassword) {

    session_regenerate_id(true);
    $_SESSION["admin"] = true;

    echo json_encode(["success" => true]);
    exit;
}

echo json_encode(["success" => false]);

exit;

?>