import React, { useEffect, useRef, useState } from 'react';
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
import ReceiptModel from '../../../../model/ReceiptModel';
import ParticipantModel from '../../../../model/ParticipantModel';
import Topbar from '../../../../components/Topbar';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import Footer from '../../../../components/Footer';
import { getAvailableTracks, registerIn, registerOut } from './service';
import { fetchAndSetParticipantItems } from '../../../../actions/ParticipantActions';
import EventModel from '../../../../model/EventModel';
import TrackModel from '../../../../model/TrackModel';
import {
  formatDateText,
  formatDateTimeText,
} from '../../../../components/Lib/DateUtils';
import QrScanner from '../../../QrScanner';

const queryString = require('query-string');

interface Props {
  space: string;
  track: any;
  handleChange: any;
  event: EventModel;
  participant: ParticipantModel;
}

const CheckinTile = (props: Props) => {
  const dispatch = useDispatch();
  const [showQrReader, setShowQrReader] = useState(false);

  const handleCheckIn = () => {
    if (props.event.code || props.track.code) {
      setShowQrReader(true);
    } else {
      registerIn(
        props.space,
        props.event?._id || '',
        props.participant?._id || '',
        props.track._id || '',
        123
      ).then((response: any) => {
        props.handleChange();
      });
    }
  };

  const handleCheckOut = () => {
    registerOut(
      props.space,
      props.event?._id || '',
      props.participant?._id || '',
      props.track._id || ''
    ).then((response: any) => {
      console.log(response);
      props.handleChange();
    });
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const handleQrData = (text: any) => {
    console.log(text);
    setShowQrReader(false);
    registerIn(
      props.space,
      props.event?._id || '',
      props.participant?._id || '',
      props.track._id || '',
      text
    ).then((response: any) => {
      console.log(response);
      props.handleChange();
    });
  };

  return (
    <>
      {/* {showQrReader && (
        <div className="qr-scan">
          <QrReader constraints={{}} onResult={handleQrResult} />
          <div>{qrData}</div>
        </div>
      )} */}
      {showQrReader && (
        <QrScanner
          handleChange={handleQrData}
          handleClose={() => setShowQrReader(false)}
        ></QrScanner>
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
          )} to ${formatDateTimeText(props.track.to)} ${
            props.track.location ? `(${props.track.location})` : ''
          }`}</div>
          <div className="checkin-tile__left__description">
            {props.track.description}
          </div>
          {/* <div className="checkin-tile__left__location">
            {props.track.location}
          </div> */}
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
