import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CheckinModel from '../../../../model/CheckinModel';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';
import AgendaTile from './AgendaTile';
import './AgendaTileGroup.scss';
import { format } from 'date-fns';

interface Props {
  space: string;
  trackList: any[];
  day: string;
  participant: ParticipantModel;
  checkinData: any[];
  allCheckinData: CheckinModel[];
  event: EventModel;
  handleChange: any;
}

const AgendaTileGroup = (props: Props) => {
  return (
    <div className="agenda__tile__group">
      <div className="agenda__tile__group__date">
        {format(new Date(props.day), 'EEEE, MMMM do, yyyy') || '-'}
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
                allCheckinData={props.allCheckinData}
                trackList={props.trackList}
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
