const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        RalphPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function playSound(audioName){
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
} 

function randomSquare() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    }); 

    let randomNumber = Math.floor(Math.random() * 9); 
    let randomSquare = state.view.squares[randomNumber] 
    randomSquare.classList.add("enemy"); 
    state.values.RalphPosition = randomSquare.id;
} 
 
function addListenerHitBox() {
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.RalphPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.RalphPosition = null;
                playSound("hit");
            }
            else if(square.id !== state.values.RalphPosition){
                state.values.currentLives--;
                state.view.lives.textContent = state.values.currentLives;
                if(state.values.currentLives === 0){
                  clearInterval(state.actions.countDownTimerId);
                  clearInterval(state.actions.timerId);
                  alert(`Game Over! O seu resultado foi ${state.values.result} pontos!`);
                  location.reload();
                }
            }
        })
    })
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert(`Game Over! O tempo acabou! O seu resultado foi ${state.values.result} pontos!`);
        location.reload();
    }
}

function init() {
    addListenerHitBox()
}

init();

