$(document).ready(function () {
  //monitorar clicks no elemento com a classe "nav-link"
  $(".nav-link").click(function (e) {
    e.preventDefault();
    // alert('Você clicou no menu')
    $("#main").empty();
    let url = $(this).attr("href");
    // alert(url)
    $("#main").load(url);

    // Forçar a reanimação do CSS
    $("#main").css("animation", "none");
    setTimeout(function () {
      $("#main").css("animation", "");
    }, 10);  // Pausa curta para permitir que a reanimação ocorra
  });
});
