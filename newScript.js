document.addEventListener("DOMContentLoaded", function() {            
    const movableDiv = document.getElementById('movable-div');
    const gameDivWidth = document.getElementById('game-div').offsetWidth;
    const movableDivWidth = document.getElementById('movable-div').offsetWidth;
    movableDiv.style.backgroundColor = 'grey';
    var globalID;
    var stepSize = 2;
    var shift = 0;
    var maxPosition = gameDivWidth - movableDivWidth;
    var rightKeyPressed = false;
    var leftKeyPressed = false;
    var firstKeyPressed = "No info";
    var moving = false;
    function showInfo() {
        console.log(globalID + " is globalID");
        console.log(shift + " is shift");
        console.log(rightKeyPressed + " is rightKeyPressed");
        console.log(leftKeyPressed + " is leftKeyPressed");
        console.log(firstKeyPressed + " is firstKeyPressed");
        console.log(moving + " is moving");
        console.log(" ");
    }
    shift = 350;
    movableDiv.style.transform = `translateX(${shift}px)`;
    function step() {
        if (rightKeyPressed && leftKeyPressed) {
            if (firstKeyPressed === "ArrowRight") {
                shift += stepSize;
            } else if (firstKeyPressed === "ArrowLeft") {
                shift -= stepSize;
            }   
        } else if (firstKeyPressed === "ArrowRight") {
            shift += stepSize;
        } else if (firstKeyPressed === "ArrowLeft") {
            shift -= stepSize;
        }
        if (rightKeyPressed) {
            if (shift > maxPosition - stepSize) {
                shift = maxPosition;
                cancelAnimationFrame(globalID);
                moving = false;
                console.log('right edge');
                return;
            }
        } else if (leftKeyPressed) {
            if (shift < stepSize) {
                shift = 0;
                cancelAnimationFrame(globalID);
                moving = false;
                console.log('left edge');
                return;
            }
        } else if (!rightKeyPressed && !leftKeyPressed) {
            cancelAnimationFrame(globalID);
            moving = false;
            console.log('stopped because no keys pressed');
            showInfo();
            return;
        }
        console.log(firstKeyPressed + " is first pressed key")
        movableDiv.style.transform = `translateX(${shift}px)`;
        globalID = requestAnimationFrame(step);
        showInfo();
    }
    document.addEventListener('keyup', function(event) {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            if (event.key === "ArrowRight") {
                if (leftKeyPressed && firstKeyPressed === "ArrowRight") {
                    firstKeyPressed = "ArrowLeft";
                }
                rightKeyPressed = false;
            } else if (event.key === "ArrowLeft") {
                if (rightKeyPressed && firstKeyPressed === "ArrowLeft") {
                    firstKeyPressed = "ArrowRight";
                }
                leftKeyPressed = false;
            }
        }
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === "ArrowRight") {
            firstKeyPressed = "ArrowRight";
            rightKeyPressed = true;
        } else if (event.key === "ArrowLeft") {
            firstKeyPressed = "ArrowLeft";
            leftKeyPressed = true;
        }
        if (!moving) {
            globalID = requestAnimationFrame(step);
            moving = true;
        }
    });
});