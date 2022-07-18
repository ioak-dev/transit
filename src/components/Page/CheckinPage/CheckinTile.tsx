import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addDays, format } from 'date-fns';
import {
  faArrowRightFromBracket,
  faCheck,
  faPersonWalkingDashedLineArrowRight,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CheckinTile.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ParticipantModel from '../../../model/ParticipantModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import Footer from '../../../components/Footer';
import { getAvailableTracks, registerIn, registerOut } from './service';
import { fetchAndSetParticipantItems } from '../../../actions/ParticipantActions';
import EventModel from '../../../model/EventModel';
import TrackModel from '../../../model/TrackModel';

const queryString = require('query-string');

interface Props {
  space: string;
  track: any;
  handleChange: any;
}

const CheckinTile = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [participantId, setParticipantId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);

  const [availableTracks, setAvailableTracks] = useState<TrackModel[]>([]);

  const params: { eventId: string; participantId: string } = useParams();

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

  const handleCheckIn = () => {
    registerIn(
      props.space,
      params.eventId,
      params.participantId,
      props.track._id || ''
    ).then((response: any) => {
      console.log(response);
      props.handleChange();
    });
  };

  const handleCheckOut = () => {
    registerOut(
      props.space,
      params.eventId,
      params.participantId,
      props.track._id || ''
    ).then((response: any) => {
      console.log(response);
      props.handleChange();
    });
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="checkin-tile">
      <div className="checkin-tile__left">
        <div className="checkin-tile__left__name">{props.track.name}</div>
        <div className="checkin-tile__left__description">
          {props.track.description}
        </div>
      </div>
      <div className="checkin-tile__right">
        {['new', 'closed'].includes(props.track.status) && (
          <button
            className="button checkin-tile__right__action"
            onClick={handleCheckIn}
          >
            <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
          </button>
        )}
        {props.track.status === 'active' && (
          <button
            className="button checkin-tile__right__action"
            onClick={handleCheckOut}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckinTile;
