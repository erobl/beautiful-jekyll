function open_modal() {
    document.getElementById('myModal').style.display = "block";
}

function close_modal() {
    document.getElementById('myModal').style.display = "none";
}



$(document).ready(function() {
    $("#btnCerrar").click(function() {
        document.getElementById("tutModal").style.display = "none";
    });

    $("#responderPregunta").click(function() {
        preguntar();
    });
})
