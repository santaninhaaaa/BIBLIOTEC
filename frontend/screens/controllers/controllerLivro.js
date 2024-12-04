$(document).ready(function(){

    //constante do arquivo
    const url = 'backend/model/livroModel.php'
    popularSelect()

    //criar funcionalidade para a busca de livros - filtragem
    const INPUT_BUSCA = document.getElementById('input-busca');
    const TABLE_LIVRO = document.getElementById('table-livro');

    INPUT_BUSCA.addEventListener('keyup', () => {
        let expressao = INPUT_BUSCA.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let linhas = TABLE_LIVRO.getElementsByTagName('tr');

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

    //populando o select de autores
    function popularSelect(){
    
        let dadosAutor = 'operacao=read_autor'
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dadosAutor,
            url: url,
            success: function(dadosAutor){
        
                $('.autor').empty()
                $('.autor').append('<option></option>') 
        
                for(const dado of dadosAutor){
        
                    $('.autor').append(`
                        <option value="${dado.ID}">${dado.NOME}</option>
                    `)
        
                }
                
                $('.autor').select2({
                    theme: "bootstrap4",
                    language: { noResults: function(){ return "Não encontrado"; }},
                    placeholder: "Selecione o autor",
                    allowClear: true,
                    dropdownParent: $('#modal-livro')
                })
                
            }
        })

    }

    //criar funcionalidade para adicionar ou remover inputs quando cadastrar VÁRIOS livros de uma vez
    $('.btn-new-input').click(function(e){
        e.preventDefault()

        const currentInputs = $('#show-item .input-group-wrapper').length

        if(currentInputs < 2){

            $('#show-item').append(`

                <div class="input-group-wrapper">
    
                    <hr/>
    
                    <div class="row">
    
                        <div class="mt-4 mb-3 col-md-3 form-group">
                            <label>Tombo</label>
                            <input type="number" autocomplete="off" name="tombo[]" id="tombo" class="form-control border">
                        </div>
                
                        <div class="mt-4 mb-3 col-md-6 form-group">
                            <label>Nome</label>
                            <input type="text" autocomplete="off" name="nome[]" id="nome" class="form-control border">
                        </div>     
    
                    </div>
                    
                    <div class="row">
    
                        <div class="mb-3 col-md-9 form-group">
                            <label>Autor</label>
                            <select name="autor[]" id="autor" class="form-select border autor">
    
                            </select>
                        </div>
    
                        <div class="mb-3 col form-group mt-4">
                                <button class="btn btn-danger btn-delete-input"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
        
                    </div>
    
                </div>
             
            `)

            $('#warning-message').text('')
            popularSelect()

        } else {
            $('#warning-message').text(`Você não pode adicionar mais!`)
        }


        $('.btn-delete-input').click(function(e){
            e.preventDefault()
    
            $(this).closest('.input-group-wrapper').remove()
        })

    })

    //criar funcionalidade pra abrir modal de novo registor
    $('.btn-new').click(function(e){
        e.preventDefault()
        //alterando o cabeçalho o modal
        $('.modal-title').empty().append('Cadastro de novo livro')
        //abrindo modal
        $('#modal-livro').modal('show')
        //inclui propriedade data no botão de salvar
        $('.btn-save').empty().append('Salvar').attr('data-operation', 'create').show()
        $('.btn-new-input').show()
        //removendo os dados que ficam "salvos" quando vc clicar pra criar
        $('input[type="number"]').val('').attr('disabled', false)
        $('input[type="text"]').val('').attr('disabled', false)
        $('select').val('').attr('disabled', false)
        $('input[type="number"]').val('')
        $('#show-item').empty()
        $('#warning-message').empty()
        $('#admin-name').empty()
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
                        <th class="text-center">${dado.TOMBO}</th>
                        <td class="text-center">${dado.NOME}</td>
                        <td class="text-center">${dado.AUTORNAME}</td>
                        <td class="text-center">
                            <button id="${dado.TOMBO}" class="btn btn-info btn-view"><i class="fa-solid fa-eye"></i></button>
                            <button id="${dado.TOMBO}" class="btn btn-warning btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="${dado.TOMBO}" class="btn btn-danger btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                    </tr>
                `)

            }

            //criando a funcionalidade pra visualisar os registro no BD
            $('.btn-view').click(function(e){
                e.preventDefault()
                let dados = `TOMBO=${$(this).attr('id')}&operacao=view`
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function(dados){
                        $('#tombo').val(dados[0].TOMBO).attr('disabled', true)
                        $('#nome').val(dados[0].NOME).attr('disabled', true)
                        $('#autor').val(dados[0].ID_AUTOR).trigger('change').attr('disabled', true)
                        $('#adm_id').val(dados[0].ID_ADM)
                        $('#show-item').empty()
                        $('#warning-message').empty()
                        $('.btn-save').hide()
                        $('.btn-new-input').hide()
                        //alterando o cabeçalho o modal
                        $('.modal-title').empty().append('Visualização do livro')
                        $('#admin-name').html(`Cadastro criado por: <b>${dados[0].ADMNAME}</b>`)
                        //abrindo modal
                        $('#modal-livro').modal('show')
                    }

                })
            })

            //criando a funcionalidade pra editar os registro no BD
            $('.btn-edit').click(function(e){
                e.preventDefault()
                let dados = `TOMBO=${$(this).attr('id')}&operacao=view`
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function(dados){
                        $('#tombo').val(dados[0].TOMBO).attr('disabled', false)
                        $('#nome').val(dados[0].NOME).attr('disabled', false)
                        $('#autor').val(dados[0].ID_AUTOR).trigger('change').attr('disabled', false)
                        $('.btn-save').empty().append('Alterar cadastro').attr('data-operation', 'update').show()
                        $('#show-item').empty()
                        $('#warning-message').empty()
                        $('#admin-name').empty()
                        $('.btn-new-input').hide()
                        //alterando o cabeçalho o modal
                        $('.modal-title').empty().append('Edição do livro')
                        //abrindo modal
                        $('#modal-livro').modal('show')
                    }

                })
            })

            //criando a funcionalidade pra excluir os registro no BD
            $('.btn-delete').click(function(e){
                e.preventDefault()
                let dados = `tombo=${$(this).attr('id')}&operacao=delete`
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
                        $('#main').empty().load('frontend/screens/views/controllerLivro.html')
                    }

                })
            })

        }
    })

    //criando a funcionalidade pra salvar novos registros no BD
    $('.btn-save').click(function(e){
        e.preventDefault()

        let dados = $('#form-livro').serialize()
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
                $('#modal-livro').modal('hide')
                $('#main').empty().load('frontend/screens/views/controllerLivro.html')
            }

        })
    })

})