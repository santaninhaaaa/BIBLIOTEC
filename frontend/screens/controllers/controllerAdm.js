$(document).ready(function(){

    //constante do arquivo
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
            $('.adm-info').empty()

            $('.adm-info').html(`

                <h2 class="text-dark text-center">${dados.NOME}</h2>
                <h3 class="text-dark text-center">${dados.LOGIN}</h3>
                <button id="${dados.ADM_ID}" class="btn btn-warning btn-edit"><i class="fa-solid fa-pen-to-square"></i> Editar informações</button>
                <button id="${dados.ADM_ID}" class="btn btn-danger btn-delete"><i class="fa-solid fa-trash-can"></i> Deletar administrador</button>

            `)


            $('.btn-edit').click(function(e){
                e.preventDefault()
                let dados = 'operacao=view'
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function(dados){

                        let admID = dados.ADM_ID
                        let dado = `ADM_ID=${admID}&operacao=view`

                        $.ajax({
                            type: 'POST',
                            dataType: 'JSON',
                            assync: true,
                            data: dado,
                            url: url,
                            success: function(dado){

                                $('#nome').val(dado.NOME).attr('disabled', false)
                                $('#login').val(dado.LOGIN).attr('disabled', false)
                                $('#senha').val(dado.SENHA).attr('disabled', false)
                                $('.btn-save').empty().append('Alterar informações').attr('data-operation', 'update').show()
                                //alterando o cabeçalho o modal
                                $('.modal-title').empty().append('Edição do administrador')
                                //abrindo modal
                                $('#modal-adm').modal('show')
                            }
                        })
                    }

                })
            })

            $('.btn-delete').click(function(e){
                e.preventDefault()
                let dados = `id=${$(this).attr('id')}&operacao=delete`
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function(dados){
                        Swal.fire({
                            icon: dados.type,
                            title: 'BiblioTec',
                            text: dados.message
                        })
                        window.loacate('index.html')
                    }

                })
            })

            let dado = 'operacao=count_all'

            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                assync: true,
                data: dado,
                url: url,
                success: function(dado){
            
                    $('#table-adm').empty()
                    $('#table-adm').html(`

                        <tr>
                            <th class="p-3">Empréstimos</td>
                            <td class="text-center">${dado.TOTAL_EMPRESTIMO}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Devoluções</td>
                            <td class="text-center">${dado.TOTAL_DEVOLUCAO}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Cadastros de usuários</td>
                            <td class="text-center">${dado.TOTAL_USER}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Cadastros de livros</td>
                            <td class="text-center">${dado.TOTAL_LIVRO}</td>
                        </tr>

                    `)
                }
            })


        }
    })

        //criando a funcionalidade pra salvar novos registros no BD
    $('.btn-save').click(function(e){
        e.preventDefault()
        let dados = $('#form-adm').serialize()
        dados += `&operacao=${$(this).attr('data-operation')}`
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: url,
            success: function(dados){
                Swal.fire({
                    icon: dados.type,
                    title: 'BiblioTec',
                    text: dados.message
                })
                $('#modal-adm').modal('hide')
                $('#main').empty().load('frontend/screens/views/controllerConfigAdm.html')
            }

        })
    })

})