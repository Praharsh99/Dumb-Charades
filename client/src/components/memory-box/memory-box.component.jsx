import React, { useState } from 'react';
import { connect } from 'react-redux';

import BlurredBox from './../blurred-box/blurred-box.component.jsx';

import { setNewMemoryWord } from './../../redux/memory/memory.actions';
import { selectMemoryWords } from './../../redux/memory/memory.selectors';

import './memory-box.styles.css';

function MemoryBox({ setNewMemoryWord, words }) {
  const [word, setWord] = useState('');

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewMemoryWord(word.trim());
    setWord('');

    e.target.focus();
  };

  return (
    <BlurredBox width="100%" height="35%">
      <div className="memoryBox">
        {/* input box for storing data */}
        <div className="memoryBox__inputArea">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Remember word here..."
              value={word}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* words that were stored */}
        <div className="memoryBox__wordsContainer">
          {words.length ? (
            words.map((word, idx) => (
              <div className="memoryBox__word" key={idx}>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryBox);
