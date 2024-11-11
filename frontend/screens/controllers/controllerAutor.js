$(document).ready(function(){

    const url = 'backend/model/autorModel.php'

    //busca de alunos - filtragem
    const INPUT_BUSCA = document.getElementById('input-busca');
    const TABLE_AUTOR = document.getElementById('table-autor');

    INPUT_BUSCA.addEventListener('keyup', () => {
        let expressao = INPUT_BUSCA.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let linhas = TABLE_AUTOR.getElementsByTagName('tr');

        for (let posicao in linhas){
            if (true === isNaN(posicao)) {
                continue;
            }
            let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            if (true === conteudoDaLinha.includes(expressao)) {
                linhas[posicao].style.display = '';
            } else {
                linhas[posicao].style.display = 'none';
            }
        }
    })

    // criar funcionalidade pra abrir modal de novo registor
    $('.btn-new').click(function(e){
        e.preventDefault()
        //alterando o cabeçalho o modal
        $('.modal-title').empty().append('Cadastro de novo autor')
        //abrindo modal
        $('#modal-autor').modal('show')
        //inclui propriedade data no botão de salvar
        $('.btn-save').empty().append('Salvar').attr('data-operation', 'create').show()
        //removendo os dados que ficam "salvos" quando vc clicar pra criar
        $('input[type="number"]').attr('disabled', false)
        $('input[type="text"]').val('').attr('disabled', false)
    })


    //criando funcionalidade para preencher a tabela com as info do BD
    let dados = 'operacao=read'
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: url,
        success: function(dados){
            $('tbody').empty()
            for(const dado of dados){


                $('tbody').append(`
                    <tr>
                        <th class="text-center">${dado.ID}</td>
                        <td class="text-center">${dado.NOME}</td>
                        <td class="text-center">
                            <button id="${dado.ID}" class="btn btn-warning btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="${dado.ID}" class="btn btn-danger btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                    </tr>
                `)

            }


            //criando a funcionalidade pra editar os registro no BD
            $('.btn-edit').click(function(e){
                e.preventDefault()
                let dados = `ID=${$(this).attr('id')}&operacao=view`
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function(dados){
                        $('#id').val(dados[0].ID)
                        $('#nome').val(dados[0].NOME).attr('disabled', false)
                        $('.btn-save').empty().append('Alterar autor').attr('data-operation', 'update').show()
                        //alterando o cabeçalho o modal
                        $('.modal-title').empty().append('Edição do autor')
                        //abrindo modal
                        $('#modal-autor').modal('show')
                    }

                })
            })

            //criando a funcionalidade pra excluir os registro no BD
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
                        $('#main').empty().load('frontend/screens/views/controllerAutor.html')
                    }

                })
            })

        }
    })

    //criando a funcionalidade pra salvar novos registros no BD
    $('.btn-save').click(function(e){
        e.preventDefault()
        let dados = $('#form-autor').serialize()
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
                $('#modal-autor').modal('hide')
                $('#main').empty().load('frontend/screens/views/controllerAutor.html')
            }

        })
    })

})