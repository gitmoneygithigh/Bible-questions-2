document.addEventListener('DOMContentLoaded', () => {
    const movableBox = document.getElementById('movable-box');
    const container = document.getElementById('main-container');
    const output = document.getElementById('output');    
    let x = 0;
    const step = 5;    
    let keys = {};
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
        keys[event.key] = true;
        output.textContent = `Key Down: ${event.key} | Position: ${Math.round(x)}px}`;
    });
    document.addEventListener('keyup', (event) => {
        keys[event.key] = false;
    });
    function updatePosition() {
        const continerWidth = container.offsetWidth;
        const boxWidth = movableBox.offsetWidth;
        const maxX = continerWidth - boxWidth;
        const minX = 0;
        if (keys['ArrowLeft']) {
            x -= step;
        }
        if (keys['ArrowRight']) {
            x += step;
        }
        x = Math.max(minX, Math.min(maxX, x));
        movableBox.style.transform = `translateX(${x}%`;
        requestAnimationFrame(updatePosition);
    }
    updatePosition();
});