import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CheckinTile.scss';
import TrackModel from '../../../model/TrackModel';
import CheckinModel from '../../../model/CheckinModel';
import { deleteCheckin, registerInAdmin, registerOutAdmin } from './service';
import ParticipantModel from '../../../model/ParticipantModel';

interface Props {
  space: string;
  handleChange: any;
  participant: ParticipantModel;
  checkinMap: any;
  track?: TrackModel;
  eventId: string;
}

const CheckinTile = (props: Props) => {
  const dispatch = useDispatch();
  const [checkin, setCheckin] = useState<CheckinModel>();

  useEffect(() => {
    console.log('-----');
    if (props.participant?._id && props.checkinMap[props.participant?._id]) {
      setCheckin(props.checkinMap[props.participant?._id]);
    } else {
      setCheckin(undefined);
    }
  }, [props.checkinMap, props.participant]);

  const handleCheckIn = () => {
    registerInAdmin(
      props.space,
      props.eventId,
      props.participant._id || '',
      props.track?._id || 'NA'
    ).then((response) => {
      props.handleChange();
    });
  };

  const handleCheckOut = () => {
    registerOutAdmin(
      props.space,
      props.eventId,
      props.participant._id || '',
      props.track?._id || 'NA'
    ).then((response) => {
      props.handleChange();
    });
  };

  const handleDelete = () => {
    deleteCheckin(props.space, checkin?._id || '').then((response) => {
      props.handleChange();
    });
  };

  return (
    <>
      {/* {validationSuccessful && (
        <div className="qr-scan">
          <QrReader constraints={{}} onResult={handleQrResult} />
          <div>{qrData}</div>
        </div>
      )} */}
      <div
        className={`admin-checkin-tile ${
          checkin ? 'admin-checkin-tile--status-active' : ''
        }`}
      >
        <div className="admin-checkin-tile__left">
          <div className="admin-checkin-tile__left__name">
            {props.participant.firstName} {props.participant.lastName}
          </div>
          <div className="admin-checkin-tile__left__id">
            {props.participant.referenceId}
          </div>
        </div>
        {((new Date(props.track?.from) <= new Date() &&
          new Date(props.track?.to) >= new Date()) ||
          !props.track) && (
          <div className="admin-checkin-tile__right">
            {!checkin && (
              <div className="admin-checkin-tile__right__indicator--active">
                <button
                  className="button admin-checkin-tile__right__action"
                  onClick={handleCheckIn}
                >
                  Check in
                </button>
              </div>
            )}
            {checkin && !checkin.to && (
              <div className="admin-checkin-tile__right__indicator--active">
                <button
                  className="button admin-checkin-tile__right__action admin-checkin-tile__right__action--checkout"
                  onClick={handleCheckOut}
                >
                  Check out
                </button>
              </div>
            )}
            {checkin && (
              <div className="admin-checkin-tile__right__indicator--active">
                <button
                  className="button admin-checkin-tile__right__action admin-checkin-tile__right__action--delete"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CheckinTile;
