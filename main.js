document.addEventListener("DOMContentLoaded", function() {
    const gameDiv = document.getElementById('game-div');
    const movingBase = new MovableBase('movable-div', gameDiv);
    const ball = new Ball('ball-div', gameDiv);
    document.addEventListener('keyup', function(event) {
        movingBase.handleKeyUp(event);
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            movingBase.handleKeyDown(event);
            ball.handleKeyDown(event);
            document.getElementById('bible-container').style.visibility = 'hidden';
            gameDiv.style.borderLeft = '3px solid black';
            gameDiv.style.borderRight = '3px solid black';
        }
    });
});