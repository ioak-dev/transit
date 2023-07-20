import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { addDays, format, intervalToDuration } from 'date-fns';
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
import {
  formatDateText,
  formatDateTimeText,
} from '../../../../components/Lib/DateUtils';
import QrScanner from '../../../QrScanner';
import AddSpinnerCommand from '../../../../events/AddSpinnerCommand';
import { newId } from '../../../../events/MessageService';
import RemoveSpinnerCommand from '../../../../events/RemoveSpinnerCommand';

interface Props {
  space: string;
  track: any;
  handleChange: any;
  event: any;
  participant: ParticipantModel;
}

const CheckinTile = (props: Props) => {
  const dispatch = useDispatch();
  const [showQrReader, setShowQrReader] = useState(false);
  const [duration, setDuration] = useState<string>('');

  useEffect(() => {
    const interval = intervalToDuration({
      start: new Date(props.track.from),
      end: new Date(props.track.to),
    });
    let _duration = '';
    if (interval.days && interval.days > 0) {
      _duration += `${interval.days}d`;
    }
    if (interval.hours && interval.hours > 0) {
      _duration += `${_duration ? ' ' : ''}${interval.hours}h`;
    }
    if (interval.minutes && interval.minutes > 0) {
      _duration += `${_duration ? ' ' : ''}${interval.minutes}m`;
    }
    setDuration(_duration);
  }, props.track);

  const handleCheckIn = () => {
    if (props.event || props.track) {
      setShowQrReader(true);
    } else {
      // const spinnerId = newId();
      // AddSpinnerCommand.next(spinnerId);
      registerIn(
        props.space,
        props.event?._id || '',
        props.participant._id || '',
        props.track._id || '',
        123
      ).then((response: any) => {
        // RemoveSpinnerCommand.next(spinnerId);
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
    const spinnerId = newId();
    AddSpinnerCommand.next(spinnerId);
    registerIn(
      props.space,
      props.event?._id || '',
      props.participant?._id || '',
      props.track._id || '',
      text
    ).then((response: any) => {
      console.log(response);
      RemoveSpinnerCommand.next(spinnerId);
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
          <div className="checkin-tile__left__schedule">
            {props.track.location ? `(${props.track.location})` : ''} (
            {duration})
          </div>
          <div className="checkin-tile__left__description">
            {props.track.description}
          </div>
          <div className="checkin-tile__left__time">{`${formatDateTimeText(
            props.track.from
          )}`}</div>
          {/* <div className="checkin-tile__left__location">
            {props.track.location}
          </div> */}
        </div>
        <div className="checkin-tile__right">
          {props.track.isLocked && (
            <>
              {/* {props.track.status === 'new' && <div>-</div>} */}
              {props.track.status === 'active' && (
                <div className="checkin-tile__right__indicator--inactive checkin-tile__right__indicator">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
              {props.track.status === 'closed' && (
                <div className="checkin-tile__right__indicator--inactive checkin-tile__right__indicator">
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              )}
            </>
          )}
          {!props.track.isLocked &&
            ['new', 'closed'].includes(props.track.status) && (
              <div className="checkin-tile__right__indicator--active">
                <button
                  className="button checkin-tile__right__action"
                  onClick={handleCheckIn}
                >
                  <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
                </button>
              </div>
            )}
          {!props.track.isLocked && props.track.status === 'active' && (
            <div className="checkin-tile__right__indicator--active">
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
