var coloreshtml = {
    r: "#FF0000",
    b: "#0000FF",
    w: "#FFFFFF"
}

var colorescuad = {
    r: "#AA0000",
    b: "#0000AA",
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

function actualizar_marcador() {
   $("#scorej").html(score['b']); 
   $("#scoreo").html(score['r']); 
}

function checksquare(x, y, color) {
    if(hline[x][y] != 'w' && hline[x+1][y] != 'w' && vline[y][x] != 'w' && vline[y+1][x] != 'w') {
        grid[x][y] = color
        $("#sq" + x + "\\," + y).attr("fill", colorescuad[color])
        ++score[color];
        actualizar_marcador();
    }
}

function checkhorizontal(x, y, color) {
    if( x > 0 ) {
        checksquare(x-1,y,color);
    }
    if( x < n-1 ) {
        checksquare(x,y,color);
    }
}

function checkvertical(x, y, color) {
    if( y > 0 ) {
        checksquare(x,y-1,color);
    }
    if( y < n-1 ) {
        checksquare(x,y,color);
    }
}

function playv(x, y, color) {
    vline[x][y] = color;
    checkvertical(parseInt(y),parseInt(x),color);
    $("#vline" + x + "\\," + y).attr("stroke", coloreshtml[color]);
    $("#vline" + x + "\\," + y).off("mouseenter");
    $("#vline" + x + "\\," + y).off("mouseleave");
    $("#vline" + x + "\\," + y).off("click");
}

function playh(x,y,color) {
    console.log(color);
    hline[x][y] = color;
    checkhorizontal(parseInt(x),parseInt(y),color);
    $("#hline" + x + "\\," + y).attr("stroke", coloreshtml[color]);
    $("#hline" + x + "\\," + y).off("mouseenter");
    $("#hline" + x + "\\," + y).off("mouseleave");
    $("#hline" + x + "\\," + y).off("click");
}

function AI() {
    if(Math.random() > 0.5) {
        // horizontal
        var x = Math.floor(hline.length*Math.random());
        var y = Math.floor(hline[0].length*Math.random());

        if(hline[x][y] != 'w') {
            AI();
        } else {
            playh(x,y,'r');
        }
    } else {
        // vertical
        var x = Math.floor(vline.length*Math.random());
        var y = Math.floor(vline[0].length*Math.random());

        if(vline[x][y] != 'w') {
            AI();
        } else {
            playv(x,y,'r');
        }
    }
}

function line_click() {
    var id = $(this).attr("id");
    var idx = id.split("line")[1].split(",");
    
    if(id.split("line")[0] == "v") {
        playv(idx[0],idx[1],'b');
    } else {
        playh(idx[0],idx[1],'b');
    }

    disable_click();
    $("#responderPregunta").prop("disabled", false);
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

function config() {
    $("line").attr("stroke", coloreshtml['w']);
    $("rect").attr("fill", colorescuad['w']);
}

$( document ).ready(function() {
    config();
})
