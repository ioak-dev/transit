import React, { useEffect, useState } from 'react';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';
import './style.scss';

interface Props {
  space: string;
  track: any;
}

const AgendaTile = (props: Props) => {
  return <div className="agenda-tile">{props.track.name}</div>;
};

export default AgendaTile;
