import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
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
} from './service';
import { fetchAndSetParticipantItems } from '../../../actions/ParticipantActions';
import EventModel from '../../../model/EventModel';
import TrackModel from '../../../model/TrackModel';
import CheckinTile from './CheckinTile';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const CheckinPage = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [participantId, setParticipantId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);

  const [availableTracks, setAvailableTracks] = useState<any[]>([]);
  const [event, setEvent] = useState<EventModel>();
  const [participant, setParticipant] = useState<ParticipantModel>();

  const params: { eventId: string; participantId: string } = useParams();

  useEffect(() => {
    console.log(params);
    if (params.eventId && params.participantId) {
      fetchParticipantData();
      fetchEventData();
      refreshData();
    }
  }, [params]);

  const refreshData = () => {
    getAvailableTracks(props.space, params.eventId, params.participantId).then(
      (response: any[]) => {
        setAvailableTracks(response);
      }
    );
  };

  const fetchParticipantData = () => {
    getParticipantById(props.space, params.participantId).then(
      (response: ParticipantModel) => {
        setParticipant(response);
        // setAvailableTracks(response);
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

  const cancel = () => history.goBack();

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="checkin-page">
      <Topbar
        title={event?.name || ''}
      >{`${participant?.firstName} ${participant?.lastName}`}</Topbar>
      <div className="checkin-page__main">
        {availableTracks.map((item) => (
          <CheckinTile
            key={item._id}
            space={props.space}
            track={item}
            handleChange={refreshData}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckinPage;
