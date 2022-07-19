import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { QrReader } from 'react-qr-reader';
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
}

const CheckinTile = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [qrData, setQrData] = useState('');
  const [showQrReader, setShowQrReader] = useState(false);

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
    // registerIn(
    //   props.space,
    //   params.eventId,
    //   params.participantId,
    //   props.track._id || ''
    // ).then((response: any) => {
    //   console.log(response);
    //   props.handleChange();
    // });
    setShowQrReader(true);
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
    <>
      {showQrReader && (
        <div className="qr-scan">
          <QrReader
            onResult={(result, error) => {
              if (result) {
                setQrData(result?.text);
              }

              if (error) {
                console.info(error);
              }
            }}
            style={{ width: '100%' }}
          />
        </div>
      )}
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
