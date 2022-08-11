import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addDays, format } from 'date-fns';
import {
  faCalendarCheck,
  faCalendarDays,
  faCheck,
  faCircleDot,
  faCommentDots,
  faEllipsis,
  faHome,
  faListDots,
  faListUl,
  faLocationDot,
  faMapPin,
  faMessage,
  faPeopleGroup,
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
  getParticipantList,
} from './service';
import { fetchAndSetParticipantItems } from '../../../actions/ParticipantActions';
import EventModel from '../../../model/EventModel';
import TrackModel from '../../../model/TrackModel';
import MySchedule from './MySchedule';
import Agenda from './Agenda';
import MapSection from './MapSection';
import MyDetail from './MyDetail';
import HelpSection from './HelpSection';
import ValidateSection from './ValidateSection';
import MoreMenuSection from './MoreMenuSection';
import GroupSection from './GroupSection';
import HomeSection from './HomeSection';
import NewsFeed from './NewsFeed';
import People from './People';
import TopbarRightSection from './TopbarRightSection';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const CheckinPage = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [participantId, setParticipantId] = useState<string | null>(null);
  const [queryParam, setQueryParam] = useState<any>({});
  const [page, setPage] = useState<
    | 'Home'
    | 'Schedule'
    | 'Agenda'
    | 'Map'
    | 'User'
    | 'People'
    | 'Help'
    | 'More'
    | 'Group'
    | 'News Feed'
  >('Home');

  const [validationSuccessful, setValidationSuccessful] =
    useState<boolean>(false);
  const [availableTracks, setAvailableTracks] = useState<any[]>([]);
  const [event, setEvent] = useState<EventModel>();
  const [participant, setParticipant] = useState<ParticipantModel>();
  const [participantMap, setParticipantMap] = useState<any>({});
  const [participantList, setParticipantList] = useState<ParticipantModel[]>(
    []
  );

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setPage(query.page || 'Home');
    setQueryParam(query);
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
      fetchParticipantList();
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

  const fetchParticipantList = () => {
    getParticipantList(props.space, params.eventId).then(
      (response: ParticipantModel[]) => {
        console.log(response);
        setParticipantList(response);
        const _participantMap: any = {};
        response.forEach((item: ParticipantModel) => {
          _participantMap[item._id || ''] = item;
        });
        setParticipantMap(_participantMap);
      }
    );
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

  useEffect(() => {
    if (participant) {
      const joiningDate = sessionStorage.getItem('joiningDate');
      const participantDate = format(
        new Date(participant?.joiningDate),
        'yyyy-MM-dd'
      );
      setValidationSuccessful(joiningDate === participantDate);
    }
  }, [participant]);

  const goToPage = (
    page:
      | 'Home'
      | 'Schedule'
      | 'Agenda'
      | 'Map'
      | 'User'
      | 'People'
      | 'Help'
      | 'More'
      | 'Group'
      | 'News Feed',
    group?: string
  ) => {
    history.push(
      `/${props.space}/checkin/${params.eventId}/${
        params.participantReferenceId
      }?page=${page}${group ? `&group=${group}` : ''}`
    );
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div
      className={`checkin-page ${
        event && participant && !validationSuccessful
          ? 'checkin-page--notvalidated'
          : ''
      }`}
    >
      {(!event || !participant || validationSuccessful) && (
        <Topbar
          alternateView
          // title={event?.name || ''}
          title={page === 'Group' ? queryParam.group : page}
          handleClick={() => goToPage('Home')}
        >
          {participant && event && (
            <TopbarRightSection
              location={props.location}
              space={props.space}
              participant={participant}
              event={event}
            />
          )}
        </Topbar>
      )}
      {!validationSuccessful && (
        <Topbar
          alternateView
          // title={event?.name || ''}
          title={event?.name || ''}
        >{`${participant?.firstName}`}</Topbar>
      )}
      {event?.notification && (
        <div className="checkin-page__notification">{event.notification}</div>
      )}
      <div className="checkin-page__main">
        {(!page || page === 'Home') &&
          validationSuccessful &&
          event &&
          participant && (
            <HomeSection
              event={event}
              handleChange={refreshData}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
            />
          )}
        {(!page || page === 'Schedule') &&
          validationSuccessful &&
          event &&
          participant && (
            <MySchedule
              event={event}
              handleChange={refreshData}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
            />
          )}
        {page === 'Agenda' && validationSuccessful && event && participant && (
          <Agenda
            event={event}
            handleChange={refreshData}
            location={props.location}
            space={props.space}
            participant={participant}
            tracks={availableTracks}
          />
        )}
        {page === 'User' && validationSuccessful && event && participant && (
          <MyDetail
            event={event}
            handleChange={fetchParticipantData}
            location={props.location}
            space={props.space}
            participant={participant}
            tracks={availableTracks}
          />
        )}
        {page === 'People' && validationSuccessful && event && participant && (
          <People
            event={event}
            location={props.location}
            space={props.space}
            participantList={participantList}
            tracks={availableTracks}
          />
        )}
        {page === 'Map' && validationSuccessful && event && participant && (
          <MapSection
            event={event}
            handleChange={refreshData}
            location={props.location}
            space={props.space}
            participant={participant}
            tracks={availableTracks}
          />
        )}
        {page === 'More' && validationSuccessful && event && participant && (
          <MoreMenuSection
            location={props.location}
            space={props.space}
            page={page}
            goToPage={goToPage}
            event={event}
            participant={participant}
          />
        )}
        {page === 'Help' && validationSuccessful && event && participant && (
          <HelpSection
            event={event}
            handleChange={refreshData}
            location={props.location}
            space={props.space}
            participant={participant}
            tracks={availableTracks}
          />
        )}
        {page === 'News Feed' &&
          validationSuccessful &&
          event &&
          participant && (
            <NewsFeed
              event={event}
              handleChange={refreshData}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
              participantMap={participantMap}
            />
          )}
        {page === 'Group' &&
          validationSuccessful &&
          event &&
          participant &&
          queryParam?.group && (
            <GroupSection
              group={queryParam.group}
              event={event}
              handleChange={refreshData}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
            />
          )}
        {!validationSuccessful && event && participant && (
          <ValidateSection
            event={event}
            handleValidation={() => setValidationSuccessful(true)}
            location={props.location}
            space={props.space}
            participant={participant}
            tracks={availableTracks}
          />
        )}
      </div>
      {validationSuccessful && (
        <div className="checkin-page__footer">
          <button
            onClick={() => goToPage('Agenda')}
            className={`button checkin-page__footer__button ${
              page === 'Agenda' ? 'checkin-page__footer__button--active' : ''
            }`}
          >
            <div className="checkin-page__footer__button__label">
              {/* <FontAwesomeIcon icon={faCalendarDays} /> */}
              <FontAwesomeIcon icon={faListUl} />
              <div className="checkin-page__footer__button__label__text">
                Agenda
              </div>
            </div>
          </button>
          <button
            onClick={() => goToPage('Schedule')}
            className={`button checkin-page__footer__button ${
              !page || page === 'Schedule'
                ? 'checkin-page__footer__button--active'
                : ''
            }`}
          >
            <div className="checkin-page__footer__button__label">
              <FontAwesomeIcon icon={faCalendarCheck} />
              <div className="checkin-page__footer__button__label__text">
                My Schedule
              </div>
            </div>
          </button>
          <button
            onClick={() => goToPage('People')}
            className={`button checkin-page__footer__button ${
              page === 'People' ? 'checkin-page__footer__button--active' : ''
            }`}
          >
            <div className="checkin-page__footer__button__label">
              {/* <FontAwesomeIcon icon={faCommentDots} /> */}
              <FontAwesomeIcon icon={faPeopleGroup} />
              <div className="checkin-page__footer__button__label__text">
                People
              </div>
            </div>
          </button>
          <button
            onClick={() => goToPage('Map')}
            className={`button checkin-page__footer__button ${
              !page || page === 'Map'
                ? 'checkin-page__footer__button--active'
                : ''
            }`}
          >
            <div className="checkin-page__footer__button__label">
              <FontAwesomeIcon icon={faLocationDot} />
              <div className="checkin-page__footer__button__label__text">
                Map
              </div>
            </div>
          </button>
          <button
            onClick={() => goToPage('More')}
            className={`button checkin-page__footer__button ${
              ['Help', 'More', 'Group', 'User', 'Home', 'News Feed'].includes(
                page
              )
                ? 'checkin-page__footer__button--active'
                : ''
            }`}
          >
            <div className="checkin-page__footer__button__label">
              <FontAwesomeIcon icon={faEllipsis} />
              <div className="checkin-page__footer__button__label__text">
                More
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckinPage;
