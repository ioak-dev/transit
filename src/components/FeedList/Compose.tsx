import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  faCheck,
  faCircleExclamation,
  faClose,
  faExclamation,
  faPaperPlane,
  faPen,
  faPlus,
  faTimes,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Compose.scss';
import MessageModel from '../../model/MessageModel';

interface Props {
  handleChange: any;
}

const Compose = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const participantList = useSelector((state: any) => state.participant.items);

  const [availableFeeds, setavailableFeeds] = useState<MessageModel[]>([]);
  const [participantMap, setParticipantMap] = useState<any>({});

  const [state, setState] = useState<MessageModel>({
    important: false,
    description: '',
    sender: 'Administrator',
    eventId: '',
    admin: false,
    userId: '',
  });

  const initialState = {
    important: false,
    description: '',
    sender: 'Administrator',
    eventId: '',
    admin: false,
    userId: '',
  };

  const toggleChange = () => {
    setState({ ...state, important: !state.important });
  };

  const send = (event: any) => {
    event.preventDefault();
    props.handleChange({ ...state });
    clear();
  };

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const clear = () => {
    setState(initialState);
  };

  return (
    <div className="compose-admin">
      <div>
        <input
          placeholder="Text message"
          name="description"
          onInput={handleChange}
          value={state.description}
        />
      </div>
      <div>
        <input
          placeholder="Sender"
          name="sender"
          autoComplete="off"
          onInput={handleChange}
          value={state.sender}
        />
      </div>
      <div>
        <button
          className={`button compose-admin__important ${
            state.important ? 'compose-admin__important--active' : ''
          }`}
          onClick={toggleChange}
        >
          <FontAwesomeIcon icon={faExclamation} />
        </button>
      </div>
      <div>
        <button className="button primary-button" onClick={send}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default Compose;
