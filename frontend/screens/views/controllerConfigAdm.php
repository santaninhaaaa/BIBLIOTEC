<?php
    session_start();

    // Verifica se a sessão está ativa e se o login foi realizado
    if(isset($_SESSION['NOME']) && isset($_SESSION['LOGIN'])) {
        $nome_usuario = $_SESSION['NOME'];
        $login_usuario = $_SESSION['LOGIN'];
    }
?>

<div class="row">
    <div class="col-md-4">
        <div class="container">
            <div class="card-body">
                <h2 class="text-dark text-center"><?php echo htmlspecialchars($nome_usuario);?></h2>
                <h3 class="text-dark text-center"><?php echo htmlspecialchars($login_usuario);?></h3>
                <button class="btn btn-warning btn-edit"><i class="fa-solid fa-pen-to-square"></i> Editar informações</button>
                <button class="btn btn-danger btn-delete"><i class="fa-solid fa-trash-can"></i> Deletar administrador</button>
            </div>
        </div>
    </div>
    <div class="col-md-8">
        <div class="container">
            <div class="card-body">
            <div class="table-responsive shadow bg-white rounded-4">
                    <table class="table">
                      <thead class="thead-dark">
                        <tr>

                            <h5 class="p-3 text-center bold">Atividades</h5>

                        </tr>
                      </thead>
                      <tbody id="table-anual">
                        <tr>
                            <th class="p-3">Empréstimos</td>
                            <td class="text-center">NUMERO</td>
                        </tr>
                        <tr>
                            <th class="p-3">Renovações</td>
                            <td class="text-center">NUMERO</td>
                        </tr>
                        <tr>
                            <th class="p-3">Devoluções</td>
                            <td class="text-center">NUMERO</td>
                        </tr>
                        <tr>
                            <th class="p-3">Cadastros de usuários</td>
                            <td class="text-center">NUMERO</td>
                        </tr>
                        <tr>
                            <th class="p-3">Cadastros de livros</td>
                            <td class="text-center">NUMERO</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

    <div id="modal-adm" class="modal fade" tabindex="-1" aria-labelledby="my-modal-title" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="my-modal-title">ADM TÍTULO</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="form-adm">
                
                    <div class="row g-3">
                        
                        <div class="mb-3 col-md-3 form-group">
                        <label>Nome</label>
                        <input type="text" name="nome" id="nome" class="form-control border border-secondary">
                        </div>
            
                        <div class="mb-3 col form-group">
                        <label>Login</label>
                        <input type="text" name="login" id="login" class="form-control border border-secondary">
                        </div>

                        <div class="mb-3 col form-group">
                        <label>Senha</label>
                        <input type="text" name="senha" id="senha" class="form-control border border-secondary">
                        </div>

                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-block btn-save">Salvar</button>
            </div>
            </div>
        </div>
    </div>

<script src="frontend/screens/controllers/controllerAdm.js"></script>