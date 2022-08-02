import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from '../../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import EventModel from '../../../../model/EventModel';
import { getParticipantsByGroup } from '../service';

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
  group: string;
}

const GroupSection = (props: Props) => {
  const [participantsByGroupList, setParticipantsByGroup] = useState<any[]>([]);

  useEffect(() => {
    DisableContextBarCommand.next(true);
    fetchParticipantsByGroupData();
  }, []);

  const fetchParticipantsByGroupData = () => {
    getParticipantsByGroup(props.space, props.group).then((response: any) => {
      setParticipantsByGroup(response);
    });
  };
  console.log(participantsByGroupList);

  return (
    <div className="group-section">
      <div className="set">        
        <div className="set_item active">Members</div>
        <div className="set_item">Events</div>
      </div>
      {participantsByGroupList.map((participant: any) => (
        <div className="group-section__item" key={participant.firstName}>
          <div className="participant-list__main__item">{participant.firstName}</div>
        </div>
      ))}
    </div>
  );
};

export default GroupSection;
