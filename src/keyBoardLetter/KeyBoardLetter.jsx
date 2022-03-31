import React from 'react';

export default function KeyBoardLetter({ value, onClick }) {
	let className = 'keyboard__letter';
	if (value === 'a') className += ' push';
	else if (value === 'enter' || value === '\\') className += ' span-three';

	return (
		<div className={className} onClick={() => onClick(value)}>
			{value}
		</div>
	);
}
