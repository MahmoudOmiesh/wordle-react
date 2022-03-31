import './App.css';
import Board from '../board/Board';
import Keyboard from '../keyboard/Keyboard';
import targetWords from '../data/targetWords.json';
import acceptedWords from '../data/acceptedWords.json';
import { useEffect, useState } from 'react';

export const BOARD_SIZE = 6;
export const ROW_SIZE = 5;
const currentWord = getCurrentWord();
let stopInteraction = false;

export default function App() {
	const [guess, setGuess] = useState([]);
	const [guessHistory, setGuessHistory] = useState([]);
	const [currentRowIdx, setCurrentRowIdx] = useState(0);

	useEffect(() => {
		document.body.addEventListener('keydown', e =>
			handleKeyPress(e.key.toLowerCase())
		);
		console.log(currentWord);
	}, []);

	useEffect(() => {
		if (guessHistory.length === BOARD_SIZE) stopInteraction = true;
		if (guessHistory[guessHistory.length - 1]?.join('') === currentWord)
			stopInteraction = true;
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
			if (prevGuess.length !== ROW_SIZE) return prevGuess;
			if (!acceptedWords.includes(prevGuess.join(''))) return prevGuess;
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
				<Board
					currentWord={currentWord}
					guess={guess}
					guessHistory={guessHistory}
					currentRowIdx={currentRowIdx}
				/>
				<Keyboard onClick={handleKeyPress} />
			</main>
		</>
	);
}

function getCurrentWord() {
	return targetWords[Math.floor(Math.random() * targetWords.length)];
}
