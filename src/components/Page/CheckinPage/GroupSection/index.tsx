import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from '../../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import EventModel from '../../../../model/EventModel';
import { getParticipantsByGroup } from '../service';
import { group } from 'd3';

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
  const [participantsByGroup, setParticipantsByGroup] = useState<any[]>([]);
  const [showEvents, setShowEvents] = useState<boolean>(false);

  useEffect(() => {
    DisableContextBarCommand.next(true);
    fetchParticipantsByGroupData();
  }, []);

  const fetchParticipantsByGroupData = () => {
    getParticipantsByGroup(props.space, props.group).then((response: any) => {
      setParticipantsByGroup(response);
    });
  };

  return (
    <div className="group-section">
      <div className="set">
        <div
          className={`set_item ${showEvents ? '' : 'active'}`}
          onClick={() => setShowEvents(false)}
        >
          Members
        </div>
        <div
          className={`set_item ${showEvents ? 'active' : ''}`}
          onClick={() => setShowEvents(true)}
        >
          Events
        </div>
      </div>
      {!showEvents && (
        <div>
          {participantsByGroup.map((participant: any) => (
            <div className="group-section__item" key={participant.firstName}>
              <div className="group-section__main__item">
                {participant.firstName}
              </div>
            </div>
          ))}
        </div>
      )}
      {showEvents &&
        props.tracks
          .filter((item) => item.group === props.group)
          .map((item) => (
            <div className="group-section__item" key={item.name}>
              <div className="group-section__main__item">{item.name}</div>
            </div>
          ))}
    </div>
  );
};

export default GroupSection;
