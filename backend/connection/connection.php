<?php

$hostname = 'localhost';
$dbname = 'biblioteca';
$username = 'root';
$password = '';

try{
    $pdo = new PDO('mysql:host='.$hostname.';dbname='.$dbname, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // verifica e atualiza os atrasado
    $sql = "UPDATE EMPRESTIMO 
            SET ID_STATUS = 4 
            WHERE (ID_STATUS = 1 OR ID_STATUS = 2) AND PRAZO_DEVOLUCAO < CURDATE()";
    $pdo->query($sql);


    // //inicia phpmailer
    // $mail = new PHPMailer(true);
    // try {
    //     //Server settings
    //     $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    //     $mail->isSMTP();                                            //Send using SMTP
    //     $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
    //     $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    //     $mail->Username   = 'bibliotec.etec@gmail.com';                            //SMTP username
    //     $mail->Password   = 'gcnd pawc xxvp hxhj';                  //SMTP password
    //     $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption (ENCRYPTION_SMTPS)
    //     $mail->Port       = 587;                                    //TCP port to connect to; use 587 (465) if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    //     $mail->SMTPKeepAlive = true;

    //     //Recipients
    //     $mail->setFrom('bibliotec.etec@gmail.com', 'BiblioTec');


    //     // pega o email e o nome do livro do banco de dados
    //     while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    //         $userName = $row['USERNAME'];
    //         $userEmail = $row['USERMAIL'];
    //         $bookName = $row['BOOKNAME'];
        

    //         $mail->addAddress($userEmail, $userName);

    //         //Content
    //         $mail->CharSet = 'UTF-8'; 
    //         $mail->setLanguage('pt_br', '../PHPMailer/language'); 
    //         $mail->isHTML(true);                                        //Set email format to HTML
    //         $mail->Subject = 'Aviso de Empréstimo Atrasado';
    //         $mail->Body    = "Olá <strong>$userName</strong>! Nós da BiblioTec estamos avisando que você tem um empréstimo em atraso! <br>
    //                         O livro <strong>$bookName</strong> está com a devolução vencida. <br>
    //                         Por favor, efetue a devolução o quanto antes. <br><br>
    //                         Atenciosamente, <br>
    //                         <strong>BiblioTec</strong><br>
    //                         Tel: (XX) XXXX-XXXX<br>
    //                         Email: bibliotec.etec@gmail.com";

    //         $mail->send();
    //         $mail->clearAddresses();

    //     }
    //     $mail->smtpClose();

    // } catch (Exception $e) {
    //     echo "Mensagem não pôde ser enviada! Mailer Error: {$mail->ErrorInfo}";
    // }


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