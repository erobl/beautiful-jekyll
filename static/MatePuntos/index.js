var coloreshtml = {
    r: "#811305",
    b: "#192760",
    w: "#FFFFFF"
}

var colorescuad = {
    r: "#FF1E00",
    b: "#214597",
    w: "#FFFFFF"
}

var hline = [['w','w','w'],['w','w','w'],['w','w','w'],['w','w','w']]
var vline = [['w','w','w'],['w','w','w'],['w','w','w'],['w','w','w']]
var grid = [['w','w','w'],['w','w','w'],['w','w','w']]
var score = {
    r: 0,
    b: 0
}
var n = 4;
var correctas = 0;
var totales = 0;

function check_grid() {
    return grid.map(function(x) {
        return x.map(function(y) {
            return y != 'w';
        }).reduce(function(sum, value) {
            return sum && value;
        }, true);
    }).reduce(function(sum, value) {
        return sum && value;
    }, true);
}

function actualizar_marcador() {
   $("#scorej").html(score['b']); 
   $("#scoreo").html(score['r']); 
}

function checksquare(x, y, color) {
    if(hline[x][y] != 'w' && hline[x+1][y] != 'w' && vline[y][x] != 'w' && vline[y+1][x] != 'w') {
        grid[x][y] = color
        $("#sq" + x + "\\," + y).attr("fill", colorescuad[color])
        ++score[color];

        return true;

    }
    return false;
}

function checkhorizontal(x, y, color) {
    if( x > 0 ) {
        var a = checksquare(x-1,y,color);
    } else {
        var a = false;
    }
    if( x < n-1 ) {
        var b = checksquare(x,y,color);
    } else {
        var b = false;
    }

    return a || b
}

function checkvertical(x, y, color) {
    if( y > 0 ) {
        var a = checksquare(x,y-1,color);
    } else {
        var a = false;
    }
    if( y < n-1 ) {
        var b = checksquare(x,y,color);
    } else {
        var b = false;
    }

    return a || b
}

function playv(x, y, color) {
    vline[x][y] = color;
    $("#vline" + x + "\\," + y).attr("stroke", coloreshtml[color]);
    $("#vline" + x + "\\," + y).off("mouseenter");
    $("#vline" + x + "\\," + y).off("mouseleave");
    $("#vline" + x + "\\," + y).off("click");
    return checkvertical(parseInt(y),parseInt(x),color);
}

function playh(x, y, color) {
    console.log(color);
    hline[x][y] = color;
    $("#hline" + x + "\\," + y).attr("stroke", coloreshtml[color]);
    $("#hline" + x + "\\," + y).off("mouseenter");
    $("#hline" + x + "\\," + y).off("mouseleave");
    $("#hline" + x + "\\," + y).off("click");
    return checkhorizontal(parseInt(x),parseInt(y),color);
}

function complete_square(callback) {
    actualizar_marcador();
    if(!check_grid()) {
        callback();
    } else {
        if(score['r'] == score['b']) {
            $("#winContent").html("¡Hubo un empate!<br />Tu puntaje es " + correctas + "/" + totales);
        } else if(score['r'] < score['b']) {
            $("#winContent").html("¡Has ganado!<br />Tu puntaje es " + correctas + "/" + totales);
        } else {
            $("#winContent").html("Has perdido...<br />Tu puntaje es " + correctas + "/" + totales);
        }

        document.getElementById('winModal').style.display = "block";
    }
}

function AI() {
    if(check_grid()) {
        return;
    }
    if(Math.random() > 0.5) {
        // horizontal
        var x = Math.floor(hline.length*Math.random());
        var y = Math.floor(hline[0].length*Math.random());

        if(hline[x][y] != 'w') {
            AI();
        } else {
            if(playh(x,y,'r')) {
                complete_square(AI);
            }
        }
    } else {
        // vertical
        var x = Math.floor(vline.length*Math.random());
        var y = Math.floor(vline[0].length*Math.random());

        if(vline[x][y] != 'w') {
            AI();
        } else {
            if(playv(x,y,'r')) {
                complete_square(AI);
            }
        }
    }
}

function line_click() {
    var id = $(this).attr("id");
    var idx = id.split("line")[1].split(",");
    
    disable_click();
    $("#responderPregunta").prop("disabled", false);
    if(id.split("line")[0] == "v") {
        var another_turn = playv(idx[0],idx[1],'b');
    } else {
        var another_turn = playh(idx[0],idx[1],'b');
    }
    if(another_turn) {
        complete_square(enable_click);
    }
}

function line_hover() {
    $(this).attr("stroke", "#AAAAAA");
}

function line_offhover() {
    $(this).attr("stroke", "#FFFFFF");
}

function disable_click() {
    $("line").off("mouseenter");
    $("line").off("mouseleave");
    $("line").off("click");
}

function enable_click() {
    for(var i = 0; i < hline.length; i++) {
        for(var j = 0; j < hline[0].length; j++) {
            if(hline[i][j] == 'w') {
                $("#hline" + i + "\\," + j).hover(line_hover, line_offhover);
                $("#hline" + i + "\\," + j).click(line_click);
            }
        }
    }
    for(var i = 0; i < vline.length; i++) {
        for(var j = 0; j < vline[0].length; j++) {
            if(vline[i][j] == 'w') {
                $("#vline" + i + "\\," + j).hover(line_hover, line_offhover);
                $("#vline" + i + "\\," + j).click(line_click);
            }
        }
    }
}
