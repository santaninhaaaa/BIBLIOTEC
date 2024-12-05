$(document).ready(function () {

    const url = 'backend/model/admModel.php'

    //busca de alunos - filtragem
    $(document).on('keyup', '#input-busca', function () {
        const expressao = $(this).val().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        const linhas = $('#atrasado tr')

        linhas.each(function () {
            const conteudoDaLinha = $(this).text().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            if (conteudoDaLinha.includes(expressao)) {
                $(this).show()
            } else {
                $(this).hide()
            }
        })
    })
    
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

                                        <thead class="thead-dark sticky-top">

                                            <tr>
                                                <th colspan="4" class="p-0 text-center bold">
                                                    <h5 class="m-0 mt-3">Status do Dia</h5>
                                                </th>
                                            </tr>

                                            <tr>
                                                <th colspan="4" class="m-0">
                                                    <input type="text" id="input-busca" class="form-control mt-3" placeholder="O que procura?" autocomplete="off">
                                                </th>
                                            </tr>
                                            <tr>
                                            <th scope="col" class="text-center">Nome</th>
                                            <th scope="col" class="text-center">Informações</th>
                                            <th scope="col" class="text-center">Livro</th>
                                            <th scope="col" class="text-center">Data da retirada</th>
                                            </tr>

                                        </thead>
                                        <tbody id="atrasado">
                                            <tr>
                                                <td class="text-center"><b>(RA)</b> Nome user</td>
                                                <td class="text-center">Curso - Email - Telefone</td>
                                                <td class="text-center"><b>(TOMBO)</b> Nome Livro - Autor</td>
                                            </tr>
                                        </tbody>

                                        <tfoot class="sticky-bottom">
                                            <tr>
                                                <td colspan="4"><button class="btn btn-primary w-100 btn-send">Enviar email</button></td>
                                            </tr>
                                        </tfoot>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            `)

            let dado = 'operacao=check'
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                assync: true,
                data: dado,
                url: url,
                success: function(dad){
        
                    $('tbody').empty()
        
                    for(const dado of dad){
            
                        $('tbody').append(`
                            <tr>
                                <td class="text-center"><b>(${dado.ID_USER})</b> ${dado.USERNAME}</td>
                                <td class="text-center">${dado.USERMAIL} - ${dado.USERTEL}</td>
                                <td class="text-center"><b>(${dado.ID_LIVRO})</b> ${dado.BOOKNAME} - ${dado.AUTORNAME}</td>
                                <td class="text-center">${dado.DATA_RETIRADA}</td>
                            </tr>
                        `)
        
                    }
        
                }
            })

            //criando a funcionalidade pra enviar email no BD
            $('.btn-send').click(function(e){
                e.preventDefault()
                $('#loading-modal').modal('show')

                let dados = 'operacao=send'
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function(dados){
                        $('#loading-modal').modal('hide')

                        Swal.fire({
                            icon: dados.type,
                            title: 'BiblioTec',
                            text: dados.message
                        })
                        setTimeout(function () {
                            window.location.reload()
                        }, 2000)
                    }

                })
            })

        }
        
    })

})