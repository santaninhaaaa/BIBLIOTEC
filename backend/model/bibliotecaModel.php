<?php

include ('../connection/conexao.php');

date_default_timezone_set('America/Sao_Paulo');
$dataAtual = date('Y-m-d H:i:s', time()); //setei o horario e dia padrão, ent estrá já automatico a data


//request mesma função do post e get, mas ele ouve os dois
if($_REQUEST['operacao'] == 'create'){

    if(empty($_REQUEST['titulo']) || 
       empty($_REQUEST['resumo']) || 
       empty($_REQUEST['corpo'])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos obrigatórios vazios.'
        ];
    }else{

        try{
            $sql = "INSERT INTO NOTICIA (TITULO, RESUMO, CORPO, DATA) VALUES (?,?,?,?)";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_REQUEST['titulo'],
                $_REQUEST['resumo'],
                $_REQUEST['corpo'],
                $dataAtual
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Registro salvo com sucesso'
            ];
        }catch(PDOException $e){
            $dados = [
                'type' => 'error',
                'message' => 'Erro: ' . $e -> getMessage()
            ];
        }

    }
}


if($_REQUEST['operacao'] == 'read'){}
if($_REQUEST['operacao'] == 'update'){}
if($_REQUEST['operacao'] == 'delete'){} 


echo json_encode($dados);

























?>