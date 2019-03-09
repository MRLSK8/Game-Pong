var canvas;
var canvasContext;

var ballX = 40;
var ballSpeedX = 5;

var ballY = 40;
var ballSpeedY = 2;

var paddle1Y = 250;

const PADDLE_HEIGHT = 100;

window.onload = () => {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    drawEverything();

    var framesPerSeconds = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSeconds);

    canvas.addEventListener('mousemove', function(event){
        var mousePos = calculateMousePosition(event);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2)
    });
}

function calculateMousePosition(event){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}

function drawEverything(){
    // Draws the background
    colorRect(0, 0, canvas.width, canvas.height, "black");

    // This is the left player paddle
    colorRect(1, paddle1Y, 5, PADDLE_HEIGHT, "white");

    // Draws the ball
    colorCircle(ballX, ballY, 7, "white");
}

function colorCircle(centerX, centerY, radius, circleColor){
    canvasContext.fillStyle = circleColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function moveEverything(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX >= (canvas.width - 15)){
        ballSpeedX += 1;
        ballSpeedX = -ballSpeedX;
    }else if(ballX <= 15){
        ballSpeedX -= 1;
        ballSpeedX = -ballSpeedX;
    }

    if(ballY >= (canvas.height - 10)){
        ballSpeedY += 1;
        ballSpeedY = -ballSpeedY;
    }else if(ballY <= 10){
        ballSpeedY -= 1;
        ballSpeedY = -ballSpeedY;
    }
}