import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addDays, format } from 'date-fns';
import {
  faCheck,
  faCircleExclamation,
  faClose,
  faPaperPlane,
  faPen,
  faPlus,
  faTimes,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import DisableContextBarCommand from '../../events/DisableContextBarCommand';
import { getFeedsBySpace, sendFeed } from './service';
import MessageList from '../Page/CheckinPage/NewsFeed/MessageList';
import MessageModel from '../../model/MessageModel';
import ParticipantModel from '../../model/ParticipantModel';
import { getFeedMessages } from '../Page/CheckinPage/NewsFeed/service';
import Compose from './Compose';

const queryString = require('query-string');

interface Props {
  space: string;
  eventId?: string | null;
}

const FeedList = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const participantList = useSelector((state: any) => state.participant.items);

  const [availableFeeds, setavailableFeeds] = useState<MessageModel[]>([]);
  const [participantMap, setParticipantMap] = useState<any>({});

  const fetchFeedsData = () => {
    getFeedMessages(props.space, props.eventId || '').then(
      (response: MessageModel[]) => {
        setavailableFeeds(response);
      }
    );
  };

  useEffect(() => {
    if (participantList) {
      const _participantMap: any = {};
      participantList.forEach((item: ParticipantModel) => {
        _participantMap[item._id || ''] = item;
      });
      setParticipantMap(_participantMap);
    }
  }, [participantList]);

  useEffect(() => {
    fetchFeedsData();
    DisableContextBarCommand.next(true);
  }, []);

  const handleChange = (payload: any) => {
    sendFeed(
      props.space,
      { ...payload, eventId: props.eventId },
      authorization
    ).then((response: any) => {
      fetchFeedsData();
    });
  };

  return (
    <>
      <div className="feed-list">
        {availableFeeds && (
          <MessageList
            messages={availableFeeds}
            participantMap={participantMap}
          />
        )}
      </div>
      <Compose handleChange={handleChange} />
    </>
  );
};

export default FeedList;
