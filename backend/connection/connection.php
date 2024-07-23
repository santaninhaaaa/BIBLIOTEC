<?php

$hostname = 'localhost';
$dbname = 'biblioteca';
$username = 'root';
$password = 'usbw';

try{
    $pdo = new PDO('mysql:host='.$hostname.';dbname='.$dbname, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $return = array(
        'type' => 'success',
        'message' => 'Conexão realizada com sucesso!'
    );
} catch (PDOException $e) {
    $return = array(
        'type' => 'error',
        'message' => 'Erro: '.$e->getMessage()
    );
}
// echo json_encode($return);