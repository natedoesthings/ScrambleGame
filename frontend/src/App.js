import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [randomWord, setRandomWord] = useState(''); //random scrambled word
  const [userGuess, setUserGuess] = useState(''); //users guess
  const [resultMessage, setResultMessage] = useState(''); //output message
  const [correctGuess, setCorrectGuess] = useState(0); //int amount of correct guesses
  const [incorrectGuess, setIncorrectGuess] = useState(0); //int amount of incorrect guesses
  const [attempts, setAttempts] = useState(10); //total attempts, starts at 10
  

  useEffect(() => {
    // Fetch the random word from your backend server
    fetchRandomWord();
  }, []);

  const fetchRandomWord = () => {
    fetch('/randomScramble') // Assuming your server is running on the same host and port
      .then((response) => response.json())
      .then((data) => {
        setRandomWord(data.scrambled);
      })
      .catch((error) => {
        console.error('Error fetching random word:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to check the user's guess
    fetch('/check-guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guess: userGuess }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResultMessage(data.message);
        if(data.message === 'Correct guess!') {
          setCorrectGuess(data.correct) //update the correct guess
        }
        else {
          setIncorrectGuess(data.incorrect) //update the inccorrect guess
        }
        setUserGuess('');
      })

      setAttempts(attempts - 1)

      
  };


  //Lose Case
  if(incorrectGuess > 5) {

    document.getElementById('gameDecision').innerText = 'YOU LOST.'
    document.getElementById('restart').innerText = 'The game is over please restart for a new game!'

  }

  //Win Case
  if(correctGuess >= 5) {

    document.getElementById('gameDecision').innerText = 'YOU WIN!'
    document.getElementById('restart').innerText = 'Continue Playing to Beat your own Score! or Play Again!'

  }

  //let backend know game is over, also throw an error
  if(attempts < 0) {
    fetch('/game-over', {})
    throw new Error('The game is over please restart for a new game!')
  }


  const handleNewWordClick = () => {
    // Fetch a new random word when the button is clicked
    fetchRandomWord();
    //reset the message for the next word
    setResultMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to the Worlds MOST DIFFICULT Scrambling Game! Guess 5/10 Correctly to Win!</p>
        <h1>Nate's Ekreb:</h1>
          <>
            <h2>The Scrambled Word is: {randomWord}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Your Guess:
                <input
                  type="text"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                />
              </label>
              <button id="hey" type="submit">Check Guess</button>
            </form>
            <p>{resultMessage}</p>
            <button onClick={handleNewWordClick}>New Word</button>
            <p>Correct Guesses:  {correctGuess}</p>
            <p>Incorrect Guesses:  {incorrectGuess}</p>
            <p>Remaining Attempts:  {attempts}</p>
            <h1 id="gameDecision"> </h1>
            <p id="restart"></p>
          </>
      </header>
    </div>
  );
}

export default App;
