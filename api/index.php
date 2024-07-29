<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "OPTIONS":
        // Respond to preflight requests with the CORS headers
        header("HTTP/1.1 204 No Content");
        exit;

    case "GET":
        $sql = "SELECT * FROM db_users";
        $path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

        if (isset($path[2]) && is_numeric($path[2])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[2]);
            $stmt->execute();
            $db_user = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($db_user);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        }
        break;

    case "POST":
        $db_user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO db_users (name, email, password, phone, create_at) VALUES (:name, :email, :password, :phone, :create_at)";
        $stmt = $conn->prepare($sql);
        $create_at = date('Y-m-d');
        $stmt->bindParam(':name', $db_user->name);
        $stmt->bindParam(':email', $db_user->email);
        $stmt->bindParam(':password', $db_user->password);
        $stmt->bindParam(':phone', $db_user->phone);
        $stmt->bindParam(':create_at', $create_at);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $db_user = json_decode(file_get_contents('php://input'));
        if (!isset($db_user->id)) {
            $response = ['status' => 0, 'message' => 'ID is required for update'];
            echo json_encode($response);
            break;
        }
        $sql = "UPDATE db_users SET name = :name, email = :email, password = :password, phone = :phone, update_at = :update_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $update_at = date('Y-m-d');
        $stmt->bindParam(':id', $db_user->id);
        $stmt->bindParam(':name', $db_user->name);
        $stmt->bindParam(':email', $db_user->email);
        $stmt->bindParam(':password', $db_user->password);
        $stmt->bindParam(':phone', $db_user->phone);
        $stmt->bindParam(':update_at', $update_at);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
        if (isset($path[2]) && is_numeric($path[2])) {
            $sql = "DELETE FROM db_users WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[2]);
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'ID is required for delete'];
        }
        echo json_encode($response);
        break;

    default:
        header("HTTP/1.1 405 Method Not Allowed");
        break;
}
?>
