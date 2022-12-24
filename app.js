/* eslint-disable no-unused-expressions */
/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
const gameBoard = (() => {
  let winComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const container = document.querySelector('#container');
  const fields = container.querySelectorAll('.field');
  const turnBtns = container.querySelectorAll('[data-turn]');
  const resultPane = container.querySelector('.resultPane');
  const resultDisplay = resultPane.querySelector('.result');
  const restart = resultPane.querySelector('.restart');

  let circleTurn = false;
  const resetBoard = () => {
    fields.forEach((field) => {
      field.textContent = '';
    });
  };
  const pickTurn = () => {
    turnBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        turnBtns.item(0).classList.remove('selected');
        turnBtns.item(1).classList.remove('selected');
        if (btn.id === 'x') {
          circleTurn = false;
          btn.classList.add('selected');
          resetBoard();
        } else {
          circleTurn = true;
          btn.classList.add('selected');
          resetBoard();
        }
      });
    });
    return circleTurn;
  };
  const switchTurns = () => {
    circleTurn = !circleTurn;
    return circleTurn;
  };
  const checkWinX = () => winComb.some((comb) => comb.every((index) => fields[index].classList.contains('x')));
  const checkWinO = () => winComb.some((comb) => comb.every((index) => fields[index].classList.contains('o')));
  const result = (turn) => {
    if (!turn) {
      if (checkWinX()) {
        resultDisplay.textContent = 'X Win!';
        resultPane.classList.add('show');
      }
      if (checkWinO()) {
        resultDisplay.textContent = 'O win!';
        resultPane.classList.add('show');
      }
    } else {
      if (checkWinX()) {
        resultDisplay.textContent = 'X win!';
        resultPane.classList.add('show');
      }
      if (checkWinO()) {
        resultDisplay.textContent = 'O lose!';
        resultPane.classList.add('show');
      }
    }
  };
  const play = () => {
    pickTurn();
    fields.forEach((field) => {
      field.addEventListener('click', () => {
        if (circleTurn) {
          if (field.textContent === '') {
            field.textContent = 'O';
            field.classList.add('o');
          }
        } else if (field.textContent === '') {
          field.textContent = 'X';
          field.classList.add('x');
        }
        switchTurns();
        console.log(pickTurn());
        result(pickTurn());
      }, { once: true });
    });
  };
  restart.addEventListener('click', () => {
    resetBoard();
    resultPane.classList.remove('show');
    location.reload();
  });
  return { play };
})();
gameBoard.play();
