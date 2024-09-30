<?php

include ('../connection/connection.php');

// date_default_timezone_set('America/Sao_Paulo');
// $dataAtual = date('Y-m-d H:i:s', time()); //setei o horario e dia padrão, ent estrá já automatico a data


//request mesma função do post e get, mas ele ouve os dois
if($_POST['operacao'] == 'create'){

    if(empty($_POST['ra']) || 
       empty($_POST['nome']) || 
       empty($_POST['serie']) ||
       empty($_POST['email']) ||
       empty($_POST['telefone']) ||
       empty($_POST['adm_id'])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos obrigatórios vazios.'
        ];
    }else{

        try{
            $sql = "INSERT INTO ALUNO (RA, NOME, SERIE, EMAIL, TELEFONE, ADM_ID) VALUES (?,?,?,?,?,?)";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['ra'],
                $_POST['nome'],
                $_POST['serie'],
                $_POST['email'],
                $_POST['telefone'],
                $_POST['adm_id']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Cadastro do aluno salvo com sucesso'
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

        $sql = "SELECT * FROM ALUNO";
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

    if(empty($_POST['ra']) ||
       empty($_POST['nome']) || 
       empty($_POST['serie']) ||
       empty($_POST['email']) ||
       empty($_POST['telefone']) ||
       empty($_POST['adm_id'])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos para alterar vazios.'
        ];
    }else{

        try{
            $sql = "UPDATE ALUNO SET NOME = ?, SERIE = ?, EMAIL = ?, TELEFONE = ?, ADM_ID = ? WHERE RA = ?";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['nome'],
                $_POST['serie'],
                $_POST['email'],
                $_POST['telefone'],
                $_POST['adm_id'],
                $_POST['ra']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Registro do aluno atualizado com sucesso'
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

    if(empty($_POST['ra'])){

        $dados = [
            'type' => 'error',
            'message' => 'RA do aluno não reconhecido ou inexistente'
        ];
    }else{

        try{
            $sql = "DELETE FROM ALUNO WHERE RA = ?";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['ra']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Aluno deletado com sucesso'
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

        $sql = "SELECT * FROM ALUNO WHERE RA = ".$_POST['RA']."";
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