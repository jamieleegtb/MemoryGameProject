/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-anchor', 'fa-anchor',
             'fa-bolt', 'fa-bolt',
             'fa-cube', 'fa-cube',
             'fa-leaf', 'fa-leaf',
             'fa-bicycle', 'fa-bicycle',
             'fa-bomb', 'fa-bomb'
            ];

function generateCard(card){
  return `<li class="card animated" data-card="${card}"> <i class="fa ${card}"> </i> </li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 let sec = 0;
 let min = 0;
 let timer;

 function startTimer() {
   timer = setInterval(insertTime, 1000);
 }

 function stopTimer() {
   clearInterval(timer);
   sec = 0;
   min = 0;
 }

 function insertTime() {
   sec++;

   if (sec < 10) {
     sec = `0${sec}`;
   }

   if (sec >= 60) {
     min++;
     sec = "00";
   }

   // display time
   document.querySelector('#timer').innerHTML = "0" + min + ":" + sec;
 }

function initGame(){
  const deck = document.querySelector('.deck');
  const cardHTML = shuffle(cards).map(function(card){
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
}

//Initialize game
initGame();

const allCards = document.querySelectorAll('.card');
//Empty array for open cards
let openCards = [];
//Move counter
let moves = 0;
const moveCounter = document.querySelector('.moves');
moveCounter.innerText = moves;
//Stars
const stars = document.querySelectorAll('.fa-star');
//Counter for matched cards
let matchCounter = 0;
//Win & Lose Screen
const screen = document.getElementById('screen');
const win = document.getElementById('win');
const lose = document.getElementById('lose');


$(document).ready(function(){
  //TODO: Reset page.
  $('.restart').click(function(){
      location.reload();
  });
});

function addMessage() {
  const message = document.getElementById('message');
  message.innerText = `You finished the game in ${moves} moves.`;
}

allCards.forEach(function(card){
    //With eventlistener 'click' function added to all cards
    card.addEventListener('click', function(e){
      //Checking if the card has 'open' & 'show' class
      if ((!card.classList.contains('open') || !card.classList.contains('show')) && !card.classList.contains('match')){
        openCards.push(card);
        //Adds 'open' & 'show' classes to cards after click
        card.classList.add('open', 'show', 'flipInY');
        card.classList.remove('shake')
        //Start timer
        if (moves === 0) {
          startTimer();
        } if (moves === 1) {
          stars[0].remove();
        } else if (moves === 2) {
          stars[1].remove();
        } else if (moves === 3) {
          stars[2].remove();
          stopTimer();
          screen.style.display = "block";
          lose.style.display = "block";
          addMessage();
        }

        if (openCards.length == 2){
          //Check if cards match
          if (openCards[0].dataset.card == openCards[1].dataset.card){
              openCards[0].classList.add('match', 'open', 'show', 'flipInY');
              openCards[1].classList.add('match', 'open', 'show', 'flipInY');
              matchCounter++;
              openCards = [];
              if (matchCounter === 8) {
                stopTimer();
                screen.style.display = "block";
                win.style.display = "block";
                addMessage();
              }
          } else {
              //'open' & 'show' classes will be deleted from cards after 1 second
              //If cards don't match - go away
              setTimeout(function(){
                openCards.forEach(function(card){
                  card.classList.remove('open', 'show', 'flipInY');
                  card.classList.add('shake');
                });
                //openCards array empitied out after two cards opened
                openCards = [];
              }, 1000);
            }
            moves += 1;
            moveCounter.innerText = moves;
        }
      }
    });
});
