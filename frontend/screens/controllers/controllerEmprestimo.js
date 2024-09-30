$(document).ready(function(){

    //constante do arquivo
    const url = 'backend/model/emprestimoModel.php'

  // criar funcionalidade pra abrir modal de novo registor
    $('.btn-new').click(function(e){
        e.preventDefault()
        //alterando o cabeçalho o modal
        $('.modal-title').empty().append('Realizar empréstimo')
        //abrindo modal
        $('#modal-emprestimo').modal('show')
        //inclui propriedade data no botão de salvar
        $('.btn-save').empty().append('Salvar').attr('data-operation', 'create').show()
        //removendo os dados que ficam "salvos" quando vc clicar pra criar
        $('input[type="number"]').val('').attr('disabled', false)
        $('input[type="number"]').val('').attr('disabled', false)
    })
})