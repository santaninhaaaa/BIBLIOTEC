$(document).ready(function(){

  //constante do arquivo
  const url = 'backend/model/alunoModel.php'

  // criar funcionalidade pra abrir modal de novo registor
  $('.btn-new').click(function(e){
      e.preventDefault()
      //alterando o cabeçalho o modal
      $('.modal-title').empty().append('Cadastro de novo aluno')
      //abrindo modal
      $('#modal-aluno').modal('show')
      //inclui propriedade data no botão de salvar
      $('.btn-save').empty().append('Salvar').attr('data-operation', 'create').show()
      //removendo os dados que ficam "salvos" quando vc clicar pra criar
      $('input[type="number"]').val('').attr('disabled', false)
      $('input[type="text"]').val('').attr('disabled', false)
      $('input[type="text"]').val('').attr('disabled', false)
      $('input[type="email"]').val('').attr('disabled', false)
      $('input[type="number"]').val('').attr('disabled', false)
      $('input[type="number"]').val('').attr('disabled', false)
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
                      <td class="text-center">${dado.RA}</td>
                      <td class="text-center">${dado.NOME}</td>
                      <td class="text-center">${dado.SERIE}</td>
                      <td class="text-center">${dado.EMAIL}</td>
                      <td class="text-center">${dado.TELEFONE}</td>
                      <td class="text-center">${dado.ADM_ID}</td>
                      <td class="text-center">
                          <button id="${dado.RA}" class="btn btn-info btn-view"><i class="fa-solid fa-eye"></i></button>
                          <button id="${dado.RA}" class="btn btn-warning btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                          <button id="${dado.RA}" class="btn btn-danger btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                      </td>
                  </tr>
              `)

          }

          //criando a funcionalidade pra visualisar os registro no BD
          $('.btn-view').click(function(e){
              e.preventDefault()
              let dados = `RA=${$(this).attr('ra')}&operacao=view`
              $.ajax({
                  type: 'POST',
                  dataType: 'JSON',
                  assync: true,
                  data: dados,
                  url: url,
                  success: function(dados){
                      $('#ra').val(dados[0].RA).attr('disabled', true)
                      $('#nome').val(dados[0].NOME).attr('disabled', true)
                      $('#serie').val(dados[0].SERIE).attr('disabled', true)
                      $('#email').val(dados[0].EMAIL).attr('disabled', true)
                      $('#telefone').val(dados[0].TELEFONE).attr('disabled', true)
                      $('#adm_id').val(dados[0].ADM_ID).attr('disabled', true)
                      $('.btn-save').hide()
                      //alterando o cabeçalho o modal
                      $('.modal-title').empty().append('Visualização do aluno')
                      //abrindo modal
                      $('#modal-aluno').modal('show')
                  }

              })
          })

          //criando a funcionalidade pra editar os registro no BD
          $('.btn-edit').click(function(e){
              e.preventDefault()
              let dados = `RA=${$(this).attr('ra')}&operacao=view`
              $.ajax({
                  type: 'POST',
                  dataType: 'JSON',
                  assync: true,
                  data: dados,
                  url: url,
                  success: function(dados){
                    $('#ra').val(dados[0].RA).attr('disabled', false)
                    $('#nome').val(dados[0].NOME).attr('disabled', false)
                    $('#serie').val(dados[0].SERIE).attr('disabled', false)
                    $('#email').val(dados[0].EMAIL).attr('disabled', false)
                    $('#telefone').val(dados[0].TELEFONE).attr('disabled', false)
                    $('#adm_id').val(dados[0].ADM_ID).attr('disabled', false)
                      $('.btn-save').empty().append('Alterar cadastro').attr('data-operation', 'update').show()
                      //alterando o cabeçalho o modal
                      $('.modal-title').empty().append('Edição do aluno')
                      //abrindo modal
                      $('#modal-aluno').modal('show')
                  }

              })
          })

          //criando a funcionalidade pra excluir os registro no BD
          $('.btn-delete').click(function(e){
              e.preventDefault()
              let dados = `ra=${$(this).attr('ra')}&operacao=delete`
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
                      $('#main').empty().load('frontend/screens/views/controllerAluno.html')
                  }

              })
          })

      }
  })

  //criando a funcionalidade pra salvar novos registros no BD
  $('.btn-save').click(function(e){
      e.preventDefault()
      let dados = $('#form-aluno').serialize()
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
              $('#modal-aluno').modal('hide')
              location.reload('frontend/screens/views/controllerAluno.html')
          }

      })
  })




})