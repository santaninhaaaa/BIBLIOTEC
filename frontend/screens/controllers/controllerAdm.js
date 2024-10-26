$(document).ready(function(){

    //constante do arquivo
    const url = 'backend/model/admModel.php'


    //criando a funcionalidade pra salvar novos registros no BD
    $('.btn-save').click(function(e){
        e.preventDefault()
        //inclui propriedade data no botão de salvar
        $('.btn-save').empty().append('Salvar').attr('data-operation', 'create').show()
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
                window.location.href = 'index.html'
            }

        })
    })

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
                $('#nome').val(dados[0].RA).attr('disabled', false)
                $('#login').val(dados[0].NOME).attr('disabled', false)
                $('#senha').val(dados[0].SERIE).attr('disabled', false)
                $('#id').val(dados[0].ID)
                $('.btn-save').empty().append('Alterar informações').attr('data-operation', 'update').show()
                //alterando o cabeçalho o modal
                $('.modal-title').empty().append('Edição do administrador')
                //abrindo modal
                $('#modal-adm').modal('show')
            }

        })
    })

    $('.btn-delete').click(function (e) {
        e.preventDefault()

        let dados = `id=${$(this).attr('id')}&operacao=delete`

        Swal.fire({
            title: 'Deletar a conta?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Deletar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function (dados) {
                        Swal.fire({
                            icon: dados.type,
                            title: 'BiblioTec',
                            text: dados.message
                        })
                        
                        if (dados.type === 'success'){ window.location.href = 'index.html'}
                    }
                })
            }
        })
    })

})