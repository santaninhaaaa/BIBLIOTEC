$(document).ready(function(){

  //constante do arquivo
  const url = 'backend/model/emprestimoModel.php'

  //criar funcionalidade para a busca de emprestimos - filtragem
  const INPUT_BUSCA = document.getElementById('input-busca');
  const TABLE_EMPRESTIMO = document.getElementById('table-emprestimo');

  INPUT_BUSCA.addEventListener('keyup', () => {
    let expressao = INPUT_BUSCA.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    let linhas = TABLE_EMPRESTIMO.getElementsByTagName('tr');

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
    $('.modal-title').empty().append('Realizar empréstimo')
    //abrindo modal
    $('#modal-emprestimo').modal('show')
    //inclui propriedade data no botão de salvar
    $('.btn-save').empty().append('Salvar').attr('data-operation', 'create').show()
    //removendo os dados que ficam "salvos" quando vc clicar pra criar
    $('input[type="number"]').val('').attr('disabled', false)
    $('input[type="number"]').val('').attr('disabled', false)
    $('.user').empty()
    $('.livro').empty()
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
              <th class="text-center">${dado.ID_USER}</td>
              <td class="text-center">${dado.USERNAME}</td>
              <th class="text-center">${dado.ID_LIVRO}</th>
              <td class="text-center">${dado.BOOKNAME}</td>
              <td class="text-center">
                <button class="btn btn-info btn-view"><i class="fa-solid fa-eye"></i></button>
                <button class="btn btn-warning btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
              </td>
            </tr>
          `)

      }
    }
  })

  //criando funcionalidade para preencher o modal com as info do BD
  let dadosUser = 'operacao=read_user'
  $.ajax({
    type: 'POST',
    dataType: 'JSON',
    assync: true,
    data: dadosUser,
    url: url,
    success: function(dadosUser){

      $('.user').empty()

      const usuarios = {} //guarda os dados do user
      for(const dado of dadosUser){

        usuarios[dado.RA] = dado.NOME //guarda user com RA como uma chave

      }

      $('#ra').on('input', function() {
        const raDigitado = $(this).val() // Obtém o RA digitado
        const nomeUsuario = usuarios[raDigitado];// Busca o nome do usuário correspondente

        // Se houver um nome correspondente, exibe-o; senão, limpa o campo
        if (nomeUsuario) {
            $('.user').html(`<b>${nomeUsuario}</b>`)
        } else {
            $('.user').html(`<b>Usuário inexistente</b>`) // Limpa o nome se o RA não corresponder
        }
      })
    }
  })

  let dadosLivro = 'operacao=read_livro'
  $.ajax({
    type: 'POST',
    dataType: 'JSON',
    assync: true,
    data: dadosLivro,
    url: url,
    success: function(dadosLivro){

      $('.livro').empty()

      const livros = {} //guarda os dados do livro
      for(const dado of dadosLivro){

        livros[dado.TOMBO] = dado.NOME //guarda livro com tombo como uma chave

      }

      $('#tombo').on('input', function() {
        const tomboDigitado = $(this).val() // Obtém o RA digitado
        const nomeLivro = livros[tomboDigitado] // Busca o nome do usuário correspondente

        // Se houver um nome correspondente, exibe-o; senão, limpa o campo
        if (nomeLivro) {
            $('.livro').html(`<b>${nomeLivro}</b>`)
        } else {
            $('.livro').html(`<b>Livro inexistente</b>`) // Limpa o nome se o RA não corresponder
        }
      })

    }
  })


 //criando a funcionalidade pra salvar novos registros no BD
 $('.btn-save').click(function(e){
  e.preventDefault()
  let dados = $('#form-emprestimo').serialize()
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
          $('#modal-emprestimo').modal('hide')
          $('#main').empty().load('frontend/screens/views/controllerEmprestimo.html')
      }

    })
  })
})