import { useState } from 'react';
import Header from './components/Header';
import '../src/languajes';

import './App.css';
import { languages } from '../src/languajes';

function App() {
  const [currentWord, setCurrentWord] = useState('javascript');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const wordArray = currentWord.toLocaleUpperCase().split('');
  const letterElement = wordArray.map((letter, index) => (
    <span
      className='letters'
      key={index}>
      <p>{letter}</p>
    </span>
  ));

  const languajesElements = languages.map((lang) => (
    <span
      key={lang.name}
      style={{ backgroundColor: lang.backgroundColor, color: lang.color }}>
      {lang.name}
    </span>
  ));

  const keyboard = alphabet
    .split('')
    .map((letter) => <button key={letter}>{letter.toUpperCase()}</button>);
  return (
    <>
      <main>
        <Header />
        <section className='status-container'>
          <h2>You win!</h2>
          <p>Well done 🎉</p>
        </section>
        <section className='languajes-container'>{languajesElements}</section>
        <section className='letters-container'>{letterElement}</section>
        <section className='keyboard-container'>{keyboard}</section>
        <button className='new-game'>New Game</button>
      </main>
    </>
  );
}

export default App;
