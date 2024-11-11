$(document).ready(function () {

    const url = 'backend/model/admModel.php'
 
    //criando funcionalidade para pegar informações da sessao
    let dados = 'operacao=view'
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: url,
        success: function(dados){
            $('.adm-button').empty()
            $('#main').empty()
            
                $('.adm-button').html(`
                    <i class="fa-solid fa-user m-1"></i> ${dados.NOME}
                `)

                $('#main').html(`
                    <div class="row mt-5">
                        <div class="col-12">
                            <h2 class="mt-5 text-center text-dark">Olá ${dados.NOME}</h1>
                            <h1 class="text-center text-dark">Bem vindo(a) ao Sistema Gerenciador da Biblioteca</h1>
                        </div>
                    </div>

                    <!--TABELA DE STAUTS DOS LIVROS-->

                    <div class="row mt-5">

                        <div class="col-md-12">
                            <div class="container">
                                <div class="card-body">
                                    <div class="table-responsive shadow bg-white rounded-4">
                                        <table class="table">

                                            <thead class="thead-dark">
                                                <tr>
                                                    <h5 class="p-3 text-center bold">Status do Dia - DIA</h5>

                                                </tr>
                                            </thead>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                `)

        }
    })
})