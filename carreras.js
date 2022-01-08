function CargarCarreras(carr) {
  let url2 = " https://api.cadif1.com/carrera/";
  let urlMaterias = "http://api.cadif1.com/nivel/";
  let $h3Carreras = $("<h3></h3>");
  $($h3Carreras).text("Carreras Disponibles");
  $(".resul-carrera").append($h3Carreras);
  for (let i = 0; i < carr.carreras.length; i++) {
    if (carr.carreras[i].activa == 1) {
      let nombreCarrera = carr.carreras[i].nombre;
      let $divCarreras = $("<div></div>");
      $($divCarreras).attr("class", "content-carreras");
      $($divCarreras).attr("id", carr.carreras[i].id);
      let $img = $("<img></img>");
      $($img).attr("src", "./img/15.png");
      let $h5 = $("<h5></h5>");
      $($h5).text(nombreCarrera);
      $($divCarreras).append($img);
      $($divCarreras).append($h5);
      $(".resul-carrera").append($divCarreras);
    }
    let divCarr = $("#" + carr.carreras[i].id);
    $(divCarr).click(() => {
      $("#resultados-pensum").show();

      var id = $(divCarr).attr("id");
      $.getJSON(url2 + id, (carr) => {
        $(".content-pensum").empty();
        let periodo = 1;
        let $h3 = $("<h3></h3>");
        $($h3).text("Pensum de estudios");
        $(".content-pensum").append($h3);

        for (let i = 0; i < carr.carrera.pensum.length; i++) {
          let materias = carr.carrera.pensum[i];
          let $divPeriodo = $("<div></div>");
          $($divPeriodo).attr("class", "content-periodo");
          let $h5 = $("<h5></h5>");
          $($h5).text("PERIODO " + periodo);

          $($divPeriodo).append($h5);
          let $ul = $("<ul></ul>");
          for (let j = 0; j < materias.length; j++) {
            if (materias[j].periodo == periodo) {
              let materia = materias[j].materia;

              let $li = $("<li></li>");
              $($li).attr("id", materias[j].idmateriaxservicio);
              $($li).text(materia);
              $($ul).append($li);
              $($li).click(() => {
                var idMateria = $($li).attr("id");
                $.getJSON(urlMaterias + idMateria, (mat) => {
                  $("#resultado-info").show();
                  $("#resultados").hide();
                  $("#informacion").empty();
                  let $divCont = $("<div></div");
                  $($divCont).attr("class", "content-info");
                  let $divTitulo = $("<div></div");
                  $($divTitulo).attr("class", "titulo");
                  let $h2 = $("<h2></h2>");
                  $($h2).text(mat.nivel.titulo);
                  $($divTitulo).append($h2);
                  $($divCont).append($divTitulo);
                  let $articulo = $("<article></article>");
                  let $objetivoE = $("<span></span>");
                  $($objetivoE).attr("class", "subtitulos");
                  $($objetivoE).text("Objetivos Especificos");
                  $($articulo).append($objetivoE);
                  let $parrObjetivoE = $("<p></p>");

                  $($parrObjetivoE).text(mat.nivel.objetivosespecificos);
                  $($articulo).append($parrObjetivoE);

                  let $contenido = $("<span></span>");
                  $($contenido).attr("class", "subtitulos");
                  $($contenido).text("Contenido");
                  $($articulo).append($contenido);
                  let $ol = $("<ol></ol>");
                  for (let i = 0; i < mat.nivel.capitulos.length; i++) {
                    let $li = $("<li></li>");
                    $($li).text(mat.nivel.capitulos[i].nombre);
                    $($ol).append($li);
                  }
                  $($articulo).append($ol);
                  $($divCont).append($articulo);
                  $("#informacion").append($divCont);
                });
              });
            }
            $($divPeriodo).append($ul);
          }
          $(".content-pensum").append($divPeriodo);
          periodo++;
        }
      });
    });
  }
}
