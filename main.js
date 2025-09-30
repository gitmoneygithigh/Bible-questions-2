document.addEventListener("DOMContentLoaded", function() {
    const gameDiv = document.getElementById('game-div');
    const movingBaseInstance = new MovableBase('movable-div', gameDiv);
    const ball = new Ball('ball-div', gameDiv, movingBaseInstance);
    document.addEventListener('keyup', function(event) {
        movingBaseInstance.handleKeyUp(event);
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            movingBaseInstance.handleKeyDown(event);
            ball.handleKeyDown(event);
            document.getElementById('bible-container').style.visibility = 'hidden';
            gameDiv.style.borderLeft = '3px solid black';
            gameDiv.style.borderRight = '3px solid black';
        }
    });
});