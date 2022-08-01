import moment from 'moment';
import React, { useEffect, useState } from 'react';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';
import './AgendaTile.scss';

interface Props {
  space: string;
  track: any;
  day: string;
}

const AgendaTile = (props: Props) => {
  return (
    <div className="button agenda-tile" key={props.track._id}>
      <div className="agenda-tile__name">{props.track.name}</div>
      <div className="agenda-tile__description">{props.track.description}</div>
      <div className="agenda-tile__time">
        {moment(props.track.from).format('h:mm a') || '-'}&nbsp;to&nbsp;
        {moment(props.track.to).format('MMMM Do, h:mm a') || '-'}
      </div>
    </div>
  );
};

export default AgendaTile;
