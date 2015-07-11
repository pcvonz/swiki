var n = 0;
var data;

time = new Date().getTime() / 1000;

function draw() {
    if(window.variable[n] == undefined) {
            window.cancelAnimationFrame(draw);
            getJson();
        } else {
        curr_time = new Date().getTime() / 1000;
        var canvas = document.getElementById('Wikipedia');
        if(canvas.getContext){
            var ctx = canvas.getContext('2d');
            ctx.font = "48px serif";
            
            if((curr_time-time) > .2) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillText(window.variable[n], 10, 50);
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

function getJsonAgain() {
    $.getJSON('http://127.0.0.1:5000/grab_article', 
    function(data, textStatus, jqXHR) {
        window.variable = data;
            }
    
)
};