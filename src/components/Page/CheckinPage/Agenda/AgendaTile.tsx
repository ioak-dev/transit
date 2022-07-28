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
    <div className="button event-list-page__main__item" key={props.track._id}>
      <div className="event-list-page__main__item__name">
        {props.track.name}
      </div>
      <div className="event-list-page__main__item__description">
        {props.track.description}
      </div>
      {props.day}
    </div>
  );
};

export default AgendaTile;
