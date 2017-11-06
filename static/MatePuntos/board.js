function draw_board(x,y) {
    var ns = 'http://www.w3.org/2000/svg';
    var div = document.getElementById("board");
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'width', '100%');
    svg.setAttributeNS(null, 'height', '65%');
    div.appendChild(svg);

    var wwidth = $(window).width();
    var wheight = $(window).height()*0.65;

    var side_len = wwidth > wheight ? wheight : wwidth;

    

    var dot_lenx = Math.floor(side_len/(x+1));
    var dot_leny = Math.floor(side_len/(y+1));

    var offsetx = Math.floor(wwidth/2 - dot_lenx*x/2);
    var offsety = Math.floor(wheight/2 - dot_leny*y/2);

    var dot_size = side_len*0.015;
    var line_width = dot_size*2*0.7;

    for(var i = 0; i < x; i++) {
        for(var j = 0; j < y; j++) {
            var square = document.createElementNS(ns, 'rect');
            square.setAttributeNS(null, "x", offsetx + i*dot_lenx);
            square.setAttributeNS(null, "y", offsety + j*dot_leny);
            square.setAttributeNS(null, "width", dot_lenx);
            square.setAttributeNS(null, "height", dot_leny);
            square.setAttributeNS(null, "fill", colorescuad[grid[j][i]]);
            square.setAttributeNS(null, "id", "sq" + j + "," + i);
            svg.appendChild(square);
        }
    }

    for(var i = 0; i < x; i++) {
        for(var j = 0; j < y+1; j++) {
            var line = document.createElementNS(ns, 'line');
            line.setAttributeNS(null, "x1", offsetx + i*dot_lenx);
            line.setAttributeNS(null, "x2", offsetx + (i+1)*dot_leny);
            line.setAttributeNS(null, "y1", offsety + j*dot_lenx);
            line.setAttributeNS(null, "y2", offsety + j*dot_lenx);
            line.setAttributeNS(null, "stroke", coloreshtml[hline[j][i]]);
            line.setAttributeNS(null, "stroke-width", line_width);
            line.setAttributeNS(null, "id", "hline" + j + "," + i);
            svg.appendChild(line);
        }
    }

    for(var i = 0; i < x+1; i++) {
        for(var j = 0; j < y; j++) {
            var line = document.createElementNS(ns, 'line');
            line.setAttributeNS(null, "x1", offsetx + i*dot_lenx);
            line.setAttributeNS(null, "x2", offsetx + i*dot_leny);
            line.setAttributeNS(null, "y1", offsety + j*dot_lenx);
            line.setAttributeNS(null, "y2", offsety + (j+1)*dot_lenx);
            line.setAttributeNS(null, "stroke", coloreshtml[vline[i][j]]);
            line.setAttributeNS(null, "stroke-width", line_width);
            line.setAttributeNS(null, "id", "vline" + i + "," + j);
            svg.appendChild(line);
        }
    }

    for(var i = 0; i < x+1; i++) {
        for(var j = 0; j < y+1; j++) {
            var circ = document.createElementNS(ns, 'circle');
            circ.setAttributeNS(null, "cx", offsetx + i*dot_lenx);
            circ.setAttributeNS(null, "cy", offsety + j*dot_leny);
            circ.setAttributeNS(null, "fill", "#000");
            circ.setAttributeNS(null, "r", dot_size);
            svg.appendChild(circ);
        }
    }
}

$( document ).ready(function() {
    draw_board(3,3);
    $(window).resize(function() {
        $("#board").html("");
        draw_board(3,3);
    })
})
