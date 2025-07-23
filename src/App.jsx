import { useState } from 'react';
import Header from './components/Header';
import '../src/languajes';

import './App.css';
import { languages } from '../src/languajes';

function App() {
  // States Values
  const [currentWord, setCurrentWord] = useState('react');
  const [tappedLetter, setTappedLetter] = useState([]);
  console.log('Current word', currentWord);
  console.log('Tapped letters', tappedLetter);
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
  console.log('Counter wrong letters', wrongGuessCounter);

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

  return (
    <>
      <main>
        <Header />
        <section className='status-container'>
          <h2>You win!</h2>
          <p>Well done 🎉</p>
        </section>
        <section className='languages-container'>{languagesElements}</section>
        <section className='letters-container'>{letterElement}</section>
        <section className='keyboard-container'>{keyboard}</section>
        <button className='new-game'>New Game</button>
      </main>
    </>
  );
}

export default App;
