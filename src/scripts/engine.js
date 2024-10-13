// alert("oi");

const state = {

  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
  },

  valeus: {
    timerId: null,
    
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },

  actions: {
    countDownTimerId: setInterval(countDown, 1000),
  }
};

function countDown() {
  state.valeus.curretTime--;
  state.view.timeLeft.textContent = state.valeus.curretTime;

  if (state.valeus.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.valeus.timerId);
    alert('Game Over! O seu resutado foi: ' + state.valeus.result);
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.1;
  audio.play();

}

function randomSquare() {
  state.view.squares.forEach(square => {
    square.classList.remove('enemy');
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add('enemy');
  state.valeus.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.valeus.timerId = setInterval(randomSquare, state.valeus.gameVelocity);
}

function AddListenerHitBox() {
  state.view.squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.valeus.hitPosition) {
        state.valeus.result++;
        state.view.score.textContent = state.valeus.result;
        state.valeus.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  moveEnemy();
  AddListenerHitBox();
}

initialize();
