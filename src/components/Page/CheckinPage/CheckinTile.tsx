import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import QrReader from 'react-qr-scanner';
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
import {
  formatDateText,
  formatDateTimeText,
} from '../../../components/Lib/DateUtils';

const queryString = require('query-string');

interface Props {
  space: string;
  track: any;
  handleChange: any;
  eventId: any;
  participantId: any;
}

const CheckinTile = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const qrRef = useRef<any>(null);

  const [qrData, setQrData] = useState('');
  const [showQrReader, setShowQrReader] = useState(false);

  const [availableTracks, setAvailableTracks] = useState<TrackModel[]>([]);

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
      props.eventId,
      props.participantId,
      props.track._id || ''
    ).then((response: any) => {
      console.log(response);
      props.handleChange();
    });
    // setShowQrReader(true);
  };

  const handleCheckOut = () => {
    registerOut(
      props.space,
      props.eventId,
      props.participantId,
      props.track._id || ''
    ).then((response: any) => {
      console.log(response);
      props.handleChange();
    });
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const handleQrResult = (event: any) => {
    console.log(event);
    setQrData(event);
  };

  const handleScan = (data: any) => {
    setState({
      result: data
    });
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <>
      {/* {showQrReader && (
        <div className="qr-scan">
          <QrReader constraints={{}} onResult={handleQrResult} />
          <div>{qrData}</div>
        </div>
      )} */}
      <div>
        <QrReader
          delay={state.delay}
          // style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          />
        <p>{state.result}</p>
      </div>
      <div
        className={`checkin-tile checkin-tile--status-${props.track.status} ${
          props.track.isLocked ? 'checkin-tile--locked' : ''
        }`}
      >
        <div className="checkin-tile__left">
          <div className="checkin-tile__left__name">{props.track.name}</div>
          <div className="checkin-tile__left__time">{`${formatDateTimeText(
            props.track.from
          )} to ${formatDateTimeText(props.track.to)}`}</div>
          <div className="checkin-tile__left__description">
            {props.track.description}
          </div>
        </div>
        <div className="checkin-tile__right">
          {props.track.isLocked && (
            <>
              {/* {props.track.status === 'new' && <div>-</div>} */}
              {props.track.status === 'active' && (
                <div className="checkin-tile__right--active checkin-tile__right__indicator">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
              {props.track.status === 'closed' && (
                <div className="checkin-tile__right--active checkin-tile__right__indicator">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </>
          )}
          {!props.track.isLocked &&
            ['new', 'closed'].includes(props.track.status) && (
              <div className="checkin-tile__right--active">
                <button
                  className="button checkin-tile__right__action"
                  onClick={handleCheckIn}
                >
                  <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
                </button>
              </div>
            )}
          {!props.track.isLocked && props.track.status === 'active' && (
            <div className="checkin-tile__right--active">
              <button
                className="button checkin-tile__right__action"
                onClick={handleCheckOut}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckinTile;
