$(document).ready(() => {
  let urlAreaEstudio = "https://api.cadif1.com/areadeestudio";
  let urlCursos = "https://api.cadif1.com/curso";
  let urlSeccion = "https://api.cadif1.com/seccion";
  let arrAlumnos = [];

  $.getJSON(urlAreaEstudio, (area) => {
    $("#select01").empty();
    $("#select02").empty();
    $("#select03").empty();
    let $option = $("<option></option>");
    $($option).text("Seleccionar");
    $($option).attr("selected", "true");
    $($option).val("seleccion");
    $("#select01").append($option);
    for (let i = 0; i < area.areas.length; i++) {
      let nombreArea = area.areas[i].nombre;
      let $option2 = $("<option></option>");
      $($option2).text(nombreArea);
      $($option2).val(area.areas[i].id);

      $("#select01").append($option2);
    }
  }).fail((area) => {
    console.log("ocurrio un error en la peticion");
  });
  $("#select01").on("change", function () {
    $.getJSON("curso2.json", (curso) => {
      let $area = $("#select01").val();
      $("#select02").empty();
      $("#select03").empty();
      let $option = $("<option></option>");
      $($option).attr("selected", "true");
      $($option).text("Seleccionar");
      $($option).val("seleccion");
      $("#select02").append($option);
      for (let i = 0; i < curso.cursos.length; i++) {
        if (curso.cursos[i].idareaestudio == $area) {
          let nombreCurso = curso.cursos[i].nombre;
          let $option2 = $("<option></option>");
          $($option2).text(nombreCurso);
          $($option2).val(curso.cursos[i].id);
          $("#select02").append($option2);
        }
      }
    }).fail((curso) => {
      console.log("ocurrio un error en la peticion");
    });
  });
  //profe en el segundo select no pude usar la url porque el api no tenia la variable idareaestudio y no sabia como compararlo.

  $("#select02").on("change", function () {
    $.getJSON(urlSeccion, (seccion) => {
      let $curso = $("#select02").val();
      $("#select03").empty();
      let $option3 = $("<option></option>");
      $($option3).attr("selected", "true");
      $($option3).text("Seleccionar");
      $($option3).val("seleccion");
      $("#select03").append($option3);
      for (let i = 0; i < seccion.length; i++) {
        if (seccion[i].idcurso == $curso) {
          let codigoSeccion = seccion[i].id;
          let $option4 = $("<option></option>");
          $($option4).text(codigoSeccion);
          $($option4).val(seccion[i].id);
          $("#select03").append($option4);
        }
      }
    }).fail((seccion) => {
      console.log("ocurrio un error en la peticion");
    });
  });

  function getFormData(form) {}
  $("#cedula").on("keypress", (event) => {
    var regex = new RegExp("^[0-9 ]+$");
    var key = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    validaCampo(regex, key);
  });
  $("#nombre").on("keypress", (event) => {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    validaCampo(regex, key);
  });
  function validaCampo(regex, key) {
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  let btnRegistro = $("#btnregistro");

  $(btnRegistro).click(() => {
    let cedula = $("#cedula").val();
    let nombre = $("#nombre").val();
    let select3 = $("#select03").val();


    if (!estaVacio(cedula, "El campo cedula esta vacio"))
      if (!estaVacio(nombre, "El campo nombre esta vacio"))
        if (select3 == "" || select3 == "seleccion" || select3 == null)
          alert("No ha seleccionado una seccion abierta");
        else {
          $.post(
            "http://api.cadif1.com/registro",
            $("#datos").serializeArray(),
            function (res) {
              var objForm = {};
              for (let i = 0; i < res.length; i++) {
                let valor = res[i];
                objForm[valor.name] = valor.value;
              }
              arrAlumnos.push(objForm);
              return objForm;
            }
          ).fail((res) => {
            console.log("ocurrio un error en la peticion");
          });
        }
  });

  function estaVacio(input, mensaje) {
    if (input.trim().length == 0) {
      alert(mensaje);
      return true;
    } else return false;
  }
});
