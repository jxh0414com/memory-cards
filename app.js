let count = 0;

const cards = document.querySelectorAll('.memory-card');

const start = document.querySelector('#start-text');
const victory = document.querySelector('#victory-text');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    // First time flipped, set flipped to true so the second time click is clicked, "else" is fired
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  // Second flip
  secondCard = this;

  // Check if Matched Card
  checkForMatch();

  checkForWin();
}

function checkForMatch() {
  let isMatch =
    firstCard.dataset.card === secondCard.dataset.card ? true : false;
  // If matched, disable else flip them back
  isMatch ? disableCards() : removeFlips();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  count++;

  resetBoard();
}

function removeFlips() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
})(); // Invoked right away

function checkForWin() {
  count === 10 ? victory.classList.add('visible') : null;
}

start.addEventListener('click', () => {
  start.classList.remove('visible');
});

victory.addEventListener('click', () => {
  victory.classList.remove('visible');

  cards.forEach(card => {
    card.classList.remove('flip');
    resetBoard();

    setTimeout(() => {
      let random = Math.floor(Math.random() * 12);
      card.style.order = random;
      count = 0;
      card.addEventListener('click', flipCard);
    }, 1000);
  });
});

cards.forEach(card => card.addEventListener('click', flipCard));
