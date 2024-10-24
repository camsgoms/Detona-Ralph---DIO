const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        timeRemaining: 60, // Tempo restante em segundos
        hitPosition: null, // Posição do inimigo
        result: 0, // Placar
        gameVelocity:1000
    },
   
};

function playSound(){
    let audio = new Audio("audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    // Remove a classe "enemy" de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

 

    // Seleciona um quadrado aleatório e adiciona a classe "enemy"
    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    // Define a posição do inimigo como o ID do quadrado
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity); // Move o inimigo a cada 1 segundo
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            // Verifica se o quadrado clicado contém o inimigo e corresponde à posição
            if (square.id === state.values.hitPosition) {
                state.values.result++; // Incrementa o placar
                state.view.score.textContent = state.values.result; // Atualiza o placar na tela
                state.values.hitPosition = null; // Reseta a posição do inimigo
                square.classList.remove("enemy"); // Remove o inimigo do quadrado clicado
                playSound();
            }
        });
    });
}

function startTimer() {
    const timer = setInterval(() => {
        state.values.timeRemaining--; // Diminui o tempo restante
        state.view.timeLeft.textContent = state.values.timeRemaining; // Atualiza o tempo na tela

        if (state.values.timeRemaining <= 0) {
            clearInterval(timer); // Para o cronômetro
            clearInterval(state.values.timerId); // Para o movimento do inimigo
            alert(`Game Over!\n\nO seu resultado foi: ${state.values.result}`); // Exibe mensagem de fim de jogo
        }
    }, 1000); // Atualiza o tempo a cada 1 segundo
}

function initialize() {
    randomSquare(); // Seleciona um quadrado aleatório
    addListenerHitBox(); // Adiciona os listeners de clique
    moveEnemy(); // Começa a mover o inimigo
    startTimer(); // Inicia o cronômetro do jogo
}

initialize();
