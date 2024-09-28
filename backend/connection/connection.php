<?php

$hostname = 'localhost';
$dbname = 'biblioteca';
$username = 'root';
$password = '';

try{
    $pdo = new PDO('mysql:host='.$hostname.';dbname='.$dbname, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT EMAIL FROM SISTEMA WHERE ID = 1");
    $config = $stmt->fetch(PDO::FETCH_ASSOC);
    $email_fixo = $config['EMAIL'];
    
    $return = array(
        'type' => 'success',
        'message' => 'A conexão com o banco de dados ' . $dbname . ', foi realizado com sucesso!'
    );
} catch (PDOException $e) {
    $return = array(
        'type' => 'error',
        'message' => 'Erro: '.$e->getMessage()
    );
}
// echo json_encode($return);