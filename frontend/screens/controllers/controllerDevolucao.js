$(document).ready(function(){

    //constante do arquivo
    const url = 'backend/model/emprestimoModel.php'
  

    $('.btn-search').click(function(e){
        e.preventDefault()
        
        const valor = $('#id_user').val().trim()//pega o valor do input

        if (valor === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vazio!',
                text: 'Por favor, insira o ID do usuário.',
            })
        }

        //criando funcionalidade para verificar se o id ja fez emprestimo
        let dados = {operacao: 'verify', id_user: valor}
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: url,
            success: function(dados){

                $('#tabela-devolucao').empty()
                $('.table-devolucao').removeClass('d-none')

                dados.forEach(dado => {
                    $('#titulo-devolucao').text(`Livros com ${dado.USERNAME}:`)

                    $('#tabela-devolucao').append(`

                        <tr>
                            <th class="text-center">${dado.STATNAME}</th>
                            <td class="text-center"><b>(${dado.ID_LIVRO})</b> ${dado.BOOKNAME} - ${dado.AUTORNAME}</td>
                            <td class="text-center">${dado.DATA_RETIRADA}</td>
                            <td class="text-center">
                                <button id=${dado.ID} class="btn btn-warning btn-renew"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                                <button id=${dado.ID} class="btn btn-success btn-delete"><i class="fa-solid fa-check"></i></button>
                            </td>
                        </tr>
                        
                    `)
                })

                //criando a funcionalidade pra renovar os registro no BD
                $('.btn-renew').click(function(e){
                    e.preventDefault()
                    let dados = `ID=${$(this).attr('id')}&operacao=renovacao`
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
                            $('#main').empty().load('frontend/screens/views/controllerDevolucao.html')
                        }

                    })
                })

                //criando a funcionalidade pra renovar os registro no BD
                $('.btn-delete').click(function(e){
                    e.preventDefault()
                    let dados = `ID=${$(this).attr('id')}&operacao=devolucao`
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
                            $('#main').empty().load('frontend/screens/views/controllerDevolucao.html')
                        }

                    })
                })

            }
        })


    })

})