<?php
header("Content-Type: application/json");

// Conexión a la BD
$conexion = new mysqli("localhost", "root", "", "proyecto_crud");

if ($conexion->connect_error) {
    die(json_encode(["error" => "Error de conexión"]));
}

// Insertar datos
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $datos = json_decode(file_get_contents("php://input"), true);

    if ($datos["accion"] === "insertar") {
        $nombre = $datos["nombre"];
        $email = $datos["email"];
        $movil = $datos["movil"];

        $stmt = $conexion->prepare("INSERT INTO personas (nombre, email, movil) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $email, $movil);
        $stmt->execute();
        $stmt->close();

        echo json_encode(["ok" => true]);
        exit;
    }
}

// Mostrar datos
$resultado = $conexion->query("SELECT * FROM personas");
$personas = [];

while ($fila = $resultado->fetch_assoc()) {
    $personas[] = $fila;
}

echo json_encode($personas);
