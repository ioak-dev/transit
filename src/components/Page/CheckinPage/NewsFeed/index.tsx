import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Compose from '../../../../components/Compose';
import MessageList from './MessageList';
import MessageModel from '../../../../model/MessageModel';
import { getFeedMessages } from './service';
import { sendFeedAsUser } from '../../../../components/FeedList/service';

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
  participantMap: any;
}

const NewsFeed = (props: Props) => {
  const handleChange = (description: string) => {
    sendFeedAsUser(props.space, {
      important: false,
      description,
      sender: props.participant._id,
      eventId: props.event._id,
      admin: false,
      userId: '',
    }).then(() => {
      refreshMessages();
    });
  };

  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    if (props.event) {
      refreshMessages();
    }
  }, [props.event]);

  const refreshMessages = () => {
    getFeedMessages(props.space, props.event._id || '').then(
      (response: MessageModel[]) => {
        setMessages(response || []);
      }
    );
  };

  return (
    <div className="news-feed">
      <MessageList
        messages={messages}
        participant={props.participant}
        participantMap={props.participantMap}
        isAdminMessagePresent
      />
      <Compose handleChange={handleChange} handleRefresh={refreshMessages} />
    </div>
  );
};

export default NewsFeed;
