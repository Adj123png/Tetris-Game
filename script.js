const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const grid = 32;
const tetrominoes = [
    // I形
    [
        [1, 1, 1, 1]
    ],
    // J形
    [
        [1, 0, 0],
        [1, 1, 1]
    ],
    // L形
    [
        [0, 0, 1],
        [1, 1, 1]
    ],
    // O形
    [
        [1, 1],
        [1, 1]
    ],
    // S形
    [
        [0, 1, 1],
        [1, 1, 0]
    ],
    // T形
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    // Z形
    [
        [1, 1, 0],
        [0, 1, 1]
    ]
];

const colors = [
    'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'
];

let tetromino = getRandomTetromino();
let position = { x: 3, y: 0 };

function getRandomTetromino() {
    const index = Math.floor(Math.random() * tetrominoes.length);
    return {
        shape: tetrominoes[index],
        color: colors[index]
    };
}

function drawTetromino(tetromino, position) {
    context.fillStyle = tetromino.color;
    tetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillRect((position.x + x) * grid, (position.y + y) * grid, grid, grid);
            }
        });
    });
}

function draw() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawTetromino(tetromino, position);
}

function moveTetromino(dir) {
    position.x += dir;
    if (collides()) {
        position.x -= dir;
    }
}

function dropTetromino() {
    position.y++;
    if (collides()) {
        position.y--;
        // 固定方块并生成新方块
        tetromino = getRandomTetromino();
        position = { x: 3, y: 0 };
    }
}

function collides() {
    // 检查碰撞逻辑
    return false;
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        moveTetromino(-1);
    } else if (event.key === 'ArrowRight') {
        moveTetromino(1);
    } else if (event.key === 'ArrowDown') {
        dropTetromino();
    }
});

function update() {
    draw();
    requestAnimationFrame(update);
}

update();
