let cards = ['fa-diamond', 'fa-diamond',
                'fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-anchor', 'fa-anchor',
                'fa-bolt', 'fa-bolt',
                'fa-cube',  'fa-cube',
                'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle',
                'fa-bomb', 'fa-bomb'
              ];

let openCards = [];
let match = [];
let moves = 0;
let starCount = 3;
let min,sec,ms, malt, salt,count;

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

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
};

// METHOD FOR STARTING THE GAME AND SHUFFLING THE CARDS.
function initGame() {
  let deck = document.querySelector('.deck');

   let cardHTML = shuffle(cards).map(function(card) {
     return generateCard(card);
   });

   deck.innerHTML = cardHTML.join('');
};

initGame();


// SELECTION ALL CARDS THAT MATCH
let allCards = document.querySelectorAll('.card');

allCards.forEach(function(card) {
  card.addEventListener('click', function() {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      card.classList.add('open', 'show', 'stop-click');


      if(openCards.length == 2) {
        if(openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[0].classList.add('open');
          openCards[0].classList.add('show');

          openCards[1].classList.add('match');
          openCards[1].classList.add('open');
          openCards[1].classList.add('show');

          match.push(openCards[0]);
          match.push(openCards[1]);

          openCards = [];
        } else {
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show', 'stop-click');
          });

          openCards = [];
        }, 1000);
      }

      // MODAL WILL APPEAR WHEN THE GAME IS WON
      if(match.length === 16) {
        stopwatch.stop();
        openModal();
        }
      }
    }
  });
});


// MOVE FUCTIONALITY
const stars = document.querySelectorAll('.fa-star')
const moveCount = document.querySelector('.moves');
let cardCount = document.querySelector('.deck');
let gameCards = cardCount.querySelectorAll('li');


moveCount.textContent = moves;

  gameCards.forEach( card => {
    card.addEventListener('click', function disable () {

    // DISABLE A CLICK COUNT ON A CARD THAT IS OPEN OR THAT ALREADY HAS A MATCH
    if(card.classList.contains('match')) {
        card.removeEventListener('click', disable);
    }
      moveCount.textContent = moves += 1;

      if(moves === 1 && moves < 30 ) {
        stopwatch.start();

        starCount = 3
      }
       else if(moves === 31 && moves < 45) {
        stars[2].classList.add('fa-star-o');
        stars[2].classList.remove('fa-star');

        starCount = 2;

      } else if (moves === 46 && moves < 55 ) {
        stars[1].classList.add('fa-star-o');
        stars[1].classList.remove('fa-star');

        starCount = 1;
      }
    })
  });

// TIMER
const stopwatch = {
  start: function(){
    ms = 0;
    sec = 0;
    min = 0;
    count = setInterval(function(){
      if(ms == 100){
        ms = 0;
        if(sec == 60){
          sec = 0;
          min++;
        }
        else{
          sec++;
        }
      }
      else{
        ms++;
      }

      malt = stopwatch.pad(min);
      salt = stopwatch.pad(sec);
      stopwatch.update(malt + ":" + salt);
    }, 10);
    },

    stop: function(){
  clearInterval(count);
},

  update: function(txt){
     const temp = document.getElementById("timer");
  temp.firstChild.nodeValue = txt;
  },

  pad: function(time){
    let temp;
    if(time < 10){
      temp = "0" + time;
    }
    else{
      temp = time;
    }
    return temp;
  }
}


// MODAL
const modal = document.getElementById('simpleModal');
const closeBtn = document.querySelector('.closeBtn');
const modalMsg = document.querySelector('.close');


window.addEventListener('click', outsideClick);
closeBtn.addEventListener('click', closeModal);

function openModal() {
  const temp = document.getElementById("timer");
  let clock = temp.textContent;

  modal.style.display = 'block';
  modalMsg.innerHTML = `<div>
                          <h3>CONGRATULATIONS</h3>
                          <p>You matched the cards in ${moves} moves and a time of ${clock} !</p>
                          <p>Star Rating: ${starCount} !</p>
                        </div>`
}


function closeModal() {
  modal.style.display = 'none';
};

function outsideClick(e) {
  if(e.target === modal) {
  modal.style.display = 'none';
  }
};

// NEW GAME METHOD || RESTART METHOD
const newGame = document.querySelector('.restart');
const modalNewGame = document.getElementById('modal-restart');

newGame.addEventListener('click', anotherGame);
modalNewGame.addEventListener('click', anotherGame);

function anotherGame() {
  location.reload();
};
