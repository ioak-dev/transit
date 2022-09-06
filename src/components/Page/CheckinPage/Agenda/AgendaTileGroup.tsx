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
  participant: ParticipantModel;
  checkinData: any[];
  event: EventModel;
  handleChange: any;
}

const AgendaTileGroup = (props: Props) => {
  return (
    <div className="agenda__tile__group">
      <div className="agenda__tile__group__date">
        {moment(props.day).format('MMMM Do, YYYY') || '-'}
      </div>
      <div className="agenda__tile__group__list">
        {props.trackList.map((track) => (
          <>
            {(!track.group ||
              props.participant.groups.includes(track.group)) && (
              <AgendaTile
                space={props.space}
                track={track}
                key={track._id}
                day={props.day}
                participant={props.participant}
                checkinData={props.checkinData}
                event={props.event}
                handleChange={props.handleChange}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default AgendaTileGroup;
