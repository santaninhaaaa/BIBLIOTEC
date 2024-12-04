$(document).ready(function(){

    //constante do arquivo
    const url = 'backend/model/relatorioModel.php'
  
        //criando funcionalidade para ler o banco
        let dados = 'operacao=count_all'
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: url,
            success: function(dados){

                $('#table-diaria').empty()

                $('#table-diaria').html(`
                        <tr>
                            <th class="p-3">Empréstimos</td>
                            <td class="text-center">${dados.TOTAL_EMPRESTIMO_HJ}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Devoluções</td>
                            <td class="text-center">${dados.TOTAL_DEVOLUCAO_HJ}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Cadastros de usuários</td>
                            <td class="text-center">${dados.TOTAL_USER_HJ}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Cadastros de livros</td>
                            <td class="text-center">${dados.TOTAL_LIVRO_HJ}</td>
                        </tr>
                `)


                $('#table-mensal').empty()

                $('#table-mensal').html(`
                        <tr>
                            <th class="p-3">Empréstimos</td>
                            <td class="text-center">${dados.TOTAL_EMPRESTIMO_MES}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Devoluções</td>
                            <td class="text-center">${dados.TOTAL_DEVOLUCAO_MES}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Cadastros de usuários</td>
                            <td class="text-center">${dados.TOTAL_USER_MES}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Cadastros de livros</td>
                            <td class="text-center">${dados.TOTAL_LIVRO_MES}</td>
                        </tr>
                `)


                
                $('#table-anual').empty()

                $('#table-anual').html(`
                        <tr>
                            <th class="p-3">Empréstimos</td>
                            <td class="text-center">${dados.TOTAL_EMPRESTIMO_ANO}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Devoluções</td>
                            <td class="text-center">${dados.TOTAL_DEVOLUCAO_ANO}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Cadastros de usuários</td>
                            <td class="text-center">${dados.TOTAL_USER_ANO}</td>
                        </tr>
                        <tr>
                            <th class="p-3">Cadastros de livros</td>
                            <td class="text-center">${dados.TOTAL_LIVRO_ANO}</td>
                        </tr>
                `)

            }
        })


})