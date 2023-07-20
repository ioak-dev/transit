import React, { useEffect } from 'react';
import './MessageList.scss';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Compose from '../../../components/Compose';
import MessageModel from '../../../model/MessageModel';
import MessageItem from './MessageItem';

interface Props {
  participant?: ParticipantModel;
  messages: MessageModel[];
  participantMap: any;
  isAdminMessagePresent: boolean;
}

const MessageList = (props: Props) => {
  const handleChange = (text: string) => {};

  return (
    <div className="message-list">
      {props.messages.map((message) => (
        <MessageItem
          participantMap={props.participantMap}
          message={message}
          key={message._id}
          participant={props.participant}
          isAdminMessagePresent={props.isAdminMessagePresent}
        />
      ))}
    </div>
  );
};

export default MessageList;
