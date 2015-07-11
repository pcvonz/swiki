var n = 0;
var data;
var font = 0

time = new Date().getTime() / 1000;

function draw() {
    if(window.variable[n] == undefined) {
            window.cancelAnimationFrame(draw);
            getJson();
        } else {
            var speed = document.getElementById('speed').value
            curr_time = new Date().getTime() / 1000;
            var canvas = document.getElementById('Wikipedia');
            if(canvas.getContext){
                //Set up canvas
                
                console.log($( window ).height());
                
                var ctx = canvas.getContext('2d');
               
                //get window height
                var x = canvas.width / 2;
                var y = canvas.height / 2;
                
                
                if((curr_time-time) > (.1 / speed)) {
                    //clear canvas and set it to size of the window
                    canvas.width = $( window ).width();
                    canvas.height = $( window ).height();
                    canvas.style.width = $( window ).width().toString();
                    canvas.style.height = $( window ).height().toString();
                    
                    //Calculate appropriate font size
                    font = ($( window ).height() / 5).toString() + "px sans";
                    console.log(font);
                    
                    ctx.font = font;
                    ctx.textAlign = 'center';
                    ctx.fillText(window.variable[n], x, y);
                    n++;
                    time = new Date().getTime() / 1000;
            }
            window.requestAnimationFrame(draw);
        }
    }
}


function getJson() {
    $.getJSON('http://127.0.0.1:5000/grab_article', 
    function(data, textStatus, jqXHR) {
        window.variable = data;
        draw();
    }
    
)
};

window.onload = getJson;