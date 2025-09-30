class MovableBase {
    constructor(elementID, gameDiv) {
        this.STATIONARY = "STATIONARY";
        this.ArrowRight = "ArrowRight";
        this.MOVING_RIGHT = "MOVING_RIGHT";
        this.ArrowLeft = "ArrowLeft";
        this.MOVING_LEFT = "MOVING_LEFT";
        this.element = document.getElementById(elementID);
        this.gameDivWidth = gameDiv.offsetWidth;
        this.movingBaseWidth = this.element.offsetWidth;
        this.gameDivHeight = gameDiv.offsetHeight;
        this.globalID;
        this.stepSize = 200;
        this.maxPosition = this.gameDivWidth - this.movingBaseWidth;
        this.rightKeyPressed = false;
        this.leftKeyPressed = false;
        this.lastKeyPressed = "No info";
        this.condition = this.STATIONARY;
        this.shift = 350;
        this.previousTime = null;
        this.timeDifference;
        this.init(); 
    }
    init() {
        this.element.style.backgroundColor = 'grey';
        this.element.style.transform = `translateX(${this.shift}px)`;
    }
    getPosition() {
        return this.shift;
    }
    checkEdgeCase() {
        if (this.shift >= this.maxPosition) {
            this.shift = this.maxPosition;
        } else if (this.shift <= 0) {
            this.shift = 0;
        }
    }
    checkCondition() {
        if (!this.rightKeyPressed && !this.leftKeyPressed) {
            this.condition = this.STATIONARY;
        }
        if (this.rightKeyPressed && this.leftKeyPressed) {
            if (this.lastKeyPressed === this.ArrowRight) {
                this.condition = this.MOVING_RIGHT;
            } else if (this.lastKeyPressed === this.ArrowLeft) {
                this.condition = this.MOVING_LEFT;
            }
        }
        if (this.rightKeyPressed && !this.leftKeyPressed) {
                this.condition = this.MOVING_RIGHT;
        }
        if (this.leftKeyPressed && !this.rightKeyPressed) {
            this.condition = this.MOVING_LEFT;
        }
    }
    calculateShift () {
        if (this.condition === this.MOVING_RIGHT) {
            this.shift += this.stepSize * this.timeDifference / 1000;
        } else if (this.condition === this.MOVING_LEFT) {
            this.shift -= this.stepSize * this.timeDifference / 1000;
        }
        if (this.shift > this.maxPosition) {
            this.shift = this.maxPosition;
        } else if (this.shift < 0) {
            this.shift = 0;
        }
    }
    makeMove() {
        this.element.style.transform = `translateX(${this.shift}px)`;
        if (this.condition === this.STATIONARY) {
            return;
        } else if (this.condition === this.MOVING_RIGHT || this.condition === this.MOVING_LEFT) {
            this.globalID = requestAnimationFrame(this.step.bind(this));
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
        this.checkCondition();
        this.calculateShift();
        this.makeMove();
        console.log(`Frame: ${timestamp.toFixed(1)}ms, Delta: ${this.timeDifference.toFixed(1)}ms, Shift: ${this.shift.toFixed(1)}px`);
        this.checkEdgeCase();
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
            this.ballIsMoving = true;
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