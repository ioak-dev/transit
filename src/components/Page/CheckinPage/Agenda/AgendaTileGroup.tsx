import moment from 'moment';
import React, { useEffect, useState } from 'react';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';
import AgendaTile from './AgendaTile';
import './AgendaTileGroup.scss';

interface Props {
  space: string;
  trackList: any[];
  day: string;
}

const AgendaTileGroup = (props: Props) => {
  return (
    <div className="agenda__tile__group">
      <div className="agenda__tile__group__date">
        {moment(props.day).format("MMMM Do, YYYY") || '-'}
      </div>
      {props.trackList.map((track) => (
        <AgendaTile space={props.space} track={track} key={track._id} day={props.day} />
      ))}
    </div>
  );
};

export default AgendaTileGroup;
