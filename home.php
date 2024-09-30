<?php
session_start();

// Verifica se a sessão está ativa e se o login foi realizado
if(isset($_SESSION['NOME'])) {
    $nome_usuario = $_SESSION['NOME'];
} else {
    // Se a sessão não existir, redireciona para a página de login
    header('location: index.html');
    exit();
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - BiblioTec</title>
    <!--CSS - ESTILOS-->
    <link rel="stylesheet" href="frontend/vendor/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="frontend/vendor/fontAwesome/css/all.css">
    <link rel="stylesheet" href="frontend/vendor/sweetAlert/dist/sweetalert2.css">

    <link rel="stylesheet" href="frontend/assets/css/style_home.css">
    <!--JS - SCRIPTS-->
    <script src="frontend/vendor/scripts/jquery-3.7.1.js" defer></script>
    <script src="frontend/vendor/bootstrap/js/bootstrap.bundle.js" defer></script>
    <script src="frontend/vendor/sweetAlert/dist/sweetalert2.all.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.js" defer></script>

    <script src="frontend/assets/js/home.js" defer></script>
    <script src="frontend/screens/controllers/controllerLogin.js" defer></script>
</head>
<body>

<!--SIDEBAR-->

<div class="container-fluid">
  <div class="row flex-nowrap">
    <div class="col-auto min-vh-100 bg-dark">
      <div class="pt-4 pb-1 px-2">
        <a href="" class="text-white text-decoration-none">
          <span class="fs-4 d-none d-sm-inline">BIBLIOTEC</span>
        </a>
      </div>
      <hr class="text-white"></hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="frontend/screens/views/controllerAluno.html" class="nav-link text-white">
            <i class="fa-solid fa-user m-1"></i>
            <span class="d-none d-sm-inline">Verificar Usuário</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="frontend/screens/views/controllerLivro.html" class="nav-link text-white">
            <i class="fa-solid fa-book m-1"></i>
            <span class="d-none d-sm-inline">Verificar Livro</span>
          </a>
        </li>
      </ul>
  
      <hr class="text-white"></hr>
  
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="frontend/screens/views/controllerEmprestimo.html" class="nav-link text-white">
            <i class="fa-solid fa-hand-holding m-1"></i>
            <span class="d-none d-sm-inline">Empréstimo</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="frontend/screens/views/controllerDevolucao.html" class="nav-link text-white">
            <i class="fa-solid fa-reply m-1"></i>
            <span class="d-none d-sm-inline">Devolução</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link text-white">
            <i class="fa-solid fa-receipt m-1"></i>
            <span class="d-none d-sm-inline">Relatório</span>
          </a>
        </li>
      </ul>
  
      <hr class="text-white"></hr>
  
      <div class="dropdown">
        <button class="btn btn-none dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-user m-1"></i> <?php echo htmlspecialchars($nome_usuario);?>
        </button>
        <ul class="dropdown-menu bg-dark-subtle text-center">
          <li><a class="dropdown-item nav-link" href="frontend/screens/views/controllerConfigAdm.php">Configurações</a></li>
          <li><a class="dropdown-item logout" href="#"><i class="fa-solid fa-arrow-right-from-bracket m-1"></i> Sair do Sistema</a></li>
        </ul>
      </div>
          
    </div>
    
    <!--TABELAS DE GERENCIAMENTO-->
    <div class="col">
      <div class="container" id="main">
        <div class="row mt-5">
          <div class="col-12">
            <h2 class="mt-5 text-center text-dark">Olá <?php echo htmlspecialchars($nome_usuario);?>!</h1>
            <h1 class="text-center text-dark">Bem vindo(a) ao Sistema Gerenciador da Biblioteca</h1>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<!--MODAIS-->

<div id="modal-container"></div>


</body>
</html>