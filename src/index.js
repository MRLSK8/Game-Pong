var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 5;

window.onload = () => {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    drawEverything();

    var framesPerSeconds = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSeconds);
}

function drawEverything(){
    colorRect(0, 0, canvas.width, canvas.height, "black");
    colorRect(1, 5, 5, 100, "white");
    colorRect(ballX, 10, 10, 10, "red");
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function moveEverything(){
    ballX += ballSpeedX;

    if(ballX > canvas.width){
        ballSpeedX += 1;
        ballSpeedX = -ballSpeedX;
    }else if(ballX < 0){
        ballSpeedX -= 1;
        ballSpeedX = -ballSpeedX;
    }
}