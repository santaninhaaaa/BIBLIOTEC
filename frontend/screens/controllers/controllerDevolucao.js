$(document).ready(function(){

    //constante do arquivo
    const url = 'backend/model/emprestimoModel.php'

    $('.btn-search').click(function() {
        const ra = $('#ra').val()

        let dados = {
            operacao: 'read',
            ID_USER: ra
        }
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: url,
            success: function(response){
                $('.table-devolucao').removeClass('d-none')
                $('tbody').empty()
                $('#titulo-devolucao').empty()
                $('#titulo-devolucao').html(`Livros que <b>${response[0].USERNAME}</b> está`)
                for(const dado of response){
        
                    $('tbody').append(`
                        <tr>
                            <td class="text-center">situacao</td>
                            <td class="text-center">${dado.ID_LIVRO}</td>
                            <td class="text-center">${dado.BOOKNAME}</td>
                            <td class="text-center">data devolucao</td>
                            <td class="text-center">
                                <button class="btn btn-success btn-renew"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                                <button class="btn btn-danger btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                            </td>
                        </tr>
                    `)
        
                }
            }
        })

    })

})