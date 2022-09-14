import { interval } from 'd3';
import { format, intervalToDuration } from 'date-fns';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faMap,
  faMapLocationDot,
  faRss,
} from '@fortawesome/free-solid-svg-icons';

import React, { useEffect, useRef, useState } from 'react';
import RemoveSpinnerCommand from '../../../../events/RemoveSpinnerCommand';
import AddSpinnerCommand from '../../../../events/AddSpinnerCommand';
import { newId } from '../../../../events/MessageService';
import EventModel from '../../../../model/EventModel';
import ParticipantModel from '../../../../model/ParticipantModel';
import './AgendaTile.scss';
import { registerInReg, registerOutReg } from './service';
import { registerIn, registerOut } from '../service';
import TrackModel from '../../../../model/TrackModel';
import CheckinModel from '../../../../model/CheckinModel';
import { isEmptyOrSpaces } from '../../../../components/Utils';

interface Props {
  space: string;
  track: any;
  trackList?: any[];
  day: string;
  participant: ParticipantModel;
  checkinData: any[];
  allCheckinData?: CheckinModel[];
  event: EventModel;
  handleChange: any;
}

const AgendaTile = (props: Props) => {
  const [duration, setDuration] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isTrackStarted, setIsTrackStarted] = useState(false);
  const [isTrackEnded, setIsTrackEnded] = useState(false);
  const trackRef = useRef<TrackModel>();

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
    trackRef.current = props.track;
  }, props.track);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    if (trackRef.current) {
      setIsTrackStarted(!(new Date(trackRef.current.from) > new Date()));
      setIsTrackEnded(!(new Date(props.track.to) < new Date()));
    }
    setTimeout(() => {
      if (trackRef.current) {
        setIsTrackStarted(!(new Date(trackRef.current.from) > new Date()));
        setIsTrackEnded(!(new Date(props.track.to) < new Date()));
      }
      refreshData();
    }, 1000);
  };

  useEffect(() => {
    let _isRegistered = false;
    let _isCheckedIn = false;
    let _isCheckedOut = false;
    if (props.checkinData?.length > 0) {
      const checkin = props.checkinData.find(
        (item: any) =>
          item.trackId === props.track._id &&
          item.participantId === props.participant._id
      );
      _isRegistered = !!checkin?.register;
      _isCheckedIn = !!checkin?.from;
      _isCheckedOut = !!checkin?.to;
    }
    setIsRegistered(_isRegistered);
    setIsCheckedIn(_isCheckedIn);
    setIsCheckedOut(_isCheckedOut);
  }, [props.checkinData, props.participant, props.track]);

  const handleRegIn = () => {
    const spinnerId = newId();
    AddSpinnerCommand.next(spinnerId);
    registerInReg(
      props.space,
      props.event?._id || '',
      props.participant?._id || '',
      props.track._id || ''
    ).then((response: any) => {
      RemoveSpinnerCommand.next(spinnerId);
      props.handleChange();
    });
  };

  const handleRegOut = () => {
    const spinnerId = newId();
    AddSpinnerCommand.next(spinnerId);
    registerOutReg(
      props.space,
      props.event?._id || '',
      props.participant?._id || '',
      props.track._id || ''
    ).then((response: any) => {
      RemoveSpinnerCommand.next(spinnerId);
      props.handleChange();
    });
  };

  const handleCheckIn = () => {
    if (props.event.code || props.track.code) {
      // setShowQrReader(true);
    } else {
      const spinnerId = newId();
      AddSpinnerCommand.next(spinnerId);
      registerIn(
        props.space,
        props.event?._id || '',
        props.participant?._id || '',
        props.track._id || '',
        123
      ).then((response: any) => {
        RemoveSpinnerCommand.next(spinnerId);
        props.handleChange();
      });
    }
  };

  const handleCheckOut = () => {
    const spinnerId = newId();
    AddSpinnerCommand.next(spinnerId);
    registerOut(
      props.space,
      props.event?._id || '',
      props.participant?._id || '',
      props.track._id || ''
    ).then((response: any) => {
      RemoveSpinnerCommand.next(spinnerId);
      props.handleChange();
    });
  };

  return (
    <div
      className={`button agenda-tile ${
        props.track.group &&
        !props.participant.groups.includes(props.track.group)
          ? 'agenda-tile--na'
          : ''
      }`}
      key={props.track._id}
    >
      {new Date(props.track.from) <= new Date() &&
        new Date(props.track.to) > new Date() && (
          <div className="agenda-tile__live">
            <div className="agenda-tile__live__container">
              <div>
                <FontAwesomeIcon icon={faRss} />
              </div>
              <div>LIVE</div>
            </div>
          </div>
        )}
      <div className="agenda-tile__name">{props.track.name}</div>
      <div className="agenda-tile__location">
        <div>
          <FontAwesomeIcon icon={faLocationDot} />
        </div>
        <div>{props.track.location}</div>
      </div>
      <div className="agenda-tile__description">{props.track.description}</div>
      <div className="agenda-tile__time">
        <div>
          {format(new Date(props.track.from), 'h:mm a')} to{' '}
          {format(new Date(props.track.to), 'h:mm a')} ({duration})
        </div>
        {/* <div>{duration}</div> */}
      </div>
      <div className="agenda-tile__action">
        <div className="agenda-tile__action__labels">
          {(isRegistered ||
            !['required', 'optional'].includes(props.track.registration)) && (
            <div className="agenda-tile__action__labels__label">Registered</div>
          )}
          {isCheckedIn &&
            !isCheckedOut &&
            new Date(props.track.to) > new Date() && (
              <div className="agenda-tile__action__labels__label">
                Attending
              </div>
            )}
          {isCheckedIn && (isCheckedOut || !isTrackEnded) && (
            <div className="agenda-tile__action__labels__label">Attended</div>
          )}
        </div>
        <div className="agenda-tile__action_actions">
          {!isTrackStarted &&
            !isRegistered &&
            ['required', 'optional'].includes(props.track.registration) && (
              <button
                className="button agenda-tile__action_actions__button agenda-tile__action_actions__button--primary"
                onClick={handleRegIn}
              >
                Register
              </button>
            )}
          {!isTrackStarted &&
            isRegistered &&
            ['required', 'optional'].includes(props.track.registration) && (
              <button
                className="button agenda-tile__action_actions__button"
                onClick={handleRegOut}
              >
                Deregister
              </button>
            )}
          {new Date(props.track.from) <= new Date() &&
            new Date(props.track.to) > new Date() &&
            !isCheckedIn && (
              <button
                className="button agenda-tile__action_actions__button agenda-tile__action_actions__button--primary"
                onClick={handleCheckIn}
              >
                Check in
              </button>
            )}
          {new Date(props.track.from) <= new Date() &&
            new Date(props.track.to) > new Date() &&
            isCheckedIn &&
            !isCheckedOut && (
              <button
                className="button agenda-tile__action_actions__button"
                onClick={handleCheckOut}
              >
                Check out
              </button>
            )}
        </div>
      </div>

      {!isTrackStarted &&
        !isRegistered &&
        props.track.name === 'Team Building Events - Option 1' && (
          <div className="temporary-notification-link">
            If you register for Beach Games, please complete the linked form by
            Thurs, Sept 15{' '}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScFp-f2Th-4eue7U_oYB72vtH4aipCe0CobuT2k3Rb5_YnhRw/viewform?usp=sf_link">
              Beach Games Sign Up Form
            </a>
          </div>
        )}

      {!isTrackStarted &&
        isRegistered &&
        props.track.name === 'Team Building Events - Option 1' && (
          <div className="temporary-notification-link">
            Please complete the linked form by Thurs, Sept 15
            <br />
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScFp-f2Th-4eue7U_oYB72vtH4aipCe0CobuT2k3Rb5_YnhRw/viewform?usp=sf_link">
              Beach Games Sign Up Form
            </a>
          </div>
        )}
    </div>
  );
};

export default AgendaTile;
