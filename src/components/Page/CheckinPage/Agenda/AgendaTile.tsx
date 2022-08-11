import { interval } from 'd3';
import { intervalToDuration } from 'date-fns';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';
import './AgendaTile.scss';

interface Props {
  space: string;
  track: any;
  day: string;
  participant: ParticipantModel;
}

const AgendaTile = (props: Props) => {
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
      <div className="agenda-tile__name">{props.track.name}</div>
      <div className="agenda-tile__description">{props.track.description}</div>
      <div className="agenda-tile__time">
        <div>
          {moment(props.track.from).format('h:mm a')}
          {/* {moment(props.track.from).format('h:mm a') || '-'}&nbsp;to&nbsp;
          {moment(props.track.to).format('MMMM Do, h:mm a') || '-'} */}
        </div>
        <div>{duration}</div>
      </div>
    </div>
  );
};

export default AgendaTile;
