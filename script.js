(() => {
  const menu = document.getElementById('menu');
  const btnPvC = document.getElementById('btnPvC');
  const btnOnline = document.getElementById('btnOnline');
  const btnFriendOnline = document.getElementById('btnFriendOnline');
  const btnPvP = document.getElementById('btnPvP');
  const namesInput = document.getElementById('namesInput');
  const p1Input = document.getElementById('player1Name');
  const p2Input = document.getElementById('player2Name');
  const startPvPBtn = document.getElementById('startPvPGame');
  const backToNamesMenuBtn = document.getElementById('backToMenuFromNames');
  const gameArea = document.getElementById('gameArea');
  const board = document.getElementById('board');
  const status = document.getElementById('status');
  const btnRestart = document.getElementById('btnRestart');
  const btnBackMenu = document.getElementById('btnBackMenu');

  let boardState = Array(9).fill('');
  let currentPlayer = 'X';
  let gameActive = false;
  let vsComputer = false;
  let players = { X: 'Player 1', O: 'Player 2' };
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function checkWinner(arr) {
    for (const [a, b, c] of wins) {
      if (arr[a] && arr[a] === arr[b] && arr[b] === arr[c]) return arr[a];
    }
    return null;
  }

  function isDraw() {
    return boardState.every(c => c);
  }

  function updateStatus() {
    if (!gameActive) return;
    const w = checkWinner(boardState);
    if (w) {
      status.textContent = `${players[w]} (${w}) wins! 🎉`;
      gameActive = false;
      return;
    }
    if (isDraw()) {
      status.textContent = `It's a draw! 🤝`;
      gameActive = false;
      return;
    }
    status.textContent = `Turn: ${players[currentPlayer]} (${currentPlayer})`;
  }

  function renderBoard() {
    board.innerHTML = '';
    boardState.forEach((c, i) => {
      const d = document.createElement('div');
      d.className = 'cell';
      d.dataset.idx = i;
      d.textContent = c;
      board.appendChild(d);
    });
  }

  function makeMove(i) {
    if (!gameActive || boardState[i]) return;
    boardState[i] = currentPlayer;
    renderBoard();
    updateStatus();
    if (!gameActive) return;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
    if (vsComputer && currentPlayer === 'O') setTimeout(aiMove, 300);
  }

  function aiMove() {
    let empties = boardState.map((c, i) => c ? null : i).filter(x => x !== null);
    let move = empties[Math.floor(Math.random() * empties.length)];
    boardState[move] = 'O';
    currentPlayer = 'X';
    renderBoard();
    updateStatus();
  }

  board.addEventListener('click', e => {
    if (e.target.classList.contains('cell')) {
      makeMove(+e.target.dataset.idx);
    }
  });

  btnPvC.addEventListener('click', () => {
    vsComputer = true;
    players = { X: 'You', O: 'Computer' };
    openGame();
  });

  btnOnline.addEventListener('click', () => alert('Play with Online Friends coming soon!'));
  btnFriendOnline.addEventListener('click', () => alert('Play with Our Friend coming soon!'));

  btnPvP.addEventListener('click', () => {
    menu.classList.remove('active');
    namesInput.classList.add('active');
    p1Input.value = '';
    p2Input.value = '';
  });

  startPvPBtn.addEventListener('click', () => {
    let n1 = p1Input.value.trim() || 'Player 1',
        n2 = p2Input.value.trim() || 'Player 2';
    if (n1 === n2) {
      alert('Names must differ');
      return;
    }
    players = { X: n1, O: n2 };
    vsComputer = false;
    namesInput.classList.remove('active');
    openGame();
  });

  backToNamesMenuBtn.addEventListener('click', () => {
    namesInput.classList.remove('active');
    menu.classList.add('active');
  });

  btnRestart.addEventListener('click', resetGame);

  btnBackMenu.addEventListener('click', () => {
    gameArea.classList.remove('active');
    menu.classList.add('active');
    resetGame();
  });

  function openGame() {
    menu.classList.remove('active');
    namesInput.classList.remove('active');
    gameArea.classList.add('active');
    resetGame();
  }

  function resetGame() {
    boardState = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    renderBoard();
    updateStatus();
  }

  // Init
  menu.classList.add('active');
})();
