<?php
// Include connection script
require_once 'connectdb.php';

/** @var mysqli $conn */

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Capture POST data safely
    $full_name       = mysqli_real_escape_string($conn, $_POST['full_name'] ?? '');
    $email           = mysqli_real_escape_string($conn, $_POST['email'] ?? '');
    $phone           = mysqli_real_escape_string($conn, $_POST['phone'] ?? '');
    $age             = !empty($_POST['age']) ? intval($_POST['age']) : "NULL";
    $gender          = mysqli_real_escape_string($conn, $_POST['gender'] ?? 'Not Specified');
    $membership_type = mysqli_real_escape_string($conn, $_POST['membership_type'] ?? '');
    $fitness_goals   = mysqli_real_escape_string($conn, $_POST['fitness_goals'] ?? '');

    // Convert array of checked programs into a comma-separated string
    if (isset($_POST['programs']) && is_array($_POST['programs'])) {
        $programs = mysqli_real_escape_string($conn, implode(", ", $_POST['programs']));
    } else {
        $programs = "None selected";
    }

    // 2. Automatically create table if it doesn't exist
    $createTableSQL = "CREATE TABLE IF NOT EXISTS members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        age INT NULL,
        gender VARCHAR(20),
        membership_type VARCHAR(50),
        programs VARCHAR(255),
        fitness_goals TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    mysqli_query($conn, $createTableSQL);

    // Format age SQL value appropriately
    $age_value = ($age === "NULL") ? "NULL" : $age;

    // 3. Insert record into MySQLi database
    $sql = "INSERT INTO members (full_name, email, phone, age, gender, membership_type, programs, fitness_goals) 
            VALUES ('$full_name', '$email', '$phone', $age_value, '$gender', '$membership_type', '$programs', '$fitness_goals')";

    if (mysqli_query($conn, $sql)) {
        echo "<div style='font-family: Arial, sans-serif; text-align: center; margin-top: 50px;'>";
        echo "<h2 style='color: #28a745;'>Registration Successful!</h2>";
        echo "<p>Welcome to FitLife, <strong>" . htmlspecialchars($full_name) . "</strong>!</p>";
        echo "<a href='display.php' style='text-decoration: none; background: #007bff; color: white; padding: 10px 20px; border-radius: 5px;'>View Admin Member List</a>";
        echo "</div>";
    } else {
        echo "Error inserting record: " . mysqli_error($conn);
    }
}

mysqli_close($conn);
?>