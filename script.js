const options = ["gunting", "kertas", "batu"];
let scoreboard = [];
let userChoice;
let userScore = 0;
let compScore = 0;
let gamesPlayed = 0;
const userScoreText = document.getElementById('userScore');
const compScoreText = document.getElementById('compScore');
const resultText = document.getElementById('result');
const loadText = document.getElementById('loading');
const scoreTable = document.getElementById('scoretable');
const scoreSection = document.getElementById('scoresection');
const filterScore = document.getElementById('filter-score');
const choiceBtn = document.querySelectorAll('.choice-btn');

const showScore = () => {
  userScoreText.innerText = `Skor User: ${userScore}`;
  compScoreText.innerText = `Skor Komputer: ${compScore}`;
}

showScore();

const resetBtn = document.getElementById('reset').addEventListener('click', function(){
    userScore = 0;
    compScore = 0;
    scoreboard = [];
    gamesPlayed = 0;

    choiceBtn.forEach(b => b.disabled = false);
    resultText.innerText = '';
    loadText.innerText = '';
    scoreSection.classList.add('d-none');
    showScore();
});

const value = choiceBtn.forEach(button => {
    button.addEventListener('click', function(){
        resultText.innerText = '';
        const userChoice = parseInt(this.value);
        setTimeout(function(){
            loadText.innerText = '';
            decideWinner(userChoice);
            // if(gamesPlayed === 5){
            //   freezeGame();
            // };
            setTimeout(function(){
              if(gamesPlayed === 5){
                freezeGame();
              }else{
                const continuePlay = confirm('Masih mau main?');

                if(!continuePlay){
                    freezeGame();
                };
              }
            }, 1000);
        }, 2000);
        loadText.innerText = 'Komputer sedang berpikir...';
    })
});

filterScore.onchange = function(){
  const filtered = searchResult(this.value);

  if(this.value === ''){
    showScoreBoard(scoreboard);
  }else{
    showScoreBoard(filtered);
  }
};

function decideWinner(userChoice) {
  const compChoice = Math.floor(Math.random() * options.length);
  let result = '';

  if (compChoice === userChoice) {
    result = 'Seri';
  } else if (options[userChoice] === "gunting") {
    if (options[compChoice] === "kertas") {
      result = 'Menang';
      userScore++;
    } else {
        result = 'Kalah';
        compScore++;
    }
  } else if (options[userChoice] === "kertas") {
    if (options[compChoice] === "batu") {
        result = 'Menang';
        userScore++;
    } else {
        result = 'Kalah';
        compScore++;
    }
  } else if (options[userChoice] === "batu") {
    if (options[compChoice] === "gunting") {
        result = 'Menang';
        userScore++;
    } else {
        result = 'Kalah';
        compScore++;
    }
  }

  const history = new Object({
    user: options[userChoice],
    komputer: options[compChoice],
    hasil: result,
    skor_user: userScore,
    skor_komp: compScore
  });

  scoreboard.push(history);
  gamesPlayed++;

  resultText.innerText = `Komputer pilih ${options[compChoice]}, kamu pilih ${options[userChoice]}, ${(result === 'Seri') ? '' : 'kamu'} ${result.toLowerCase()}!`;

  showScore();
}

function searchResult(query){
  const hasil = scoreboard.filter((x) => x.hasil === query);
  return hasil;
}

function showScoreBoard(scoreboard){
  const tbody = scoreTable.querySelector('tbody');
  tbody.innerHTML = '';
  
  scoreboard.forEach((score, index) => {
    tbody.insertAdjacentHTML('beforeend', 
      `<tr>
          <th scope="row">${index + 1}</th>
            <td>${score.user}</td>
            <td>${score.komputer}</td>
            <td>${score.hasil}</td>
            <td>${score.skor_user}</td>
            <td>${score.skor_komp}</td>
      </tr>`
    )
  });
}

function freezeGame(){
  showScoreBoard(scoreboard);
  scoreSection.classList.remove('d-none');
  choiceBtn.forEach(b => b.disabled = true);
  loadText.innerText = 'Terimakasih telah bermain!';
  resultText.innerText = '';
}