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
  console.log(props.tracks);
  console.log(props.tracks[0]?.group);
  // const groupsList = JSON.parse(props.tracks[0]?.group);
  // console.log(groupsList);

  const toggleActivePage = () => {};

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
      {showEvents && (
        <div className="group-section__item">
          <div className="group-section__main__item">eventName</div>
        </div>
      )}
    </div>
  );
};

export default GroupSection;
