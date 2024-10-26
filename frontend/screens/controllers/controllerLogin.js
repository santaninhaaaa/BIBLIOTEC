$(document).ready(function () {

    const url = 'backend/model/admModel.php'

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
                    $(location).attr('href', 'home.php')
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

        Swal.fire({
            title: 'Você tem certeza?',
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
    })
})