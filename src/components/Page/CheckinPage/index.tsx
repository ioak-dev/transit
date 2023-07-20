import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {useNavigate} from 'react-router-dom';
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
  faPerson,
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
  getCheckinByEventIdAndParticipantId,
  getEventById,
  getParticipantById,
  getParticipantByReferenceId,
  getParticipantList,
} from './service';
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
import ParticipantSelectSection from './ParticipantSelectSection';
import { getAllCheckin, getCheckin } from '../AdminCheckinPage/service';
import { useSearchParams } from 'react-router-dom';

interface Props {
  space: string;
  location: any;
}

const CheckinPage = (props: Props) => {

  const [participantId, setParticipantId] = useState<string | null>(null);
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
    | string
  >('Home');

  const [isRegistered, setIsRegistered] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isEventStarted, setIsEventStarted] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [validationSuccessful, setValidationSuccessful] =
    useState<boolean>(false);
  const validationSuccessfulRef = useRef(false);

  const [availableTracks, setAvailableTracks] = useState<any[]>([]);
  const [checkinData, setCheckinData] = useState<any[]>([]);
  const [eventCheckinData, setEventCheckinData] = useState<any[]>([]);
  const [allCheckinData, setAllCheckinData] = useState<any[]>([]);
  const [event, setEvent] = useState<EventModel>();
  const eventRef = useRef<EventModel>();
  const [participant, setParticipant] = useState<ParticipantModel>();
  const participantRef = useRef<ParticipantModel>();
  const [participantMap, setParticipantMap] = useState<any>({});
  const [isCheckinDataLoaded, setIsCheckinDataLoaded] = useState(false);
  const [referenceIdList, setReferenceIdList] = useState<string[]>([]);
  const [emailToReferenceIdMap, setEmailToReferenceIdMap] = useState<any>({});
  const [participantList, setParticipantList] = useState<ParticipantModel[]>(
    []
  );
  const params: any = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramsRef = useRef({ eventId: '', participantReferenceId: '' });

  useEffect(() => {
    eventRef.current = event;
  }, [event]);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  useEffect(() => {
    setValidationSuccessful(false);
  }, [params.participantReferenceId]);

  useEffect(() => {
    participantRef.current = participant;
  }, [participant]);

  useEffect(() => {
    validationSuccessfulRef.current = validationSuccessful;
  }, [validationSuccessful]);

  useEffect(() => {
    setPage(searchParams.get('page') || 'Home');
  }, [searchParams]);

  const [showAllTracks, setShowAllTracks] = useState(false);

  useEffect(() => {
    if (
      params.eventId &&
      params.participantReferenceId &&
      availableTracks.length === 0
    ) {
      fetchParticipantData();
      fetchEventData();
    }
  }, [params]);

  useEffect(() => {
    if (params.eventId && availableTracks.length === 0) {
      fetchParticipantList();
    }
  }, [params]);

  useEffect(() => {
    pollData();
  }, []);

  useEffect(() => {
    if (params.eventId && participant?._id && availableTracks.length === 0) {
      refreshData();
    }
  }, [params, participant]);

  const getDateTimeString = (_date: Date) => {
    console.log(_date);
    return format(_date, "yyyy-MM-dd'T'HH:mm");
  };

  useEffect(() => {
    const today = getDateTimeString(new Date());
    if (checkinData && participant && event) {
      const _checkin = checkinData.find(
        (item: any) =>
          item.participantId === participant._id &&
          item.eventId === event._id &&
          item.trackId === null
      );
      setIsRegistered(!!_checkin?.register);
      setIsCheckedIn(!!_checkin?.from);
      setIsCheckedOut(!!_checkin?.to);
      setIsRegistrationOpen(
        new Date(event.registrationFrom) < new Date() &&
          new Date(event.registrationTo) > new Date()
      );
    }
    setIsEventStarted(new Date(event?.eventFrom) < new Date());
  }, [checkinData, participant, event]);

  useEffect(() => {
    refreshEventStatusData();
  }, []);

  const refreshEventStatusData = () => {
    // if (eventRef.current) {
    //   setIsEventStarted(!(new Date(eventRef.current?.) > new Date()));
    //   setIsRegistrationOpen(!(new Date(eventRef.current?.to) < new Date()));
    // }
    // setTimeout(() => {
    //   if (eventRef.current) {
    //     setIsTrackStarted(!(new Date(trackRef.current.from) > new Date()));
    //     setIsTrackEnded(!(new Date(props.track.to) < new Date()));
    //   }
    //   refreshEventStatusData();
    // }, 1000);
  };

  const refreshData = () => {
    getAvailableTracks(
      props.space,
      params.eventId,
      participant?._id || ''
    ).then((response: any[]) => {
      setAvailableTracks(response);
    });
    getCheckinByEventIdAndParticipantId(
      props.space,
      params.eventId,
      participant?._id || ''
    ).then((response: any[]) => {
      setCheckinData(response);
      setIsCheckinDataLoaded(true);
    });
    getCheckin(props.space, params.eventId, 'NA').then((response: any[]) => {
      setEventCheckinData(response);
    });
    getAllCheckin(props.space, params.eventId).then((response: any[]) => {
      setAllCheckinData(response);
    });
  };

  const pollData = () => {
    if (
      validationSuccessfulRef.current &&
      eventRef.current &&
      participantRef.current
    ) {
      // getAvailableTracks(
      //   props.space,
      //   paramsRef.current.eventId,
      //   participantRef.current?._id || ''
      // ).then((response: any[]) => {
      //   setAvailableTracks(response);
      // });
      getEventById(props.space, paramsRef.current.eventId).then(
        (response: EventModel) => {
          setEvent(response);
          // setAvailableTracks(response);
        }
      );
    }
    setTimeout(() => {
      pollData();
    }, 120000);
  };

  const fetchParticipantData = () => {
    getParticipantByReferenceId(
      props.space,
      params.eventId,
      params.participantReferenceId
    ).then((response: ParticipantModel) => {
      setParticipant(response);
      // setAvailableTracks(response);
    });
  };

  const fetchParticipantList = () => {
    getParticipantList(props.space, params.eventId).then(
      (response: ParticipantModel[]) => {
        setParticipantList(response);
        const _referenceIdList: string[] = [];
        const _emailToReferenceIdMap: any = {};
        const _participantMap: any = {};
        response.forEach((item: ParticipantModel) => {
          _participantMap[item._id || ''] = item;
          _referenceIdList.push(item.referenceId);
          _emailToReferenceIdMap[item.email] = item.referenceId;
        });
        setParticipantMap(_participantMap);
        setReferenceIdList(_referenceIdList);
        setEmailToReferenceIdMap(_emailToReferenceIdMap);
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
    let _outcome = false;
    if (isCheckedIn) {
      _outcome = true;
    } else if (!isEventStarted && isRegistered) {
      _outcome = true;
    }
    console.log('********', isEventStarted, isCheckedIn, _outcome);
    setValidationSuccessful(_outcome);
  }, [
    isCheckedIn,
    isCheckedOut,
    isRegistered,
    isEventStarted,
    isRegistrationOpen,
  ]);

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
    navigate(
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
        (event && participant && !validationSuccessful) ||
        params.participantReferenceId === 'register'
          ? 'checkin-page--notvalidated'
          : ''
      }`}
    >
      {params?.participantReferenceId !== 'register' && validationSuccessful && (
        <Topbar
          // title={event?.name || ''}
          title={page === 'Group' ? (searchParams.get('group') || '') : page}
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
      {(params?.participantReferenceId === 'register' ||
        !event ||
        !participant ||
        !validationSuccessful) && (
        <Topbar
          // title={event?.name || ''}
          title=""
        >
          {`${participant?.firstName || ''}`}
        </Topbar>
      )}
      {event?.notification && (
        <div className="checkin-page__notification">{event.notification}</div>
      )}
      <div className="checkin-page__main">
        {params?.participantReferenceId !== 'register' &&
          (!page || page === 'Home') &&
          validationSuccessful &&
          event &&
          participant && (
            <HomeSection
              event={event}
              handleChange={fetchParticipantData}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
            />
          )}
        {params?.participantReferenceId !== 'register' &&
          (!page || page === 'Schedule') &&
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
        {params?.participantReferenceId !== 'register' &&
          page === 'Agenda' &&
          validationSuccessful &&
          event &&
          participant &&
          isCheckinDataLoaded && (
            <Agenda
              event={event}
              handleChange={refreshData}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
              checkinData={checkinData}
              allCheckinData={allCheckinData}
            />
          )}
        {params?.participantReferenceId !== 'register' &&
          page === 'User' &&
          validationSuccessful &&
          event &&
          participant && (
            <MyDetail
              event={event}
              handleChange={fetchParticipantData}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
            />
          )}
        {params?.participantReferenceId !== 'register' &&
          page === 'People' &&
          validationSuccessful &&
          event &&
          participant && (
            <People
              event={event}
              location={props.location}
              space={props.space}
              participantList={participantList}
              tracks={availableTracks}
              checkinData={eventCheckinData}
            />
          )}
        {params?.participantReferenceId !== 'register' &&
          page === 'Map' &&
          validationSuccessful &&
          event &&
          participant && (
            <MapSection
              event={event}
              handleChange={refreshData}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
            />
          )}
        {params?.participantReferenceId !== 'register' &&
          page === 'More' &&
          validationSuccessful &&
          event &&
          participant && (
            <MoreMenuSection
              location={props.location}
              space={props.space}
              page={page}
              goToPage={goToPage}
              event={event}
              participant={participant}
            />
          )}
        {params?.participantReferenceId !== 'register' &&
          page === 'Help' &&
          validationSuccessful &&
          event &&
          participant && (
            <HelpSection
              event={event}
              handleChange={refreshData}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
            />
          )}
        {params?.participantReferenceId !== 'register' &&
          page === 'News Feed' &&
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
        {params?.participantReferenceId !== 'register' &&
          page === 'Group' &&
          validationSuccessful &&
          event &&
          participant &&
          searchParams.has('group') && (
            <GroupSection
              group={searchParams.get('group') || ''}
              event={event}
              handleChange={refreshData}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
              checkinData={checkinData}
            />
          )}
        {params?.participantReferenceId !== 'register' &&
          !validationSuccessful &&
          event &&
          participant && (
            <ValidateSection
              event={event}
              location={props.location}
              space={props.space}
              participant={participant}
              tracks={availableTracks}
              checkinData={checkinData}
              isEventStarted={isEventStarted}
              isRegistrationOpen={isRegistrationOpen}
              isRegistered={isRegistered}
              isCheckedIn={isCheckedIn}
              isCheckedOut={isCheckedOut}
              handleValidation={() => setValidationSuccessful(true)}
            />
          )}
        {params?.participantReferenceId === 'register' && (
          <ParticipantSelectSection
            handleValidation={() => setValidationSuccessful(true)}
            location={props.location}
            space={props.space}
            eventId={params?.eventId}
            referenceIdList={referenceIdList}
            emailToReferenceIdMap={emailToReferenceIdMap}
          />
        )}
      </div>
      {params?.participantReferenceId !== 'register' && validationSuccessful && (
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
            onClick={() => goToPage('News Feed')}
            className={`button checkin-page__footer__button ${
              !page || page === 'News Feed'
                ? 'checkin-page__footer__button--active'
                : ''
            }`}
          >
            <div className="checkin-page__footer__button__label">
              <FontAwesomeIcon icon={faMessage} />
              <div className="checkin-page__footer__button__label__text">
                Chat
              </div>
            </div>
          </button>
          <button
            onClick={() => goToPage('More')}
            className={`button checkin-page__footer__button ${
              ['Help', 'More', 'Group', 'Home', 'User'].includes(page)
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
