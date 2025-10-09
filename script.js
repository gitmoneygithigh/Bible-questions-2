        document.addEventListener("DOMContentLoaded", function() {            
            const movableDiv = document.getElementById('movable-div');
            const gameDivWidth = document.getElementById('game-div').offsetWidth;
            const movableDivWidth = document.getElementById('movable-div').offsetWidth;
            movableDiv.style.backgroundColor = 'grey';
            var globalID;
            var stepSize = 2;
            var shift = 0;
            var shiftDirection = 1;
            var moving = false;
            var maxPosition = gameDivWidth - movableDivWidth;
            var rightKeyPressed = false;
            var rightKeyUnPressed = true;
            var leftKeyPressed = false;
            var leftKeyUnPressed = true;
            var rightPressedID = 0;
            var rightUnPressedID = 0;
            var leftPressedID = 0;
            var leftUnPressedID = 0;
            function showInfo() {
                console.log(globalID + " is globalID");
                console.log(shift + " is shift");
                console.log(shiftDirection + " is shiftDirection");
                console.log(moving + " is moving");
                console.log(rightKeyPressed + " is rightKeyPressed");
                console.log(leftKeyPressed + " is leftKeyPressed");
                console.log(rightKeyUnPressed + " is rightKeyUnPressed");
                console.log(leftKeyUnPressed + " is leftKeyUnPressed");
                console.log(rightPressedID + " is rightPressedID");
                console.log(leftPressedID + " is leftPressedID");
                console.log(leftUnPressedID + " is leftUnPressedID");
                console.log(rightUnPressedID + " is rightUnPressedID");
                console.log(" ");
            }
            shift = 350;
            movableDiv.style.transform = `translateX(${shift}px)`;
            function step() {
                if (shiftDirection === 1) {
                    shift += stepSize;
                    if (shift > maxPosition - stepSize) {
                        shift = maxPosition;
                        cancelAnimationFrame(globalID);
                        moving = false;
                        console.log('right edge');
                        return;
                    }
                } else if (shiftDirection === -1) {
                    shift -= stepSize;
                    if (shift < stepSize) {
                        shift = 0;
                        cancelAnimationFrame(globalID);
                        moving = false;
                        console.log('left edge');
                        return;
                    }
                }
                if (rightKeyUnPressed && leftKeyUnPressed) {
                    if (!rightKeyPressed && !leftKeyPressed) {
                        cancelAnimationFrame(globalID);
                        moving = false;
                        console.log('stopped because no keys pressed');
                        showInfo();
                        return;
                    }
                }
                movableDiv.style.transform = `translateX(${shift}px)`;
                globalID = requestAnimationFrame(step);
            }
            document.addEventListener('keyup', function(event) {
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                    if (event.key === "ArrowRight") {
                        rightKeyPressed = false;
                        rightKeyUnPressed = true;
                        rightUnPressedID = globalID;
                    } else if (event.key === "ArrowLeft") {
                        leftKeyPressed = false;
                        leftKeyUnPressed = true;
                        leftUnPressedID = globalID;
                    }
                    if (rightUnPressedID < leftUnPressedID) {
                        cancelAnimationFrame(globalID);
                        shiftDirection = 1;
                        leftUnPressedID = requestAnimationFrame(step);
                        console.log('changed direction to the right');
                        showInfo();
                    } else if (leftUnPressedID < rightUnPressedID) {
                        cancelAnimationFrame(globalID);
                        shiftDirection = -1;
                        rightUnPressedID = requestAnimationFrame(step);;
                        console.log('changed direction to the left');
                        showInfo();
                    }
                }
            });
            document.addEventListener('keydown', function(event) {
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                    if (leftKeyPressed && event.key === "ArrowRight") {
                        rightPressedID = globalID;
                        rightKeyUnPressed = false;
                        rightKeyPressed = true;
                        if (rightPressedID > leftPressedID) {
                            cancelAnimationFrame(globalID);
                            shiftDirection = 1;
                            leftPressedID = requestAnimationFrame(step);
                            console.log('changed direction to the right');
                            showInfo();
                        } else if (leftPressedID > rightPressedID) {
                            cancelAnimationFrame(globalID);
                            shiftDirection = -1;
                            rightPressedID = requestAnimationFrame(step);;
                            console.log('changed direction to the left');
                            showInfo();
                        }
                    } else if (rightKeyPressed && event.key === "ArrowLeft") {
                        leftPressedID = globalID;
                        leftKeyUnPressed = false;
                        leftKeyPressed = true;
                        if (rightPressedID > leftPressedID) {
                            cancelAnimationFrame(globalID);
                            shiftDirection = 1;
                            leftPressedID = requestAnimationFrame(step);
                            console.log('changed direction to the right');
                            showInfo();
                        } else if (leftPressedID > rightPressedID) {
                            cancelAnimationFrame(globalID);
                            shiftDirection = -1;
                            rightPressedID = requestAnimationFrame(step);;
                            console.log('changed direction to the left');
                            showInfo();
                        }
                    }
                    if (event.key === "ArrowRight" && !rightKeyPressed) {
                        rightKeyUnPressed = false;
                        rightKeyPressed = true;
                        shiftDirection = 1;
                        if (rightPressedID === 0) {
                            rightPressedID = 1;
                        } else {
                            rightPressedID = globalID;
                        }
                        console.log('right keydown');
                    } else if (event.key === "ArrowLeft" && !leftKeyPressed) {
                        leftKeyPressed = true;
                        leftKeyUnPressed = false;
                        shiftDirection = -1;
                        if (leftPressedID === 0) {
                            leftPressedID = 1;
                        } else {
                            leftPressedID = globalID;
                        }
                        console.log('left keydown');
                    }
                    if (!moving) {
                        if (event.key === "ArrowRight") {
                            rightKeyPressed = true;
                            rightKeyUnPressed = false;
                            shiftDirection = 1;
                        } else if (event.key === "ArrowLeft") {
                            leftKeyPressed = true;
                            leftKeyUnPressed = false;
                            shiftDirection = -1;
                        }
                        if (shift <= 0 && shiftDirection === -1) {
                            return;
                        } else if (shift >= maxPosition && shiftDirection === 1) {
                            return;
                        } else {
                            moving = true;
                            globalID = requestAnimationFrame(step);
                            console.log('started on keydown');
                        }
                        showInfo();
                    }
                }
            });
        });
