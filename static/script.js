var data;

function draw() {
    var canvas = document.getElementById('Wikipedia');
    if(canvas.getContext){
        
        
    }
}


$.getJSON('http://127.0.0.1:5000/grab_article', 
    function(data, textStatus, jqXHR) {
        console.log(data)
    }
)

console.log(data)