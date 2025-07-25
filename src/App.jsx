import { useState } from 'react';
import Header from './components/Header';
import '../src/languajes';
import { getFarewellText, randomWords } from '../src/utils';

import { languages } from '../src/languajes';
import Confetti from 'react-confetti';

function App() {
  // States Values
  const [currentWord, setCurrentWord] = useState(() => randomWords());
  const [tappedLetter, setTappedLetter] = useState([]);

  // Static Values
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  // Derived values
  /* let counter = 0;
  tappedLetter.map((letter) => {
    currentWord.includes(letter) ? counter : counter++;
  });
  console.log(counter); */
  const numGessesLeft = languages.length - 1;
  const wrongGuessCounter = tappedLetter.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const lastGuessedLetter = tappedLetter[tappedLetter.length - 1];
  const isGuessedLetterCorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const isGameWin = currentWord
    .split('')
    .every((letter) => tappedLetter.includes(letter));
  const isGameLost = wrongGuessCounter >= numGessesLeft;

  const isGameOver = isGameLost || isGameWin;

  const letterElement = currentWord.split('').map((letter, index) => {
    const revealAllLetters = isGameLost ? 'reveal-letters' : '';
    return (
      <span
        className={`letters ${revealAllLetters}`}
        key={index}>
        {tappedLetter.includes(letter) || isGameLost
          ? letter.toUpperCase()
          : ''}
      </span>
    );
  });

  const languagesElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCounter;
    return (
      <span
        className={`chip ${isLanguageLost ? 'lost' : ''}`}
        key={lang.name}
        style={{ backgroundColor: lang.backgroundColor, color: lang.color }}>
        {lang.name}
      </span>
    );
  });

  function keepLetter(letter) {
    setTappedLetter((prevArray) =>
      prevArray.includes(letter) ? prevArray : [...prevArray, letter]
    );
  }

  const keyboard = alphabet.split('').map((letter) => {
    const isTapped = tappedLetter.includes(letter);
    const isInWord = currentWord.toUpperCase().includes(letter.toUpperCase());
    let buttonClass = '';
    if (isTapped) {
      buttonClass = isInWord ? 'letter-exist' : 'no-letter-exist';
    }
    if (isGameOver) {
      buttonClass = '';
    }

    return (
      <button
        className={buttonClass}
        value={letter}
        onClick={() => keepLetter(letter)}
        key={letter}
        disabled={isGameOver || tappedLetter.includes(letter)}
        aria-disabled={tappedLetter.includes(letter)}
        aria-label={`letter ${letter}`}>
        {letter.toUpperCase()}
      </button>
    );
  });
  const noGuessedLetter = !isGameOver && isGuessedLetterCorrect && (
    <section className='status-container farewell'>
      <p>{getFarewellText(languages[wrongGuessCounter - 1].name)}</p>
    </section>
  );
  const youWinElement = isGameWin && (
    <section className='status-container win'>
      <h2>You win!</h2>
      <p>Well Done 🎉</p>
    </section>
  );
  const lostElement = isGameLost && (
    <section className='status-container lost'>
      <h2>Game Over!</h2>
      <p>Better start learning assembly 💀</p>
    </section>
  );
  const confettiElement = isGameWin && (
    <Confetti
      recycle={false}
      numberOfPieces={1000}
    />
  );

  function resetGame() {
    setCurrentWord(randomWords);
    setTappedLetter([]);
  }

  return (
    <>
      <main>
        {confettiElement}
        <Header />
        <section
          className='status-container'
          aria-live='polite'
          role='status'>
          {noGuessedLetter}
          {youWinElement}
          {lostElement}
        </section>
        <section className='languages-container'>{languagesElements}</section>
        <section className='letters-container'>{letterElement}</section>
        {/* Combined visually-hidden aria-live region for status updates */}
        <section
          className='sr-only'
          aria-live='polite'
          role='status'>
          <p>
            {currentWord.includes(lastGuessedLetter)
              ? `Correct. The letter ${lastGuessedLetter} is in the word.`
              : `Sorry. The letter  ${lastGuessedLetter} is not in the word.`}
            You have {numGessesLeft} attemps left.
          </p>
          <p>
            Curren word:{' '}
            {currentWord
              .split('')
              .map((letter) =>
                tappedLetter.includes(letter) ? letter + '.' : 'blanck.'
              )
              .join(' ')}
          </p>
        </section>
        <section className='keyboard-container'>{keyboard}</section>
        {isGameOver && (
          <button
            onClick={resetGame}
            className='new-game'>
            New Game
          </button>
        )}
      </main>
    </>
  );
}

export default App;
