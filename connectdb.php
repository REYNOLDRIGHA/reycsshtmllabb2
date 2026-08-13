<?php
$host = '127.0.0.1';
$user = 'root';
$pass = '';
$db   = 'Fitlife';
$port = 3307;

// Connect to MySQL server specifying port 3307
$conn = mysqli_connect($host, $user, $pass, null, $port);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Create database if it doesn't exist
if (!mysqli_query($conn, "CREATE DATABASE IF NOT EXISTS `$db`")) {
    die("Error creating database: " . mysqli_error($conn));
}

// Select the database
if (!mysqli_select_db($conn, $db)) {
    die("Could not select the database.");
}
?>