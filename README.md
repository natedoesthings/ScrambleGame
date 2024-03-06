How to Run!

1. Download the latest versio of node: https://nodejs.org/en/download/current

2. Clone the repo

3. Open up the terminal and navigate to the backend/ folder

4. Run node with, npm start

5. Open up another terminal and navigate to the frontend/ekreb folder

6. Run the react application with, npm start

7. Enjoy Playing!!


Features:

How to Win: With 10 Attempts, obtain 5 Correct Guesses
Game Over: When you don't reach the 5 correct, or your attempts run out

New Word Button - Provides a New Word, unlimited new words
Attempts go down if you check a guess

The error message 'The game is over please restart for a new game!' is thrown
if the user attempts to guess the word with 0 remaining attempts



Minor Bugs:

- For the backend terminal, when you load the react app for the first time
  it will say there are two words in the backend log, 
  however the correct word is the second one

- The counter variables for correct and incorrect will only reset back to 0 if
  the backend server has been reset. This can easily be done with correctly
  utilizing nodemon, which allows cmd + s on the server.js file to reset the backend server


Reflection: 

I approached this task slowly first starting off with pulling a word from the csv, 
then scrambling that word, to then taking that word from the backend
to the frontend interface. I then upgraded to fetching a word from wordsapi via 
a RapidApi Subscription. However the hardest part was definitely retrieving the
guess and feeding it back into the backend to check it against the randomWord. 
From then on I got creative making a new word button and counter variables for 
correct and incorrect guesses. This challenge taught me a lot, and I can't wait to 
put my new found skills into the real world!




