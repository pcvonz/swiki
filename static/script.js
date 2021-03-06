var n = 1;
var data;
var font = 0
time = new Date().getTime() / 1000;
var sidebar;

//languages
var language = "en";
var currentLanguage = "en";

//Button to grab new article.
var new_article = false;

function draw() {    
    //If current index is undefined then the end of the article has been reached.
    //Grab another article.
    if(window.variable[n] == undefined) {
            window.cancelAnimationFrame(draw);
            getJson();
    }
    else if(currentLanguage != language) {
        currentLanguage = language;
        console.log("lang " + language);
        console.log("cur " +currentLanguage);
        getJson();
    } else if(new_article == true) {
        new_article = false;
        getJson();
    } else {
            var textSpeed = document.getElementById('speed').value;
            currentLanguage = language;
            language = document.getElementById('language-selector').value;
            curr_time = new Date().getTime() / 1000;
            deltaTime = curr_time - time;
            var canvas = document.getElementById('Wikipedia');
                        
            
            if(canvas.getContext){
                //Set up canvas
                                
                var ctx = canvas.getContext('2d');
               
                //get window height
                var x = canvas.width / 2;
                var y = canvas.height / 2;
                
                
                //Render wikipedia text
                if((deltaTime) > (.1 / textSpeed)) {
                    //clear canvas and set it to size of the window
                    width = $( window ).width();
                    width = width - (width * .01);
                    height = $( window ).height();
                    canvas.width = width;
                    canvas.height = height;
                    canvas.style.width = width;
                    canvas.style.height = height;
                    
                    //Set the canvas background to black
                    ctx.fillRect(0, 0, width, height)
                    
                    
                    //Calculate appropriate font size
                    font = ($( window ).width() / 10).toString() + "px sans";
                    
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

//Grabs wikipedia article from flask server
function getJson() {
    if(language == "en") {
        var url = 'http://127.0.0.1:5000/grab_article_en';
    } else if(language == "es") {
        var url = 'http://127.0.0.1:5000/grab_article_es';
    }
        
    $.getJSON(url,
    function(data, textStatus, jqXHR) {
        window.variable = data;
        window.sidebar = document.getElementById('sidebar');
        document.getElementById("article_title").innerHTML= data[0];
        document.getElementById("link_to_article").href = "https://en.wikipedia.org/wiki/Special:Search?search=" + data[0];
        draw();
    }
    
)
};

function grabNewArticle() {
    new_article = true;
}

function start() {
    sidebar = document.getElementById('relative_sidebar');
    }

window.onload = getJson;
