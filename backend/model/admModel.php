<?php

include ('../connection/connection.php');

// date_default_timezone_set('America/Sao_Paulo');
// $dataAtual = date('Y-m-d H:i:s', time()); //setei o horario e dia padrão, ent estrá já automatico a data


//request mesma função do post e get, mas ele ouve os dois
if($_POST['operacao'] == 'create'){

    if(empty($_POST['nome']) ||
       empty($_POST['login']) ||
       empty($_POST['senha'])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos obrigatórios vazios.'
        ];
    }else{

        try{
            $sql = "INSERT INTO ADM (NOME, LOGIN, SENHA) VALUES (?,?,?)";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['nome'],
                $_POST['login'],
                $_POST['senha']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Cadastro do ADM feito com sucesso'
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

        $sql = "SELECT * FROM ADM";
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

    if(empty($_POST['id']) ||
       empty($_POST['nome']) || 
       empty($_POST['login']) || 
       empty($_POST['senha'])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos para alterar vazios.'
        ];
    }else{

        try{
            $sql = "UPDATE ADM SET NOME = ?, LOGIN = ?, SENHA = ?  WHERE ID = ?";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso

            $stmt -> execute([ //executa sql
                $_POST['nome'],
                $_POST['login'],
                $_POST['senha'],
                $_POST['id']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Cadastro do ADM alterado com sucesso'
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
    session_start();

    if(empty($_SESSION['ADM_ID'])){

        $dados = [
            'type' => 'error',
            'message' => 'ID do ADM não reconhecido ou inexistente'
        ];
    }else{

        try{
            $sql = "DELETE FROM ADM WHERE ID = :adm_id";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                ':adm_id' => $_SESSION['ADM_ID']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'ADM deletado com sucesso'
            ];
        }catch(PDOException $e){
            $dados = [
                'type' => 'error',
                'message' => 'Erro: ' . $e -> getMessage()
            ];
        }

    }
} 

if($_POST['operacao'] == 'count_all'){
    session_start();

    try{

        $sql = "SELECT 
                (SELECT COUNT(*) FROM EMPRESTIMO WHERE (ID_STATUS = 1 OR ID_STATUS = 2 OR ID_STATUS = 3) AND ID_ADM = ?) AS TOTAL_EMPRESTIMO,
                (SELECT COUNT(*) FROM EMPRESTIMO WHERE ID_STATUS = 3 AND HIST_ID_ADM = ?) AS TOTAL_DEVOLUCAO,
                (SELECT COUNT(*) FROM USUARIO WHERE ADM_ID = ?) AS TOTAL_USER,
                (SELECT COUNT(*) FROM LIVRO WHERE ID_ADM = ?) AS TOTAL_LIVRO";

        $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
        $stmt -> execute([ //executa sql
            $_SESSION['ADM_ID'],
            $_SESSION['ADM_ID'],
            $_SESSION['ADM_ID'],
            $_SESSION['ADM_ID']
        ]);
                  
        $dados = $stmt->fetch(PDO::FETCH_ASSOC);

    }catch(PDOException $e){
        $dados = [
            'type' => 'error',
            'message' => 'Erro de consulta: ' . $e -> getMessage()
        ];
    }
}

if($_POST['operacao'] == 'login'){
    try{
        $login = isset($_POST['LOGIN']) ? addslashes(trim($_POST['LOGIN'])) : false;
        $senha = isset($_POST['SENHA']) ? $_POST['SENHA'] : false;
        if(empty($login) || empty($senha)){
            $dados = [
                'type' => 'error',
                'message' => 'Usuário ou senha não preeenchidos ou incorretos'
            ];
        }
        $sql = $pdo->prepare("SELECT * FROM ADM WHERE LOGIN = '".$_POST['LOGIN']."' AND SENHA = '".$_POST['SENHA']."'");
        $sql->execute();
        $total = $sql->rowCount();
        if($total === 1){
            $linha = $sql->fetch();
            session_start();
            $_SESSION['NOME'] = $linha['NOME'];
            $_SESSION['LOGIN'] = $linha['LOGIN'];
            $_SESSION['ADM_ID'] = $linha['ID'];

            $dados = [
                'type' => 'success',
                'message' => 'Seja bem-vindo(a) '.$_SESSION['NOME']
            ];
        } else {
            $dados = [
                'type' => 'error',
                'message' => 'Usuário e/ou senha incorretos'
            ];
        }
    } catch(PDOException $e){
        echo $e->getMessage();
    }
}

if($_POST['operacao'] == 'view'){
    session_start();

    if (isset($_SESSION['NOME']) && isset($_SESSION['LOGIN']) && isset($_SESSION['ADM_ID'])) {
        $dados = [
            'type' => 'success',
            'NOME' => $_SESSION['NOME'],
            'LOGIN' => $_SESSION['LOGIN'],
            'ADM_ID' => $_SESSION['ADM_ID']
        ];
    } else {
        $dados = [
            'type' => 'error',
            'message' => 'Nenhum administrador logado'
        ];
    }
}

if($_POST['operacao'] == 'logout'){
    session_start();
    session_destroy();
    $dados = [
        'type' => 'success',
        'message' => 'Adeus'
    ];
}

echo json_encode($dados);

?>