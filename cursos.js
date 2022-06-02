function cargarCursos(cur) {
  $("#resultados-pensum").hide();

  for (let i = 0; i < cur.cursos.length; i++) {
    let codigo = cur.cursos[i].codigo;
    let nombreCurso = cur.cursos[i].nombre;
    let objetivo = cur.cursos[i].objetivoresumido;
    let $divCursos = $("<div></div>");
    $($divCursos).attr("class", "content-cursos ");
    let $input = $("<input></input>");
    $($input).attr("class", "codigo");
    $($input).val(codigo);
    $($input).attr("disabled", "true");
    $($divCursos).append($input);
    let $h3 = $("<h3></h3>");
    $($h3).text(nombreCurso);
    $($divCursos).append($h3);
    let $p = $("<p></p>");
    $($p).text(objetivo);
    $($divCursos).append($p);
    $(".resul-curso").append($divCursos);
  }
}
