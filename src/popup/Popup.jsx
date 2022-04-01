import { useState, useEffect } from 'react';
import './Popup.css';

export default function Popup({ popupText }) {
  if (popupText) {
    return (
      <div className='popup__container'>
        <div className='popup'>{popupText}</div>
      </div>
    );
  } else {
    return null;
  }
}
