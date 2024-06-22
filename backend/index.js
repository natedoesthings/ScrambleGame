const express = require('express');

const app = express();
const port = 4000;

app.use(express.json());

//wordsapi from rapidAPI
async function getRandomWord() {
  const url = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e7bb700c82mshe93917d92080512p197a51jsnd1765533372c',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };

  
    const response = await fetch(url, options); //fetch from url
    const result = await response.json(); //capture json data
    return result.word; // return the random word
   
}




function scrambleWord(word) {
  // Convert the word to an array of characters
  const characters = word.split('');

  // Fisher-Yates shuffle algorithm to shuffle the characters
  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }

  // Join the shuffled characters back into a word
  const scrambledWord = characters.join('');
  return scrambledWord;
}




//random word variable to allow other methods to access it
let randomWord;

//scramble path
app.get('/randomScramble', async (req, res) => {
    getRandomWord()
    .then(random => {
      randomWord = random
      res.json({scrambled: scrambleWord(random)});
      console.log('The word is ' + random + '\n')
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
});


//checking the guess path that handles the output and 
//results of correct/incorrect guesses
let correctGuess = 0, incorrectGuess = 0;
app.post('/check-guess', (req, res) => {

    //users guess from submitted form
    const userGuess = req.body.guess;

    if (userGuess === randomWord) {
      correctGuess++
      res.json({ message: 'Correct guess!', 
                 correct: correctGuess, 
                 incorrect: incorrectGuess});
        } else {
          incorrectGuess++
          res.json({ message: 'Incorrect Guess. The Correct word is ' + randomWord, 
                     correct: correctGuess, 
                     incorrect: incorrectGuess});
    }
    
    console.log('CorrectGuesses: ' + correctGuess + '\n' +
                'IncorrectGuesses: ' + incorrectGuess + '\n')
});


//hint to the backend the game is over
app.get('/game-over', (req,res) => {
  console.log('The game is over please restart the server.js file for a new game!')
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
