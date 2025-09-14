document.addEventListener("DOMContentLoaded", function() {            
    const movableDiv = document.getElementById('movable-div');
    const gameDivWidth = document.getElementById('game-div').offsetWidth;
    const movableDivWidth = document.getElementById('movable-div').offsetWidth;
    movableDiv.style.backgroundColor = 'grey';
    var globalID;
    var stepSize = 5;
    var maxPosition = gameDivWidth - movableDivWidth;
    var rightKeyPressed = false;
    var leftKeyPressed = false;
    var lastKeyPressed = "No info";
    STATIONARY = "STATIONARY";
    var condition = STATIONARY;
    let shift = 350;
    movableDiv.style.transform = `translateX(${shift}px)`;
    ArrowRight = "ArrowRight";
    MOVING_RIGHT = "MOVING_RIGHT";
    ArrowLeft = "ArrowLeft";
    MOVING_LEFT = "MOVING_LEFT";
    function checkEdgeCase() {
        if (shift >= maxPosition) {
            shift = maxPosition;
        } else if (shift <= 0) {
            shift = 0;
        }
    }
    function checkCondition() {
        if (!rightKeyPressed && !leftKeyPressed) {
            condition = STATIONARY;
        }
        if (rightKeyPressed && leftKeyPressed) {
            if (lastKeyPressed === ArrowRight) {
                condition = MOVING_RIGHT;
            } else if (lastKeyPressed === ArrowLeft) {
                condition = MOVING_LEFT;
            }
        }
        if (rightKeyPressed && !leftKeyPressed) {
               condition = MOVING_RIGHT;
        }
        if (leftKeyPressed && !rightKeyPressed) {
            condition = MOVING_LEFT;
        }
    }
    function calculateShift () {
        if (condition === MOVING_RIGHT) {
            shift += stepSize;
        } else if (condition === MOVING_LEFT) {
            shift -= stepSize;
        } 
        if (shift > maxPosition) {
            shift = maxPosition;
        } else if (shift < 0) {
            shift = 0;
        }
    }
    function makeMove() {
        movableDiv.style.transform = `translateX(${shift}px)`;
        if (condition === MOVING_RIGHT || condition === MOVING_LEFT) {
            globalID = requestAnimationFrame(step);
        }
    }
    function showInfo() {
        console.log(globalID + " is globalID");
        console.log(shift + " is shift");
        console.log(rightKeyPressed + " is rightKeyPressed");
        console.log(leftKeyPressed + " is leftKeyPressed");
        console.log(condition + " is condition");
        console.log(lastKeyPressed + " is last pressed key");
        console.log(" ");
    }
    function step() {
        checkEdgeCase();
        checkCondition();
        calculateShift();
        makeMove ();
        showInfo();
    }
    document.addEventListener('keyup', function(event) {
        if (event.key === ArrowRight || event.key === ArrowLeft) {
            if (event.key === ArrowRight) {
                rightKeyPressed = false;
            } else if (event.key === ArrowLeft) {
                leftKeyPressed = false;
            }
        }
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === ArrowRight || event.key === ArrowLeft) {
            if (event.key === ArrowRight) {
                    lastKeyPressed = ArrowRight;
                    rightKeyPressed = true;
            } else if (event.key === ArrowLeft) {
                    lastKeyPressed = ArrowLeft;
                    leftKeyPressed = true;
            }
            if (condition === STATIONARY) {
                globalID = requestAnimationFrame(step);
            }
        }
    });
});