$(document).ready(function () {
  //constante do arquivo
  const url = "backend/model/alunoModel.php";

  // criar funcionalidade pra abrir modal de novo registor
  $(".btn-new-User").click(function (e) {
    e.preventDefault();
    //abrindo modal
    $("#modal-container").load('frontend/screens/views/controllerAluno.html', function(){
      $('#modal-aluno').modal('show');
      //alterando o cabeçalho o modal
      $(".modal-title").empty().append("Cadastro de novo usuário");
      //inclui propriedade data no botão de salvar
      $(".btn-save").attr("data-operation", "create");
    });
  });

  //criando funcionalidade para preencher a tabela com as info do BD
  let dados = "operacao=read";
  $.ajax({
    type: "POST",
    dataType: "JSON",
    assync: true,
    data: dados,
    url: url,
    success: function (dados) {
      $("tbody").empty();
      for (const dado of dados) {
        $("tbody").append(`
                    <tr>
                        <td class="text-center">${dado.RA}</td>
                        <td class="text-center">${dado.NOME}</td>
                        <td class="text-center">${dado.NASCIMENTO}</td>
                        <td class="text-center">${dado.EMAIL}</td>
                        <td class="text-center">
                            <button id="${dado.RA}" class="btn btn-info btn-view"><i class="fa-solid fa-eye"></i></button>
                            <button id="${dado.RA}" class="btn btn-warning btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="${dado.RA}" class="btn btn-danger btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                    </tr>
                `);
      }
    },
  });

  //criando a funcionalidade pra salvar novos registros no BD
  $(".btn-save").click(function (e) {
    e.preventDefault();
    let dados = $("#form-aluno").serialize();
    dados += `&operacao=${$(this).attr("data-operation")}`;
    $.ajax({
      type: "POST",
      dataType: "JSON",
      assync: true,
      data: dados,
      url: url,
      success: function (dados) {
        Swal.fire({
          icon: dados.type,
          title: "BIBLIOTEC",
          text: dados.message,
        });
      },
    });
  });
});
