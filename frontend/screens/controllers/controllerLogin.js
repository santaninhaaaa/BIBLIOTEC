$(document).ready(function () {

    const url = 'backend/model/admModel.php'

    // criar funcionalidade pra abrir modal de novo registor
    $('.btn-new').click(function(e){
        e.preventDefault()
        //alterando o cabeçalho o modal
        $('.modal-title').empty()
        //abrindo modal
        $('#modal-cadastro-adm').modal('show')
        //inclui propriedade data no botão de salvar
        $('.btn-save').empty().append('Cadastrar').attr('data-operation', 'create').show()
        //removendo os dados que ficam "salvos" quando vc clicar pra criar
        $('input[type="text"]').val('').attr('disabled', false)
        $('input[type="text"]').val('').attr('disabled', false)
        $('input[type="password"]').val('').attr('disabled', false)
    })
    //criando a funcionalidade pra salvar novos registros no BD
    $('.btn-save').click(function(e){
    e.preventDefault()
    let dados = $('#form-cadastro-adm').serialize()
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
            $('#modal-cadastro-adm').modal('hide')
            $('body').load('index.html')
            }

        })
    })


    $('.btn-login').click(function (e) {
        e.preventDefault()
        // alert('vontade de me matar hj as 16:37 horario de brasilia');
        let dados = $('#form-login').serialize()
        dados += `&operacao=login`
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: url,
            success: function (dados) {
                if (dados.type === 'success') {
                    $(location).attr('href', 'home.html')
                } else {
                    Swal.fire({
                        icon: dados.type,
                        title: 'BiblioTec',
                        text: dados.message
                    })
                }
            }
        })
    })

    $('.logout').click(function (e) {
        e.preventDefault()

        let dados = 'operacao=view'

        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: url,
            success: function (dados) {

                Swal.fire({
                    title: `${dados.NOME}, você tem certeza?`,
                    text: "Você será desconectado da sua sessão.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, quero sair',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
        
                        let dados = 'operacao=logout'
                        $.ajax({
                            type: 'POST',
                            dataType: 'JSON',
                            assync: true,
                            data: dados,
                            url: url,
                            success: function (dados) {
                                if (dados.type === 'success') {
                                    $(location).attr('href', 'index.html')
                                } else {
                                    Swal.fire({
                                        icon: dados.type,
                                        title: 'BiblioTec',
                                        text: dados.message
                                    })
                                }
                            }
                        })
                    }
                })

            }
        })

        
    })
    

})