var n = 0;
var data;
var font = 0
time = new Date().getTime() / 1000;
var sidebar;
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
                                
                var ctx = canvas.getContext('2d');
               
                //get window height
                var x = canvas.width / 2;
                var y = canvas.height / 2;
                
                
                //Side bar
                if((curr_time-time) > .5) {
                    console.log("there");
                    $( window ).mousemove(function( event ) {
                        if(event.pageX < 200) {
                            menuPopOut();
                        } else {
                            menuPopIn();
                        }
                    });
                }
                
                if((curr_time-time) > (.1 / speed)) {
                    //clear canvas and set it to size of the window
                    width = $( window ).width();
                    width = width - (width * .01);
                    height = $( window ).height();
                    canvas.width = width;
                    canvas.height = height;
                    canvas.style.width = width;
                    canvas.style.height = height;
                    ctx.fillRect(0, 0, width, height)
                    
                    
                    //Calculate appropriate font size
                    font = ($( window ).height() / 5).toString() + "px sans";
                    
                    ctx.font = font;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = "#e5e5e5"
                    ctx.fillText(window.variable[n], x, y);
                    n++;
                    time = new Date().getTime() / 1000;
            }
            window.requestAnimationFrame(draw);
        }
    }
}

function menuPopOut() {
    window.sidebar.style.right = "0px" ;
}

function menuPopIn() {
    window.sidebar.style.right = "170px" ;
}
function getJson() {
    $.getJSON('http://127.0.0.1:5000/grab_article',
    function(data, textStatus, jqXHR) {
        window.variable = data;
        window.sidebar = document.getElementById('relative_sidebar');

        draw();
    }
    
)
};

function start() {
    sidebar = document.getElementById('relative_sidebar');
    }

window.onload = getJson;
window.DOMContentLoaded = start;