//function for main page
function checkPalindrome() {
    var text = document.getElementById("palindrome").value.toLowerCase().replace(/\s/g,'').split('');
    for (var i = 0; i < text.length; i++) {
        if (text[i] != text[text.length-i-1]) {
            return console.log('false');
        }
    }
    return console.log('true');
}

// code for tic-tac-toe app
var player1 = "o";
var player2 = "x";
var playerTurn = 1;
var status = "playing";
var sqCounter = 0;
var square = document.getElementById('board').addEventListener('click', setTarget);
var reset = document.getElementById('btnReset').addEventListener('click', resetGame);
var btnReset = document.getElementById('btnReset');
var board  = Array.from(document.querySelectorAll('#board>li'));
var squareValues = board.map(function(item) {return item.textContent;});
var gameLog = document.getElementById('gameLog');

function setTarget(event) {
    var square = document.getElementById(event.target.id);
    if (status === 'playing') {
        if (square.textContent === "-") {
            if (playerTurn === 1) {
                square.textContent = player1;
                updateBoard(player1, square);
                sqCounter++;
                console.log(sqCounter);
                isWinner(squareValues, player1);
                playerTurn = 2;
            } else if (playerTurn === 2) {
                square.textContent = player2;
                updateBoard(player2, square);
                sqCounter++;
                console.log(sqCounter);
                isWinner(squareValues, player2);
                playerTurn = 1;
            }
        } else {
            alert('Square already taken. Please choose an empty square.');
        }
    } else {
        alert('Game Over. Click the "Reset Game" button to play again.');
    }
}

function updateBoard(player, pos) {
    board  = Array.from(document.querySelectorAll('#board>li'));
    squareValues = board.map(function(item) {return item.textContent;});
    if (player === player1) {
        var newHTML = '<li>Player 1: placed an "O" in square ' + pos.id + '.</li>';
        gameLog.insertAdjacentHTML('beforeend', newHTML);
    } else {
        var newHTML = '<li>Player 2: placed an "X" in square ' + pos.id + '.</li>';
        gameLog.insertAdjacentHTML('beforeend', newHTML);
    }
}

function isWinner(arr, player) {
    if (arr[0] === player && arr[1] === player && arr[2] === player || 
        arr[3] === player && arr[4] === player && arr[5] === player || 
        arr[6] === player && arr[7] === player && arr[8] === player || 
        arr[0] === player && arr[3] === player && arr[6] === player || 
        arr[1] === player && arr[4] === player && arr[7] === player || 
        arr[2] === player && arr[5] === player && arr[8] === player || 
        arr[0] === player && arr[4] === player && arr[8] === player || 
        arr[2] === player && arr[4] === player && arr[6] === player) {
        
        if (player === "o") {
            setTimeout(function () {
                var newHTML = '<li class="winner">*** TIC-TAC-TOE THREE IN A ROW! ***<br><strong>PLAYER 1</strong> HAS WON THE GAME!</li>';
                gameLog.insertAdjacentHTML('beforeend', newHTML);
            }, 100);
        } else {
            setTimeout(function () {
                var newHTML = '<li class="winner">*** TIC-TAC-TOE THREE IN A ROW! ***<br><strong>PLAYER 2</strong> HAS WON THE GAME!</li>';
                gameLog.insertAdjacentHTML('beforeend', newHTML);
            }, 100);
        } 
        status = "gameover";
        btnReset.className = 'reset gameover';
        
    } else if (sqCounter === 9) {
        setTimeout(function () {
            var newHTML = '<li class="winner">*** TIE GAME! TRY AGAIN ***';
            gameLog.insertAdjacentHTML('beforeend', newHTML);
        }, 100);
        status = "gameover";
        btnReset.className = 'reset gameover';
    }
}

function resetGame() {
    for (var i = 0; i < board.length; i++) {
        board[i].textContent = "-";
    }
    playerTurn = 1;
    status = "playing";
    sqCounter = 0;
    btnReset.className = 'reset';
}