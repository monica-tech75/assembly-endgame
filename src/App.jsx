import { useState } from 'react';
import Header from './components/Header';
import '../src/languajes';
import { getFarewellText } from '../src/utils';

import './App.css';
import { languages } from '../src/languajes';
import Confetti from 'react-confetti';

function App() {
  // States Values
  const [currentWord, setCurrentWord] = useState('react');
  const [tappedLetter, setTappedLetter] = useState([]);

  // Static Values
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  // Derived vales
  /* let counter = 0;
  tappedLetter.map((letter) => {
    currentWord.includes(letter) ? counter : counter++;
  });
  console.log(counter); */

  const wrongGuessCounter = tappedLetter.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const lastGuessedLetter = tappedLetter[tappedLetter.length - 1];
  const isGuessedLetterCorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const letterElement = currentWord.split('').map((letter, index) => {
    return (
      <span
        className='letters'
        key={index}>
        {tappedLetter.includes(letter) ? letter.toUpperCase() : ''}
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

  const isGameWin = currentWord
    .split('')
    .every((letter) => tappedLetter.includes(letter));
  const isGameLost = wrongGuessCounter >= languagesElements.length - 1;

  const isGameOver = isGameLost || isGameWin;

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
        key={letter}>
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
  const confettiElement = isGameWin && <Confetti />;

  function resetGame() {
    setTappedLetter([]);
  }

  return (
    <>
      <main>
        {confettiElement}
        <Header />
        <section className='status-container'>
          {noGuessedLetter}
          {youWinElement}
          {lostElement}
        </section>
        <section className='languages-container'>{languagesElements}</section>
        <section className='letters-container'>{letterElement}</section>
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
