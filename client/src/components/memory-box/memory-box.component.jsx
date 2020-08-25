import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import BlurredBox from './../blurred-box/blurred-box.component.jsx';

import {
  setNewMemoryWord,
  setMemoryAsInput,
} from './../../redux/memory/memory.actions';
import { selectMemoryWords } from './../../redux/memory/memory.selectors';

import './memory-box.styles.css';

function MemoryBox({ setNewMemoryWord, setMemoryAsInput, words }) {
  const [word, setWord] = useState('');
  const wordsContainer = useRef(null);

  useEffect(() => {
    wordsContainer.current.scrollTo(0, wordsContainer.current.scrollHeight);
  });

  const handleClick = (e) => {
    setMemoryAsInput(e.target.id);
  };

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (word.trim().length > 0) {
      setNewMemoryWord(word.trim());
      setWord('');

      e.target.focus();
    }
  };

  return (
    <BlurredBox width="100%" height="35%">
      <div className="memoryBox">
        {/* input box for storing data */}
        <div className="memoryBox__inputArea">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Remember your words here..."
              value={word}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* words that were stored */}
        <div className="memoryBox__wordsContainer" ref={wordsContainer}>
          {words.length ? (
            words.map((word, idx) => (
              <div
                className="memoryBox__word"
                id={word}
                key={idx}
                onClick={handleClick}
              >
                <span>{word}</span>
              </div>
            ))
          ) : (
            <div className="memoryBox__noWord">No words!</div>
          )}
        </div>
      </div>
    </BlurredBox>
  );
}

const mapStateToProps = (state) => ({
  words: selectMemoryWords(state),
});

const mapDispatchToProps = (dispatch) => ({
  setNewMemoryWord: (word) => dispatch(setNewMemoryWord(word)),
  setMemoryAsInput: (word) => dispatch(setMemoryAsInput(word)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryBox);
