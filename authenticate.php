<?php

session_start();

$username = "admin";
$password = "Medical@2026";

if (
    $_POST['username'] == $username &&
    $_POST['password'] == $password
) {

    $_SESSION['logged_in'] = true;
    $_SESSION['username'] = $username;

    header("Location: index.php");
    exit();
} else {

    header("Location: login.php?error=Invalid username or password");

    exit();
}
