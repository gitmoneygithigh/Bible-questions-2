class Ball {
    constructor(elementId, gameDiv, movingBaseInstance) {
        this.movingBaseInstance = movingBaseInstance;
        this.movingBasePosition = this.movingBaseInstance.shift;
        this.STATIONARY = "STATIONARY";
        this.ArrowRight = "ArrowRight";
        this.MOVING_RIGHT = "MOVING_RIGHT";
        this.MOVING_DOWN = "MOVING_DOWN";
        this.ArrowLeft = "ArrowLeft";
        this.lastKeyPressed = null;
        this.MOVING_LEFT = "MOVING_LEFT";
        this.MOVING_UP = "MOVING_UP";
        this.ball = document.getElementById(elementId);
        this.gameDivWidth = gameDiv.offsetWidth;
        this.gameDivHeight = gameDiv.offsetHeight;
        this.ballWidth = this.ball.offsetWidth;
        this.ballHeight = this.ball.offsetHeight;
        this.globalID;
        this.stepSize = 500;
        this.maxPositionX = this.gameDivWidth - this.ballWidth;
        this.maxPositionY = this.gameDivHeight - this.ballHeight;
        this.rightKeyPressed = false;
        this.leftKeyPressed = false;
        this.conditionX = this.STATIONARY;
        this.conditionY = this.STATIONARY;
        this.shiftX = this.gameDivWidth / 2 - this.ballWidth / 2;
        this.movingBaseElement = document.getElementById('movable-div');
        this.movingBaseHeight = this.movingBaseElement.offsetHeight;
        this.movingBaseWidth = this.movingBaseElement.offsetWidth;
        this.shiftY = this.gameDivHeight - this.movingBaseHeight - this.ballHeight;
        this.previousTime = null;
        this.timeDifference;
        this.init();
    }
    init() {
        this.ball.style.backgroundColor = 'red';
        this.ball.style.transform = `translate(${this.shiftX}px, ${this.shiftY}px)`;
    }
    checkCondition() {
        if (this.lastKeyPressed === this.ArrowRight) {
            this.conditionX = this.MOVING_RIGHT;
            this.conditionY = this.MOVING_UP;
        } else if (this.lastKeyPressed === this.ArrowLeft) {
            this.conditionX = this.MOVING_LEFT;
            this.conditionY = this.MOVING_UP;
        }
        this.lastKeyPressed = 'No interference';
    }
    checkEdgeCase() {
        if (this.shiftX > this.maxPositionX) {
            console.log('Right edge');
            this.conditionX = this.MOVING_LEFT;
        } else if (this.shiftX < 0) {
            console.log('Left edge');
            this.conditionX = this.MOVING_RIGHT;
        }
        if (this.shiftY > this.maxPositionY) {
            console.log('Bottom edge');
            this.conditionY = this.MOVING_UP;
        }
        if (this.shiftY > this.maxPositionY - 6) {
            console.log('Game over');
            this.conditionX = this.STATIONARY;
            this.conditionY = this.STATIONARY;
        } else if (this.shiftY < 0) {
            console.log('Top edge');
            this.conditionY = this.MOVING_DOWN;
        }
    }
    calculateShift () {
        if (this.conditionX === this.MOVING_RIGHT) {
            this.shiftX += this.stepSize * this.timeDifference / 1000;
        } else if (this.conditionX === this.MOVING_LEFT) {
            this.shiftX -= this.stepSize * this.timeDifference / 1000;
        }
        if (this.conditionY === this.MOVING_UP) {
            this.shiftY -= this.stepSize * this.timeDifference / 1000;
        } else if (this.conditionY === this.MOVING_DOWN) {
            this.shiftY += this.stepSize * this.timeDifference / 1000;
        }
    }
    makeMove() {
        this.ball.style.transform = `translate(${this.shiftX}px, ${this.shiftY}px)`;
        this.globalID = requestAnimationFrame(this.step.bind(this));
    }
    checkColision() {
        if (this.shiftY + this.ballHeight >= this.gameDivHeight - this.movingBaseHeight) {
            if (this.shiftX + this.ballWidth >= this.movingBasePosition && this.shiftX <= this.movingBasePosition + this.movingBaseWidth) {
                console.log("Good");
                this.conditionY = this.MOVING_UP;
            }
        }
    }
    step(timestamp) {
        if (this.previousTime === null) {
            this.previousTime = timestamp;
            console.log("First frame");
            this.globalID = requestAnimationFrame(this.step.bind(this));
            return;
        }
        this.timeDifference = timestamp - this.previousTime;
        this.previousTime = timestamp;
        this.movingBasePosition = this.movingBaseInstance.getPosition();
        this.checkColision();
        this.checkCondition();
        this.checkEdgeCase();
        this.calculateShift();
        this.makeMove();
        if (this.conditionX === this.STATIONARY && this.conditionY === this.STATIONARY) {
            this.stopAnimation();
        }
        //console.log(`Frame: ${timestamp.toFixed(1)}ms, Delta: ${this.timeDifference.toFixed(1)}ms, ShiftX: ${this.shiftX.toFixed(1)}px, ShiftY: ${this.shiftY.toFixed(1)}px`);
    }
    startAnimation() {
        if (this.globalID) {
            cancelAnimationFrame(this.globalID);
        }
        this.previousTime = null;
        this.globalID = requestAnimationFrame(this.step.bind(this));
    }
    stopAnimation() {
        if (this.globalID) {
            cancelAnimationFrame(this.globalID);
            this.globalID = null;
        }
    }
    handleKeyUp(event) {
        if (event.key === this.ArrowRight || event.key === this.ArrowLeft) {
            if (event.key === this.ArrowRight) {
                this.rightKeyPressed = false;
            } else if (event.key === this.ArrowLeft) {
                this.leftKeyPressed = false;
            }
            //this.previousTime = null;
            console.log("Key up");
        }
    }
    handleKeyDown(event) {
        if (event.key === this.ArrowRight || event.key === this.ArrowLeft) {
            if (this.lastKeyPressed === null) {
                if (event.key === this.ArrowRight) {
                    this.lastKeyPressed = this.ArrowRight;
                    this.rightKeyPressed = true;
                } else if (event.key === this.ArrowLeft) {
                    this.lastKeyPressed = this.ArrowLeft;
                    this.leftKeyPressed = true;
                }
                if (!event.repeat) {
                    this.startAnimation();
                }
            }
        }
    }
}
