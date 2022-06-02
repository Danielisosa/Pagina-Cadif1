$(document).ready(() => {
  let url = " https://api.cadif1.com/carrera";

  $.getJSON("seccion.json", (seccion) => {
    $("#resultados-area").hide();
    $("#resultado-info").hide();
    $("#resultados").empty();
    $(".resul-carrera").hide();

    for (let i = 0; i < seccion.length; i++) {
      if (seccion[i].fi !== null) {
        let curso = seccion[i].materia;
        let codigoNivel = seccion[i].codigonivel;
        let nivel = seccion[i].nivel;
        let comienza = seccion[i].fi;
        let modalidad = seccion[i].modalidad;
        let $divCarreras = $("<div></div>");
        $($divCarreras).attr("class", "content-seccion ");
        let $input = $("<input></input>");
        $($input).attr("class", "codigo");
        $($input).val(codigoNivel);
        $($input).attr("disabled", "true");
        $($divCarreras).append($input);
        let $h4 = $("<h4></h4>");
        $($h4).text(nivel);
        $($divCarreras).append($h4);
        let $h3 = $("<h3></h3>");
        $($h3).text(curso);
        $($divCarreras).append($h3);
        let $span1 = $("<span></span>");
        $($span1).text("Comienza el " + comienza);
        $($divCarreras).append($span1);
        let $span2 = $("<span></span>");
        $($span2).text("Modalidad  " + modalidad);
        $($divCarreras).append($span2);

        $("#resultados").append($divCarreras);
      }
    }
  });
  $("#btn-carreras").click(() => {
    $("#titulo-seccion").hide();
    $("#resultados").show();
    $(".resul-carrera").show();
    $("#resultados-pensum").show();
    $("#cont-img").hide();
    $("#resultados2").hide();
    $("#resultados-area").hide();
    $("#resultados-pensum").hide();
    $("#resultados").load("carreras.html", (a, b, c) => {
      if (b == "error") {
        $("#resultados").html("<p>Error al cargar el contenedor </p>");
      }
      $.getScript("carreras.js", () => {
        $.getJSON(url, (carr) => {
          $(".resul-carrera").empty();
          console.log(carr);
          CargarCarreras(carr);
        }).fail((carr) => {
          console.log("ocurrio un error en la peticion");
        });
      });
    });
  });

  $("#btn-cursos").click(() => {
    $("#cont-img").hide();
    $("#titulo-seccion").hide();
    $("#resultados").hide();
    $(".resul-carrera").hide();
    $("#resultados-pensum").hide();
    $("#resultados-area").show();
    $("#resultados2").show();
    $("#resultados-area").css("display", "flex");

    $("#resultados-cursos").load("cursos.html", (a, b, c) => {
      if (b == "error") {
        $("#resultados-cursos").html("<p>Error al cargar el contenedor </p>");
      }
      $.getScript("cursos.js", () => {
        $.getJSON("curso.json", (cur) => {
          $(".resul-curso").empty();

          cargarCursos(cur);
        }).fail((cur) => {
          console.log("ocurrio un error en la peticion");
        });
      });
      $.getJSON("areadeestudio.json", (area) => {
        $(".content-area").empty();

        let $h3 = $("<h3></h3>");
        $($h3).text("Areas de estudios");
        $(".content-area").append($h3);
        for (let i = 0; i < area.areas.length; i++) {
          let nombreArea = area.areas[i].nombre;
          let $h4 = $("<h4></h4>");
          $($h4).text(nombreArea);
          $(".content-area").append($h4);
        }
      }).fail((area) => {
        console.log("ocurrio un error en la peticion");
      });
    });
  });
});
