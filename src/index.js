var canvas;
var canvasContext;

var ballX = 40;
var ballSpeedX = 40;

var ballY = 40;
var ballSpeedY = 6;

var paddle1Y = 250;
var paddle2Y = 250;

var player1Score = 0;
var player2Score = 0;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 6;

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

function ballReset(){
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
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

function score(score, posX){
    canvasContext.fillText("Score: " + score, posX, 50);
}

function drawEverything(){
    // Draws the background
    colorRect(0, 0, canvas.width, canvas.height, "black");

    // This is the left player paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

    // This is the right computer paddle
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

    // Draws the ball
    colorCircle(ballX, ballY, 7, "white");

    score(player1Score, 100);
    score(player2Score, canvas.width - 200);
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

function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);

    if(paddle2YCenter < (ballY - 35)){
        paddle2Y += 6;
    }else if(paddle2YCenter > (ballY + 35)){
        paddle2Y -= 6;
    }
}

function moveEverything(){
    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX >= (canvas.width - PADDLE_THICKNESS)){
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            if(ballSpeedX < 50){
                ballSpeedX += 1;
            }
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            player1Score++;
        }
    }else if(ballX <= PADDLE_THICKNESS){
        if(ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT)){
            if(ballSpeedX < 50){
                ballSpeedX += 1;
            }
            ballSpeedX = -ballSpeedX;
        }else{
            ballReset();
            player2Score++;
        }
    }

    if(ballY >= canvas.height){
        ballSpeedY = -ballSpeedY;
    }else if(ballY <= 0){
        ballSpeedY = -ballSpeedY;
    }
}