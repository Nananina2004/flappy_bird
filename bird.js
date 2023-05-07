let score = 0;
let max_score = 0;

const flapSound = {
    flapAudio: new Audio('flappy-bird-assets-master/audio/wing.wav'),
    play: function() {
        this.flapAudio.play();
    }
};

const dieSound = {
    dieAudio: new Audio('flappy-bird-assets-master/audio/hit.wav'),
    play: function() {
        this.dieAudio.play();
    }
};

const bird = {
    x: 50,
    y: 50,
    radius: 20,
    gravity: 0.5,
    velocity: 0,
    jump: 10,
    flap: function() {
        this.velocity = -this.jump;
        flapSound.play();
    },
};

let game_state = "Start";
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && game_state === "Start") {
        start_game();
    } else if (game_state === "Play") {
        bird.flap();
    }
});

function start_game() {
    game_state = "Play";
    const tapText = document.querySelector('.tap')
    tapText.style.display = 'none';
    generateColumn();
    update();
}

function update() {
    if (game_state === "Play") {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;
        bird.y = Math.min(bird.y, 550);

        if (bird.y >= 550) {
            gameOver();
            dieSound.play();
            bird.y = 550;
        }

        const birdElement = document.getElementById('bird');
        birdElement.style.top = bird.y + 'px';
    }

    requestAnimationFrame(update);
}

function generateColumn() {
    const gameArea = document.getElementById('game-area');

    const columnGap = 200;
    const minHeight = 50;
    const maxHeight = gameArea.clientHeight - columnGap - 2 * minHeight;

    const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    const columnTop = document.createElement('div');
    columnTop.classList.add('column', 'column-top');
    columnTop.style.height = randomHeight + 'px';

    const columnBottom = document.createElement('div');
    columnBottom.classList.add('column', 'column-bottom');
    columnBottom.style.height = gameArea.clientHeight - randomHeight - columnGap + 'px';

    gameArea.appendChild(columnTop);
    gameArea.appendChild(columnBottom);
}

function gameOver() {
    game_state = "GameOver";
    const go = document.querySelector('.game_over');
    go.style.display = 'block'

    const sc = document.querySelector('.score');
    const msc = document.querySelector('.max_score');
    sc.textContent = score + '';
    msc.textContent = max_score + '';
}



