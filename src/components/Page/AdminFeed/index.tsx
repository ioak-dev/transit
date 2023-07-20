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
import { getFeedMessages, sendFeed, sendNotification } from './service';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Compose from './Compose';
import Topbar from '../../../components/Topbar';
import { sendMessage } from '../../../events/MessageService';
import { getEventById } from '../CheckinPage/service';

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
  const [validationSuccessful, setValidationSuccessful] = useState(false);

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

  useEffect(() => {
    getEventById(props.space, params.eventId).then((response: EventModel) => {
      setValidationSuccessful(response?.adminKey === params.code);
    });
  }, [params]);

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
    sendNotification(props.space, params.eventId, {
      message: payload.description,
    }).then((response: any) => {
      fetchEventData();
    });
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
      {validationSuccessful && (
        <>
          <div className="feed-list">
            {availableFeeds && (
              <MessageList
                messages={availableFeeds}
                participantMap={participantMap}
                isAdminMessagePresent
              />
            )}
          </div>
          <Compose
            handleSendFeed={handleSendFeed}
            handleNotify={handleNotify}
          />
        </>
      )}
      {!validationSuccessful && <div>Unauthorized</div>}
    </>
  );
};

export default AdminNewsFeed;
