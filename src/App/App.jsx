import './App.css';
import Board from '../board/Board';
import Keyboard from '../keyboard/Keyboard';
import targetWords from '../data/targetWords.json';
import acceptedWords from '../data/acceptedWords.json';
import { useEffect, useState } from 'react';
import Popup from '../popup/Popup';

export const BOARD_SIZE = 6;
export const ROW_SIZE = 5;
const currentWord = getCurrentWord();
let stopInteraction = false;
let timeout;

export default function App() {
  const [guess, setGuess] = useState([]);
  const [guessHistory, setGuessHistory] = useState([]);
  const [currentRowIdx, setCurrentRowIdx] = useState(0);
  const [popupText, setPopupText] = useState('');
  const [keyboardColors, setKeyboardColors] = useState({});

  useEffect(() => {
    document.body.addEventListener('keydown', e =>
      handleKeyPress(e.key.toLowerCase())
    );
    console.log(currentWord);
  }, []);

  useEffect(() => {
    timeout = setTimeout(() => {
      setPopupText('');
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [popupText]);

  useEffect(() => {
    guessHistory.forEach(prevGuess => {
      prevGuess.forEach((letter, idx) => {
        setKeyboardColors(prevColors => ({
          ...prevColors,
          ...getLetterColor(prevGuess.join(''), letter, idx),
        }));
      });
    });

    if (guessHistory.length === BOARD_SIZE) {
      setPopupText(currentWord);
      stopInteraction = true;
    }
    if (guessHistory[guessHistory.length - 1]?.join('') === currentWord) {
      setPopupText('You Got It !!');
      stopInteraction = true;
    }
  }, [currentRowIdx]);

  function handleKeyPress(key) {
    if (stopInteraction) return;
    if (key.match(/[a-z]/g) && key.length === 1) {
      setGuess(prevGuess => {
        if (prevGuess.length === ROW_SIZE) return prevGuess;
        return [...prevGuess, key];
      });
    } else if (key === 'backspace' || key === '\\') {
      setGuess(prevGuess => prevGuess.slice(0, prevGuess.length - 1));
    } else if (key === 'enter') {
      handleSubmit();
    }
    return;
  }

  function handleSubmit() {
    setGuess(prevGuess => {
      if (prevGuess.length !== ROW_SIZE) {
        setPopupText('Not Enough Letter');
        return prevGuess;
      }
      if (!acceptedWords.includes(prevGuess.join(''))) {
        setPopupText("This Word Doesn't Exist");
        return prevGuess;
      }
      setGuessHistory(prevGuessHistory => [...prevGuessHistory, prevGuess]);
      setCurrentRowIdx(prevRowIdx => prevRowIdx + 1);
      return [];
    });
  }

  return (
    <>
      <header className='header'>
        <h1 className='header__title'>Wordle</h1>
      </header>
      <main className='main'>
        <Popup popupText={popupText} />
        <Board
          currentWord={currentWord}
          guess={guess}
          guessHistory={guessHistory}
          currentRowIdx={currentRowIdx}
        />
        <Keyboard onClick={handleKeyPress} keyboardColors={keyboardColors} />
      </main>
    </>
  );
}

function getCurrentWord() {
  return targetWords[Math.floor(Math.random() * targetWords.length)];
}

function getLetterColor(word, letter, idx) {
  if (currentWord[idx] === letter) return { [letter]: 'correct' };
  if (
    currentWord.includes(letter))
  )
    return { [letter]: 'present' };
  return { [letter]: 'absent' };
}
