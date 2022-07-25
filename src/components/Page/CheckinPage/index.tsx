import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addDays, format } from 'date-fns';
import {
  faCalendarDays,
  faCheck,
  faHome,
  faLocationDot,
  faMapPin,
  faPlus,
  faQuestion,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ParticipantModel from '../../../model/ParticipantModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import Footer from '../../../components/Footer';
import {
  getAvailableTracks,
  getEventById,
  getParticipantById,
  getParticipantByReferenceId,
} from './service';
import { fetchAndSetParticipantItems } from '../../../actions/ParticipantActions';
import EventModel from '../../../model/EventModel';
import TrackModel from '../../../model/TrackModel';
import MySchedule from './MySchedule';
import Agenda from './Agenda';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const CheckinPage = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [participantId, setParticipantId] = useState<string | null>(null);
  const [page, setPage] = useState<
    'schedule' | 'agenda' | 'map' | 'user' | 'help'
  >('schedule');

  const [availableTracks, setAvailableTracks] = useState<any[]>([]);
  const [event, setEvent] = useState<EventModel>();
  const [participant, setParticipant] = useState<ParticipantModel>();

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setPage(query.page || 'schedule');
  }, [props.location.search]);

  const params: {
    eventId: string;
    participantReferenceId: string;
  } = useParams();

  const [showAllTracks, setShowAllTracks] = useState(false);

  useEffect(() => {
    console.log(params);
    if (params.eventId && params.participantReferenceId) {
      fetchParticipantData();
      fetchEventData();
    }
  }, [params]);

  useEffect(() => {
    console.log(params);
    if (params.eventId && participant?._id) {
      refreshData();
    }
  }, [params, participant]);

  const refreshData = () => {
    getAvailableTracks(
      props.space,
      params.eventId,
      participant?._id || ''
    ).then((response: any[]) => {
      setAvailableTracks(response);
    });
  };

  const fetchParticipantData = () => {
    getParticipantByReferenceId(
      props.space,
      params.participantReferenceId
    ).then((response: ParticipantModel) => {
      setParticipant(response);
      // setAvailableTracks(response);
    });
  };

  const fetchEventData = () => {
    getEventById(props.space, params.eventId).then((response: EventModel) => {
      setEvent(response);
      // setAvailableTracks(response);
    });
  };

  // useEffect(() => {
  //   const query = queryString.parse(props.location.search);
  //   setEventId(query.eventId);
  // }, [props.location.search]);

  // const authorization = useSelector((state: any) => state.authorization);
  // const eventList = useSelector((state: any) => state.event.items);
  // const participantList = useSelector((state: any) => state.participant.items);

  const [state, setState] = useState<any>({});

  const goToCreateParticipantPage = () => {
    history.push(`/${props.space}/participant/new`);
  };

  const goToCompanyPage = (participantId: string) => {
    history.push(`/${props.space}/participant/${participantId}`);
  };

  const handleChange = (participant: any) => {
    setState({
      ...state,
      [participant.currentTarget.name]: participant.currentTarget.value,
    });
  };

  const save = (event: any) => {
    event.preventDefault();
    console.log(state);
  };

  const goToPage = (page: 'schedule' | 'agenda' | 'map' | 'user' | 'help') => {
    history.push(
      `/${props.space}/checkin/${params.eventId}/${params.participantReferenceId}?page=${page}`
    );
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="checkin-page">
      <Topbar
        title={event?.name || ''}
      >{`${participant?.firstName} ${participant?.lastName}`}</Topbar>
      <div className="checkin-page__main">
        {(!page || page === 'schedule') && event && participant && (
          <MySchedule
            event={event}
            handleChange={refreshData}
            location={props.location}
            space={props.space}
            participant={participant}
            tracks={availableTracks}
          />
        )}
        {page === 'agenda' && event && participant && (
          <Agenda
            event={event}
            handleChange={refreshData}
            location={props.location}
            space={props.space}
            participant={participant}
            tracks={availableTracks}
          />
        )}
      </div>
      <div className="checkin-page__footer">
        <button
          onClick={() => goToPage('schedule')}
          className={`button checkin-page__footer__button ${
            !page || page === 'schedule'
              ? 'checkin-page__footer__button--active'
              : ''
          }`}
        >
          <div className="checkin-page__footer__button__label">
            <FontAwesomeIcon icon={faHome} />
            <div className="checkin-page__footer__button__label__text">
              Home
            </div>
          </div>
        </button>
        <button
          onClick={() => goToPage('agenda')}
          className={`button checkin-page__footer__button ${
            page === 'agenda' ? 'checkin-page__footer__button--active' : ''
          }`}
        >
          <div className="checkin-page__footer__button__label">
            <FontAwesomeIcon icon={faCalendarDays} />
            <div className="checkin-page__footer__button__label__text">
              Agenda
            </div>
          </div>
        </button>
        <button
          onClick={() => goToPage('map')}
          className={`button checkin-page__footer__button ${
            page === 'map' ? 'checkin-page__footer__button--active' : ''
          }`}
        >
          <div className="checkin-page__footer__button__label">
            <FontAwesomeIcon icon={faLocationDot} />
            <div className="checkin-page__footer__button__label__text">Map</div>
          </div>
        </button>
        <button
          onClick={() => goToPage('user')}
          className={`button checkin-page__footer__button ${
            page === 'user' ? 'checkin-page__footer__button--active' : ''
          }`}
        >
          <div className="checkin-page__footer__button__label">
            <FontAwesomeIcon icon={faUser} />
            <div className="checkin-page__footer__button__label__text">
              Detail
            </div>
          </div>
        </button>
        <button
          onClick={() => goToPage('help')}
          className={`button checkin-page__footer__button ${
            page === 'help' ? 'checkin-page__footer__button--active' : ''
          }`}
        >
          <div className="checkin-page__footer__button__label">
            <FontAwesomeIcon icon={faQuestion} />
            <div className="checkin-page__footer__button__label__text">
              Help
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CheckinPage;
