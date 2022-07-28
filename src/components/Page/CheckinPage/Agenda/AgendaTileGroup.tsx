import React, { useEffect, useState } from 'react';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';
import AgendaTile from './AgendaTile';
import './style.scss';

interface Props {
  space: string;
  trackList: any[];
  day: string;
}

const AgendaTileGroup = (props: Props) => {
  return (
    <div className="agenda-tile-group">
      {props.day}
      {props.trackList.map((track) => (
        <AgendaTile space={props.space} track={track} key={track._id} />
      ))}
    </div>
  );
};

export default AgendaTileGroup;
