<?php

$host = '127.0.0.1';
$user = 'root';
$pass = '';
$db   = 'Fitlife';
$port = 3307;

// Connect to MySQL server specifying port 3307
$conn = mysqli_connect($host, $user, $pass, '', $port);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Create the database
if (mysqli_query($conn, "CREATE DATABASE IF NOT EXISTS `$db`")) {
    echo "Database created successfully or already exists.<br>";
} else {
    die("Error creating database: " . mysqli_error($conn));
}

// Select the database
if (mysqli_select_db($conn, $db)) {
    echo "Connected to the $db database successfully.";
} else {
    echo "Could not select the database.";
}

mysqli_close($conn);
?>