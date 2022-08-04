import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';

const queryString = require('query-string');

interface Props {
  handleChange: any;
}

const Compose = (props: Props) => {
  const [state, setState] = useState('');

  const handleChange = (event: any) => {
    setState(event.currentTarget.value);
  };

  const send = () => {
    props.handleChange(state);
    setState('');
  };

  return (
    <div className="compose">
      <input
        className="input"
        name="compose"
        value={state}
        onInput={handleChange}
      />
      <button className="button" onClick={send}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default Compose;
