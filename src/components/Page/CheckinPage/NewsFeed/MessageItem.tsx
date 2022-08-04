import React, { useEffect, useState } from 'react';
import './MessageItem.scss';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Compose from '../../../../components/Compose';
import MessageModel from '../../../../model/MessageModel';
import { formatDateTimeText } from '../../../../components/Lib/DateUtils';

const queryString = require('query-string');

interface Props {
  message: MessageModel;
  participant?: ParticipantModel;
  participantMap: any;
}

const MessageItem = (props: Props) => {
  const handleChange = (text: string) => {};

  return (
    <div
      className={`message-item ${
        props.message.sender === props.participant?._id
          ? 'message-item--own'
          : ''
      } ${props.message.admin ? 'message-item--admin' : ''}`}
    >
      <div className="message-item__container">
        <div className="message-item__container__description">
          {props.message.description}
        </div>
        <div className="message-item__container__meta">
          <div className="message-item__container__meta__sender">
            {props.participantMap[props.message.sender]
              ? props.participantMap[props.message.sender].firstName
              : props.message.sender}
          </div>
          <div className="message-item__container__meta__time">
            {formatDateTimeText(props.message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
