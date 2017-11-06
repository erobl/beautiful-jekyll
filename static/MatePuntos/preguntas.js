var preguntas = {
    error: "No se cargaron las preguntas"
};
function descargar_preguntas() {
    return $.ajax({
        dataType: "json",
        url: "preguntas.json"
    }).then(function(data) { 
        preguntas = data;
    });
}

function correcta() {
    correctas++;
    totales++;
    enable_click();
    $("#responderPregunta").prop('disabled', true);
    close_modal();
}

function incorrecta() {
    totales++;
    AI();
    close_modal();
}

function preguntar() {
    if(preguntas.error) {
        console.log(error);
        return
    }
    
    var numpregunta = Math.floor(Math.random()*preguntas.preguntas.length);

    var pregunta = preguntas.preguntas[numpregunta];
    console.log(pregunta);
    
    $("#Pregunta").html(pregunta.pregunta);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"#Pregunta"]);

    var numCorrecta = Math.floor(Math.random()*(pregunta.incorrectas.length+1))

    $("#botonesRespuesta").html("");

    for(var i = 0; i < pregunta.incorrectas.length+1; i++) {
        if(i < numCorrecta) {
            var button = $("<button />", {
                text: pregunta.incorrectas[i],
                click: incorrecta
            })
        } else if(i == numCorrecta) {
            var button = $("<button />", {
                text: pregunta.correcta,
                click: correcta
            })
        } else {
            var button = $("<button />", {
                text: pregunta.incorrectas[i-1],
                click: incorrecta
            })
        }
        $("#botonesRespuesta").append(button);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"#botonesRespuesta"]);
    }
}

descargar_preguntas();
