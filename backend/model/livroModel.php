<?php

include ('../connection/connection.php');

// date_default_timezone_set('America/Sao_Paulo');
// $dataAtual = date('Y-m-d H:i:s', time()); //setei o horario e dia padrão, ent estrá já automatico a data


//request mesma função do post e get, mas ele ouve os dois
if($_POST['operacao'] == 'create'){
    session_start();

    if(empty($_POST['tombo'])||
       empty($_POST['nome'])||
       empty($_POST['autor'])||
       empty($_SESSION['ADM_ID'])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos obrigatórios vazios.'
        ];
    }else{

        try{
            foreach($_POST['tombo'] as $key => $tombo){

                $sql = "INSERT INTO LIVRO (TOMBO, NOME, ID_AUTOR, ID_ADM) VALUES (?,?,?,?)";
                $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
                $stmt -> execute([ //executa sql
                    $tombo,
                    $_POST['nome'][$key],
                    $_POST['autor'][$key],
                    $_SESSION['ADM_ID']
                ]);

            };
            
            $dados = [
                'type' => 'success',
                'message' => 'Livro adicionado com sucesso'
            ];
        }catch(PDOException $e){
            $dados = [
                'type' => 'error',
                'message' => 'Erro: ' . $e -> getMessage()
            ];
        }

    }
}

if($_POST['operacao'] == 'read'){
    try{

        $sql = "SELECT LIVRO.*, 
                AUTOR.NOME AS AUTORNAME FROM LIVRO
                JOIN AUTOR ON ID_AUTOR = AUTOR.ID";
        $resultado = $pdo->query($sql); //recebe a query dos valores do banco
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){ //while pra varrer o banco linha por linha usando o FETCH e o row vai ler linha por linha do banco
            $dados[] = array_map(null, $row); //array pra mapear os dados, recebe 2 parametros
        }

    }catch(PDOException $e){
        $dados = [
            'type' => 'error',
            'message' => 'Erro de consulta: ' . $e -> getMessage()
        ];
    }
}

if($_POST['operacao'] == 'read_autor'){
    try{

        $sql= "SELECT * FROM AUTOR";
        $resultado = $pdo->query($sql); //recebe a query dos valores do banco
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){ //while pra varrer o banco linha por linha usando o FETCH e o row vai ler linha por linha do banco
            $dados[] = array_map(null, $row); //array pra mapear os dados, recebe 2 parametros
        }

    }catch(PDOException $e){
        $dados = [
            'type' => 'error',
            'message' => 'Erro de consulta: ' . $e -> getMessage()
        ];
    }
}

if($_POST['operacao'] == 'update'){

    if(empty($_POST['nome'][0]) ||
       empty($_POST['tombo'][0]) ||
       empty($_POST['autor'][0])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos para alterar vazios.'
        ];
    }else{

        try{
            $sql = "UPDATE LIVRO SET NOME = ?, ID_AUTOR = ? WHERE TOMBO = ?";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['nome'][0],
                $_POST['autor'][0],
                $_POST['tombo'][0]
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Livro alterado com sucesso'
            ];
        }catch(PDOException $e){
            $dados = [
                'type' => 'error',
                'message' => 'Erro: ' . $e -> getMessage()
            ];
        }

    }
}

if($_POST['operacao'] == 'delete'){

    if(empty($_POST['tombo'])){

        $dados = [
            'type' => 'error',
            'message' => 'Tombo do livro não reconhecido ou inexistente'
        ];
    }else{

        try{
            $sql = "DELETE FROM LIVRO WHERE TOMBO = ?";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['tombo']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Livro deletado com sucesso'
            ];
        }catch(PDOException $e){
            $dados = [
                'type' => 'error',
                'message' => 'Erro: ' . $e -> getMessage()
            ];
        }

    }
} 

if($_POST['operacao'] == 'view'){
    try{

        $sql = "SELECT LIVRO.*, 
                ADM.NOME AS ADMNAME FROM LIVRO 
                JOIN ADM ON LIVRO.ID_ADM = ADM.ID
                WHERE LIVRO.TOMBO = ".$_POST['TOMBO']."";
        $resultado = $pdo->query($sql); //recebe a query dos valores do banco
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){ //while pra varrer o banco linha por linha usando o FETCH e o row vai ler linha por linha do banco
            $dados[] = array_map(null, $row); //array pra mapear os dados, recebe 2 parametros
        }

    }catch(PDOException $e){
        $dados = [
            'type' => 'error',
            'message' => 'Erro de consulta: ' . $e -> getMessage()
        ];
    }
}



echo json_encode($dados);



?>