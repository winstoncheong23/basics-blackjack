//BlackJack logic
//User draws 2 cards
//User gets to choose if they want to draw more cards
//Dealer draws 2 cards
//Logic for dealer if understand a certain amt draw more cards

//Compare cards
//Card logic (what are special cases)
//If anyone burst (over 21), its auto win for the other
//Logic where Ace can be 1 or 11
// Compare cards

//Announce winner

//function to draw cards
//gameModes
//function jsut for the dealer
//function to compare cards

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//Function to create a cardDeck array to store deck (J,Q,K = 10) (HAVE NO CHANGED ACE VALUES)
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    //var rankCounter = 1;
    var nameCounter = 1;
    var rankCounter = 1;
    //while (rankCounter <= 13) {
    while (nameCounter <= 13) {
      // By default, the card name is the same as rankCounter

      var cardName = nameCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        rankCounter = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        rankCounter = 10;
      } else if (cardName == 13) {
        cardName = "king";
        rankCounter = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);
      //Increment nameCounter
      nameCounter += 1;
      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

var shuffledDeck = shuffleCards(makeDeck());

//draw function
var userHand = [];
var computerHand = [];
var drawCounter = 0;
var bothDraw = function () {
  while (drawCounter < 2) {
    userHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());
    drawCounter += 1;
  }
  drawCounter = 0;
};

//User's hit function
var userHitFunction = function () {
  userHand.push(shuffledDeck.pop());
};

//Computer's hit function
var computerHitFunction = function () {
  var card = shuffledDeck.pop();
  computerHand.push(card);
};

var userTotal = 0;
//sum User hand function
var sumUserHand = function () {
  var sumUserHandCounter = 0;
  userTotal = 0;
  while (sumUserHandCounter < userHand.length) {
    userTotal += userHand[sumUserHandCounter].rank;
    //console.log(userTotal);
    sumUserHandCounter += 1;
  }
  return Number(userTotal);
};

//sum Computer hand function
var sumComputerHandCounter = 0;
var computerTotal = 0;
var sumComputerHand = function () {
  while (sumComputerHandCounter < computerHand.length) {
    computerTotal += computerHand[sumComputerHandCounter].rank;
    //console.log(ComputerTotal);
    sumComputerHandCounter += 1;
  }
  //dont need message for self?
  return Number(computerTotal);
};

//Hand Message
var hitOrStandMessage = `<br><br>Type "hit" or "stand".`;
var userHandMessageFunction = function () {
  var handMessageCounter = 0;
  var handMessage = `Your hand:`;
  while (handMessageCounter < userHand.length) {
    handMessage += `<br><br>${userHand[handMessageCounter].name} of ${userHand[handMessageCounter].suit}`;

    handMessageCounter += 1;
  }
  var userSumMessage = `<br><br>Your total hand value is ${sumUserHand()}.`;
  handMessage += userSumMessage;
  return handMessage;
};

var computerHandMessageFunction = function () {
  var computerMessageCounter = 0;
  var computerHandMessage = `<br><br>Computer's hand:`;
  while (computerMessageCounter < computerHand.length) {
    computerHandMessage += `<br><br>${computerHand[computerMessageCounter].name} of ${computerHand[computerMessageCounter].suit}`;

    computerMessageCounter += 1;
  }
  var computerSumMessage = `<br><br>Computer's total hand value is ${sumComputerHand()}.`;
  computerHandMessage += computerSumMessage + hitOrStandMessage;
  return computerHandMessage;
};
var bustMessageFunction = function () {
  var bustMessageCounter = 0;
  var bustMessage = `<br><br>Computer's hand:`;
  while (bustMessageCounter < computerHand.length) {
    bustMessage += `<br><br>${computerHand[bustMessageCounter].name} of ${computerHand[bustMessageCounter].suit}`;

    bustMessageCounter += 1;
  }
  var computerSumMessage = `<br><br>Computer's total hand value is ${sumComputerHand()}.`;

  bustMessage += computerSumMessage + `<br><br>Click submit to try again.`;
  return bustMessage;
};

var myOutputValue = ``;

//Winner Function

var checkWinner = function () {
  //if ((gameMode == `WINNER_MODE`)) {
  if (sumUserHand() > sumComputerHand()) {
    console.log(sumUserHand());
    console.log(sumComputerHand());
    return `you win`;
  } else if (sumUserHand() < sumComputerHand) {
    console.log(sumUserHand());
    console.log(sumComputerHand());
    return `you lose`;
  }
};

var gameMode = `DRAW_MODE`;

var main = function (input) {
  //user and computer draw 2 cards
  if (gameMode == `DRAW_MODE`) {
    bothDraw();

    console.log(userHand);
    console.log(computerHand);

    //display user hand (no sum)

    //gameMode = `USER_CHOOSE_MODE`;

    //return handMessageFunction();
    //gameMode = `WINNER_MODE`;
    gameMode = `USER_CHOOSE_MODE`;
    console.log(gameMode);
    return userHandMessageFunction() + computerHandMessageFunction();
  }
  var myOutputValue = ``;

  //user choose if  or stand
  if (gameMode == `USER_CHOOSE_MODE` && input == `hit`) {
    userHitFunction();
    myOutputValue = userHandMessageFunction() + computerHandMessageFunction();

    if (userTotal > 21) {
      console.log(`you busted`);
      myOutputValue = `YOU BUSTED.<br><br> ${userHandMessageFunction()} ${bustMessageFunction()}`;
      userHand = [];
      computerHand = [];
      userTotal = 0;
      gameMode = `DRAW_MODE`;
    }

    return myOutputValue;
  }

  if (gameMode == `USER_CHOOSE_MODE` && input == `stand`) {
    gameMode = `DEALER_MODE`;
  }

  if (gameMode == `DEALER_MODE`) {
    while (sumComputerHand() < 17) {
      computerHitFunction();
    }
    if (computerTotal > 21) {
      return `Computer busted, you win.`;
    }
    console.log(`user total` + sumUserHand());
    console.log(`computer total` + sumComputerHand());
    gameMode = `WINNER_MODE`;
  }
  if (gameMode == `WINNER_MODE`) {
    if (sumUserHand() > sumComputerHand()) {
      console.log(sumUserHand());
      console.log(sumComputerHand());
      return `YOU WIN! ${userHandMessageFunction()}${computerHandMessageFunction()}`;
    } else {
      console.log(sumUserHand());
      console.log(sumComputerHand());
      return `YOU LOSE! ${userHandMessageFunction()}${computerHandMessageFunction()} `;
    }
  }
};

//dealer draw
//compare
//announce winner
