<?php

include ('../connection/connection.php');

date_default_timezone_set('America/Sao_Paulo');
$dataAtual = date('Y-m-d', time()); //setei o horario e dia padrão, ent estrá já automatico a data
$prazoDevol = date('Y-m-d', strtotime($dataAtual . ' + 7 days')); //defini prazo fixo de 7 dias

if($_POST['operacao'] == 'create'){
    session_start();

    if(empty($_POST['id_user']) || 
       empty($_POST['id_livro']) ||
       empty($_SESSION['ADM_ID'])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos obrigatórios vazios.'
        ];
    }else{

        try{
            
            //verificar se o usuario ja tem 3 emprestimos
            $sql_count = "SELECT COUNT(*) AS TOTAL FROM EMPRESTIMO WHERE ID_USER = ? AND ID_STATUS = 1";
            $stmt_count = $pdo->prepare($sql_count); 
            $stmt_count -> execute([
                $_POST['id_user']
            ]);
            $emprestimo_qtd = $stmt_count->fetch(PDO::FETCH_ASSOC);

            if($emprestimo_qtd['TOTAL'] >= 3){
                $dados = [
                    'type' => 'error',
                    'message' => 'Este usuário já realizou 3 empréstimos'
                ];
            }else{
                //verificar se o livro já está emprestado
                $sql_check = "SELECT * FROM EMPRESTIMO WHERE ID_LIVRO = ? AND ID_STATUS = 1";
                $stmt_check = $pdo->prepare($sql_check);
                $stmt_check -> execute([
                    $_POST['id_livro']
                ]);
                $livro_emprestado = $stmt_check->fetch(PDO::FETCH_ASSOC);

                if ($livro_emprestado) {
                    // Se o livro já está emprestado
                    $dados = [
                        'type' => 'error',
                        'message' => 'Este livro já está emprestado.'
                    ];

                } else {
                    $sql = "INSERT INTO EMPRESTIMO (ID_USER, ID_LIVRO, ID_ADM, HIST_ID_ADM, DATA_RETIRADA, PRAZO_DEVOLUCAO, ID_STATUS) VALUES (?,?,?,?,?,?,1)";
                    $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
                    $stmt -> execute([ //executa sql
                        $_POST['id_user'],
                        $_POST['id_livro'],
                        $_SESSION['ADM_ID'],
                        $_SESSION['ADM_ID'],
                        $dataAtual,
                        $prazoDevol
                    ]);
                    $dados = [
                        'type' => 'success',
                        'message' => 'Empréstimo feito com sucesso!'
                    ];
                
                }

            }

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

        $sql = "SELECT EMPRESTIMO.*,
                USUARIO.NOME AS USERNAME,
                LIVRO.NOME AS BOOKNAME,
                AUTOR.NOME AS AUTORNAME FROM EMPRESTIMO 
                JOIN USUARIO ON ID_USER = USUARIO.RA
                JOIN LIVRO ON ID_LIVRO = LIVRO.TOMBO
                JOIN AUTOR ON ID_AUTOR = AUTOR.ID
                WHERE (ID_STATUS = 1 OR ID_STATUS = 2 OR ID_STATUS = 4)";
                  
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

if($_POST['operacao'] == 'read_user'){
    try{

        $sql= "SELECT RA, NOME FROM USUARIO";
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

if($_POST['operacao'] == 'read_livro'){
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

if($_POST['operacao'] == 'renovacao'){

    try{
        $sql = "UPDATE EMPRESTIMO SET PRAZO_DEVOLUCAO = ?, ID_STATUS = 2 WHERE (ID_STATUS = 1 OR ID_STATUS = 2) AND ID = ?";
        $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
        $stmt -> execute([ //executa sql
            $prazoDevol,
            $_POST['ID']
        ]);
        $dados = [
            'type' => 'success',
            'message' => 'Livro renovado com sucesso!'
        ];
    }catch(PDOException $e){
        $dados = [
            'type' => 'error',
            'message' => 'Erro: ' . $e -> getMessage()
        ];
    }

}

if($_POST['operacao'] == 'devolucao'){
    session_start();

    try{
        $sql = "UPDATE EMPRESTIMO SET DATA_DEVOLUCAO = ?, ID_STATUS = 3, HIST_ID_ADM = ? WHERE DATA_DEVOLUCAO IS NULL AND ID = ?";
        $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
        $stmt -> execute([ //executa sql
            $dataAtual,
            $_SESSION['ADM_ID'],
            $_POST['ID']
        ]);

        if($stmt->rowCount() > 0){
            $dados = [
                'type' => 'success',
                'message' => 'Livro devolvido com sucesso!'
            ];
        }
    }catch(PDOException $e){
        $dados = [
            'type' => 'error',
            'message' => 'Erro: ' . $e -> getMessage()
        ];
    }

}

if($_POST['operacao'] == 'delete'){

    if(empty($_POST['id'])){

        $dados = [
            'type' => 'error',
            'message' => 'ID do empréstimo não reconhecido ou inexistente'
        ];
    }else{

        try{
            $sql = "DELETE FROM EMPRESTIMO WHERE ID = ?";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['id']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Empréstimo deletado com sucesso'
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

        $sql = "SELECT EMPRESTIMO.*, 
                ADM.NOME AS ADMNAME,
                USUARIO.NOME AS USERNAME,
                LIVRO.NOME AS BOOKNAME,
                AUTOR.NOME AS AUTORNAME FROM EMPRESTIMO 
                JOIN ADM ON EMPRESTIMO.ID_ADM = ADM.ID
                JOIN USUARIO ON EMPRESTIMO.ID_USER = USUARIO.RA
                JOIN LIVRO ON EMPRESTIMO.ID_LIVRO = LIVRO.TOMBO
                JOIN AUTOR ON LIVRO.ID_AUTOR = AUTOR.ID
                WHERE EMPRESTIMO.ID = ".$_POST['ID']."";
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

if($_POST['operacao'] == 'verify'){
    try{

        $sql = "SELECT EMPRESTIMO.*,
                USUARIO.NOME AS USERNAME,
                LIVRO.NOME AS BOOKNAME,
                AUTOR.NOME AS AUTORNAME,
                STATUS.NOME AS STATNAME FROM EMPRESTIMO 
                JOIN USUARIO ON ID_USER = USUARIO.RA
                JOIN LIVRO ON ID_LIVRO = LIVRO.TOMBO
                JOIN AUTOR ON ID_AUTOR = AUTOR.ID
                JOIN STATUS ON ID_STATUS = STATUS.ID
                WHERE (ID_STATUS = 1 OR ID_STATUS = 2 OR ID_STATUS = 4) AND ID_USER = '" . $_POST['id_user'] . "'";
        $resultado = $pdo->query($sql); //recebe a query dos valores do banco
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){ //while pra varrer o banco linha por linha usando o FETCH e o row vai ler linha por linha do banco

            $row['PRAZO_DEVOLUCAO'] = date('d/m/Y', strtotime($row['PRAZO_DEVOLUCAO']));
            $dados[] = $row; //array pra mapear os dados
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