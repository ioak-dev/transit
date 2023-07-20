import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faPhone,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { isEmptyOrSpaces } from '../Utils';

interface Props {
  handleChange: any;
  handleRefresh: any;
}

const Compose = (props: Props) => {
  const [state, setState] = useState('');

  const handleChange = (event: any) => {
    setState(event.currentTarget.value);
  };

  const send = () => {
    if (!isEmptyOrSpaces(state)) {
      props.handleChange(state);
      setState('');
    }
  };

  const refresh = () => {
    props.handleRefresh();
  };

  return (
    <div className="compose">
      <input
        className="input"
        name="compose"
        autoComplete="off"
        value={state}
        onInput={handleChange}
      />
      <button className="button" onClick={send}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
      <button className="compose__refresh button" onClick={refresh}>
        <FontAwesomeIcon icon={faRefresh} />
      </button>
    </div>
  );
};

export default Compose;
