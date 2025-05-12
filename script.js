let timeLeft = 0;
    let clicks = 0;
    let timer;
    let gameStarted = false;
    let currentDuration = 0;
    let newHighScore = false;
    let ladderKey = "clickLadders";
    let ladders = JSON.parse(localStorage.getItem(ladderKey)) || { "5": [], "10": [], "30": [] };

    function prepareGame(duration) {
      currentDuration = duration;
      timeLeft = duration;
      clicks = 0;
      gameStarted = false;
      newHighScore = false;
      document.getElementById("name-input").style.display = "none";
      const clickButton = document.getElementById("click-button");
      clickButton.classList.remove("active");
      clickButton.style.display = "inline-block";
      document.getElementById("score").textContent = `Appuyez sur le bouton pour commencer ! Temps : ${timeLeft}s`;
    }

    function startGame() {
      gameStarted = true;
      const clickButton = document.getElementById("click-button");
      clickButton.classList.add("active");
      document.getElementById("score").textContent = `Temps restant : ${timeLeft}s`;
      timer = setInterval(() => {
        timeLeft--;
        document.getElementById("score").textContent = `Temps restant : ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(timer);
          endGame();
        }
      }, 1000);
    }

    function handleClick(clicks) {
      const btn = document.getElementById("click-button");
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 100);
      return clicks + 1;
    }



    function handleClickIfGameStarted() {
      if (!gameStarted) {
        startGame();
      }
      clicks = handleClick(clicks);
    }

    function endGame() {
      document.getElementById("click-button").style.display = "none";
      document.getElementById("click-button").classList.remove("active");
      document.getElementById("score").textContent = `Temps écoulé ! Score : ${clicks} clics.`;
      let list = ladders[currentDuration];
      const worst = list.length < 10 ? 0 : list[list.length - 1].score;
      if (list.length < 10 || clicks > worst) {
        newHighScore = true;
        document.getElementById("score").innerHTML += `<div class='record-animation'>Nouveau record ! Entrez votre nom :</div>`;
        document.getElementById("name-input").style.display = "block";
      }
      updateLadders();
    }

    function submitScore() {
      if (!newHighScore) return;
      const name = document.getElementById("player-name").value.trim();
      if (name === "") return;
      ladders[currentDuration].push({ name, score: clicks });
      ladders[currentDuration].sort((a, b) => b.score - a.score);
      ladders[currentDuration] = ladders[currentDuration].slice(0, 10);
      localStorage.setItem(ladderKey, JSON.stringify(ladders));
      document.getElementById("name-input").style.display = "none";
      document.getElementById("player-name").value = "";
      updateLadders();
    }

    function updateLadders() {
      [5, 10, 30].forEach(duration => {
        const table = document.getElementById(`ladder-${duration}s`);
        table.innerHTML = "<tr><th>Nom</th><th>Score</th></tr>";
        ladders[duration].forEach(entry => {
          const row = document.createElement("tr");
          row.innerHTML = `<td>${entry.name}</td><td>${entry.score}</td>`;
          table.appendChild(row);
        });
      });
    }

    function resetLeaderboard() {
      if (confirm("Êtes-vous sûr de vouloir réinitialiser tous les classements ?")) {
        ladders = { "5": [], "10": [], "30": [] };
        localStorage.removeItem(ladderKey);
        updateLadders();
      }
    }

    // updateLadders();

    module.exports = { prepareGame, startGame, handleClick, handleClickIfGameStarted, endGame, submitScore, updateLadders, resetLeaderboard };