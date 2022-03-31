import React from 'react';
import KeyBoardLetter from '../keyBoardLetter/KeyBoardLetter';
import './Keyboard.css';

const orderedKeyBoardLetters = [
	'q',
	'w',
	'e',
	'r',
	't',
	'y',
	'u',
	'i',
	'o',
	'p',
	'a',
	's',
	'd',
	'f',
	'g',
	'h',
	'j',
	'k',
	'l',
	'enter',
	'z',
	'x',
	'c',
	'v',
	'b',
	'n',
	'm',
	'\\',
];

export default function Keyboard({ onClick }) {
	return (
		<div className='keyboard'>
			{orderedKeyBoardLetters.map((letter, idx) => (
				<KeyBoardLetter key={idx} value={letter} onClick={onClick} />
			))}
		</div>
	);
}
