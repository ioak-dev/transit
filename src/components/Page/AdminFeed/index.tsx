import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCalendar,
  faCircleInfo,
  faFeed,
  faPeopleGroup,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import MessageList from './MessageList';
import MessageModel from '../../../model/MessageModel';
import { getFeedMessages, sendFeed } from './service';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Compose from './Compose';
import Topbar from '../../../components/Topbar';
import { sendMessage } from '../../../events/MessageService';
import { getEventById } from '../CheckinPage/service';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  tracks: any[];
  handleChange: any;
  participantMap: any;
}

const AdminNewsFeed = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const participantList = useSelector((state: any) => state.participant.items);
  const [event, setEvent] = useState<any>();
  const params: {
    eventId: string;
    code: string;
  } = useParams();

  const [availableFeeds, setavailableFeeds] = useState<MessageModel[]>([]);
  const [participantMap, setParticipantMap] = useState<any>({});

  const fetchFeedsData = () => {
    console.log('props.event', params.eventId);
    getFeedMessages(props.space, params.eventId || '').then(
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
    fetchEventData();
  }, []);

  const fetchEventData = () => {
    getEventById(props.space, params.eventId).then((response: EventModel) => {
      setEvent(response);
    });
  };

  const handleSendFeed = (payload: any) => {
    sendFeed(
      props.space,
      { ...payload, eventId: params.eventId },
      authorization
    ).then((response: any) => {
      fetchFeedsData();
    });
  };

  const handleNotify = (payload: any) => {
    console.log(payload);
    const _event = { ...event };
    setEvent({ ...event, notification: payload.description });
  };

  return (
    <>
      <Topbar
        alternateView
        // title={event?.name || ''}
        title="Administrator"
      />
      {event?.notification && (
        <div className="checkin-page__notification">{event.notification}</div>
      )}
      <div className="feed-list">
        {availableFeeds && (
          <MessageList
            messages={availableFeeds}
            participantMap={participantMap}
            isAdminMessagePresent={true}
          />
        )}
      </div>
      <Compose handleSendFeed={handleSendFeed} handleNotify={handleNotify} />
    </>
  );
};

export default AdminNewsFeed;
