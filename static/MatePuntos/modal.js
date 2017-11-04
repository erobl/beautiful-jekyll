function open_modal() {
    document.getElementById('myModal').style.display = "block";
}

function close_modal() {
    document.getElementById('myModal').style.display = "none";
}

$(document).ready(function() {
    $("#responderPregunta").click(open_modal);

    $("#a").click(function() {
        enable_click();
        $("#responderPregunta").prop('disabled', true);
        close_modal();
    });

    var incorrecto = function() {
        AI();
        close_modal();
    };

    $("#b").click(incorrecto);
    $("#c").click(incorrecto);
    $("#d").click(incorrecto);
})
