import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from '../../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import EventModel from '../../../../model/EventModel';
import ParticipantTile from '../GroupSection/ParticipantTile';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  participantList: ParticipantModel[];
  event: EventModel;
  tracks: any[];
}

const People = (props: Props) => {
  const [participantsByGroup, setParticipantsByGroup] = useState<any[]>([]);
  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="people">
      {props.participantList.map((participant: any) => (
        <ParticipantTile
          participant={participant}
          key={participant.firstName}
        ></ParticipantTile>
      ))}
    </div>
  );
};

export default People;
