// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hair: 'grey',
    eyes: 'blue',
    accessories: ['hat'],
    other: ['smoker']
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hair: 'black',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hair: 'purple',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: ['smoker']
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hair: 'brown',
    eyes: 'blue',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hair: 'white',
    eyes: 'hidden',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hair: 'black',
    eyes: 'blue',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hair: 'grey',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hair: 'black',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'hat'],
    other: []
  },
]


// Global variables
let secret;
let currentQuestion;
let charactersInPlay;

// Draw the game board
const generateBoard = () => {
  board.innerHTML = '';
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `;
  });
};

// Randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)];
  console.log(`Secret Person: ${secret.name}`);
};

const start = () => {
  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS;
  setSecret();
  generateBoard();
  questions.addEventListener('change', selectQuestion);
};

// setting the currentQuestion object when you select something in the dropdown
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label;

  const selectedOption = questions.options[questions.selectedIndex];
  const value = selectedOption.value;

  currentQuestion = {
    category: category,
    value: value
  };
  console.log(currentQuestion);
};
// Modify the checkQuestion function
const checkQuestion = () => {
  console.log('currentQuestion:', currentQuestion);
  const { category, value } = currentQuestion;

  // Check if the category matches the secret character's attribute
  const isMatch = secret[category] === value;

  // Filter the characters based on the match
  filterCharacters(category, isMatch);
};

// Modify the filterCharacters function
const filterCharacters = (category, isMatch) => {
  if (category === 'accessories' && currentQuestion.value === 'glasses') {
    // Handle "glasses" specifically
    if (isMatch) {
      // Check if the secret person has glasses, if yes, keep glasses characters only
      if (secret.accessories.includes('glasses')) {
        charactersInPlay = charactersInPlay.filter((person) => person.accessories.includes('glasses'));
      } else {
        // If secret person doesn't have glasses, remove glasses characters
        charactersInPlay = charactersInPlay.filter((person) => !person.accessories.includes('glasses'));
      }
      console.log(`Secret person has glasses: ${secret.accessories.includes('glasses')}`);
    } else {
      // If the user guesses incorrectly, remove glasses characters
      charactersInPlay = charactersInPlay.filter((person) => !person.accessories.includes('glasses'));
      console.log(`User guessed incorrectly about glasses.`);
    }
  } else if (category === 'other' && currentQuestion.value === 'smoker') {
    // Handle "smoker" specifically
    if (isMatch) {
      // Check if the secret person is a smoker, if yes, keep smoker characters only
      if (secret.other.includes('smoker')) {
        charactersInPlay = charactersInPlay.filter((person) => person.other.includes('smoker'));
      } else {
        // If secret person is not a smoker, remove smoker characters
        charactersInPlay = charactersInPlay.filter((person) => !person.other.includes('smoker'));
      }
      console.log(`Secret person is a smoker: ${secret.other.includes('smoker')}`);
    } else {
      // If the user guesses incorrectly, remove smoker characters
      charactersInPlay = charactersInPlay.filter((person) => !person.other.includes('smoker'));
      console.log(`User guessed incorrectly about smoker.`);
    }
  } else {
    // For other categories or values, proceed as before
    if (isMatch) {
      // If it's a match, keep characters with the same attribute as the secret character
      charactersInPlay = charactersInPlay.filter((person) => person[category] === currentQuestion.value || person[category].includes(currentQuestion.value));
    } else {
      // If it's not a match, keep characters without the same attribute as the secret character
      charactersInPlay = charactersInPlay.filter((person) => person[category] !== currentQuestion.value && !person[category].includes(currentQuestion.value));
    }
  }

  const filteredCharacterNames = charactersInPlay.map((person) => person.name);
  console.log('Filtered characters:', filteredCharacterNames);

  // Invoke a function to redraw the board with the remaining people.
  generateBoard();
};
// when clicking guess, the player first has to confirm that they want to make a guess.
const guess = (personToConfirm) => {
  // store the interaction from the player in a variable.
  // remember the confirm() ?
  const wantsToGuess = confirm(`Are you sure you want to guess that ${personToConfirm} is the secret person?`);
  // If the player wants to guess, invoke the checkMyGuess function.
  if (wantsToGuess) {
    checkMyGuess(personToConfirm);
  }
};

// If you confirm, this function is invoked
const checkMyGuess = (personToCheck) => {
  // 1. Check if the personToCheck is the same as the secret person's name
  if (personToCheck === secret.name) {
    // 2. Set a Message to show in the win or lose section accordingly
    const winMessage = `Congratulations! You guessed it! ${personToCheck} is the secret person.`;
    document.getElementById('win').style.display = 'block';
    document.getElementById('win-message').innerText = winMessage;
  } else {
    // 3. Show the win or lose section

    const loseMessage = `Sorry, ${personToCheck} is not the secret person. You lose.`;
    document.getElementById('lose').style.display = 'block';
    document.getElementById('lose-message').innerText = loseMessage;
  }
   
  // 4. Hide the game board
  document.getElementById('board').style.display = 'none';
}

// Invokes the start function when website is loaded
document.addEventListener('DOMContentLoaded', () => {
  start();
});
// start()

// All the event listeners
restartButton.addEventListener('click', start)

const filterButton = document.getElementById('filter');
filterButton.addEventListener('click', checkQuestion);
