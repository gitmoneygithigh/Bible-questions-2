document.addEventListener("DOMContentLoaded", function() {
    const gameDiv = document.getElementById('game-div');
    const movingBaseInstance = new MovableBase('movable-div', gameDiv);
    const ball = new Ball('ball-div', gameDiv, movingBaseInstance);

    let positionX = 0;
    let positionY = 0;
    let blocksNeeded = 100;
    let blockCount = 0;
    let blockArray = [];
    let gameDivWidth = gameDiv.offsetWidth;
    let blockWidth = gameDivWidth / 10;;
    let gameDivHeight = gameDiv.offsetHeight;
    let blockHeight = gameDivHeight / 20;
    let removedBlocksCount = 0;
    console.log(ball.shiftX + ' Ball Shift X'); //375
    function removeDiv() {
        blockArray = blockArray.filter(block => {
            if (block.left < ball.shiftX) {
                const element = document.getElementById(block.id);
                console.log('Block with ' + block.left + ' left and ' + block.top + ' top was removed');
                element.remove();
                removedBlocksCount++;
                return false;
            }
            return true;
        });
    }
    function addDiv(howManyDivs) {
        for (let i = 1; i <= howManyDivs; i++) {   
            const wallBlock = document.createElement('div');
            blockCount++;
            wallBlock.id = 'wall-block-' + blockCount;
            wallBlock.style.position = 'absolute';
            wallBlock.style.top = `${positionY}px`;
            wallBlock.style.left = `${positionX}px`;
            blockArray.push({id: wallBlock.id, top: positionY, left: positionX});
            if (positionX < gameDivWidth - blockWidth) {
                positionX +=blockWidth;
            } else {
                positionX = 0;
                positionY += blockHeight;
            }
            wallBlock.style.border = '1px solid black';
            wallBlock.style.width = `${blockWidth}px`;
            wallBlock.style.height = `${blockHeight}px`;
            wallBlock.style.backgroundColor = 'pink';
            gameDiv.appendChild(wallBlock);
        }
    }
    addDiv(blocksNeeded);
    console.log(blockArray);
    removeDiv();
    console.log(removedBlocksCount + ' blocks removed');
    console.log(blockArray);

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