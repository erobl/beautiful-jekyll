function open_modal() {
    document.getElementById('myModal').style.display = "block";
}

function close_modal() {
    document.getElementById('myModal').style.display = "none";
}


$(document).ready(function() {
    $("#responderPregunta").click(function() {
        preguntar();
        open_modal();
    });
})
