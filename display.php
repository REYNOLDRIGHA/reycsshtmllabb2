<?php
require_once 'connectdb.php';

/** @var mysqli $conn */

$sql = "SELECT * FROM members ORDER BY id DESC";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registered Members - FitLife Admin</title>
    <link rel="stylesheet" href="csslab.css">
    <style>
        .admin-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
        }
        .admin-table th, .admin-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        .admin-table th {
            background-color: #222;
            color: white;
        }
        .admin-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>

<header class="navbar">
    <div class="logo">FitLife <span>Admin Portal</span></div>
    <nav class="nav-links">
        <a href="membership.html">Back to Registration</a>
    </nav>
</header>

<main class="container" style="padding: 30px 10px;">
    <h2>Registered FitLife Members</h2>

    <table class="admin-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Plan</th>
                <th>Programs</th>
                <th>Goals</th>
                <th>Joined Date</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if ($result && mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . htmlspecialchars($row['full_name']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['email']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['phone']) . "</td>";
                    echo "<td>" . ($row['age'] ? $row['age'] : 'N/A') . "</td>";
                    echo "<td>" . htmlspecialchars($row['gender']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['membership_type']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['programs']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['fitness_goals']) . "</td>";
                    echo "<td>" . $row['created_at'] . "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='10'>No registered members found.</td></tr>";
            }
            ?>
        </tbody>
    </table>
</main>

</body>
</html>
<?php 
if (isset($conn) && $conn) {
    mysqli_close($conn); 
}
?>