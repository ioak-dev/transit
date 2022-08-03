import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from '../../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import EventModel from '../../../../model/EventModel';
import { getParticipantsByGroup } from '../service';
import { group } from 'd3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faHand,
  faHands,
  faHandsClapping,
  faInfo,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';

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
  let [showEvents, setShowEvents] = useState<string>('Members');

  useEffect(() => {
    DisableContextBarCommand.next(true);
    fetchParticipantsByGroupData();
  }, []);

  const fetchParticipantsByGroupData = () => {
    getParticipantsByGroup(props.space, props.group).then((response: any) => {
      setParticipantsByGroup(response);
    });
  };

  const groupDetail = JSON.parse(props.event.group)?.find(
    (item: any) => item.name === props.group
  );
  console.log(groupDetail);

  return (
    <div className="group-section">
      <div className="group-section__caption">
        {groupDetail?.caption}&nbsp;
        <FontAwesomeIcon icon={faHandsClapping} />
      </div>
      <div className="set">
        <div
          className={`set_item ${showEvents === 'Members' ? 'active' : ''}`}
          onClick={() => setShowEvents('Members')}
        >
          <FontAwesomeIcon icon={faPeopleGroup} />
          Members
        </div>
        <div
          className={`set_item ${showEvents === 'Events' ? 'active' : ''}`}
          onClick={() => setShowEvents('Events')}
        >
          <FontAwesomeIcon icon={faCalendar} />
          Events
        </div>
        <div
          className={`set_item ${showEvents === 'About' ? 'active' : ''}`}
          onClick={() => setShowEvents('About')}
        >
          <FontAwesomeIcon icon={faInfo} />
          About
        </div>
      </div>
      {showEvents === 'Members' && (
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
      {showEvents === 'Events' &&
        props.tracks
          .filter((item) => item.group === props.group)
          .map((item) => (
            <div className="group-section__item" key={item.name}>
              <div className="group-section__main__item">{item.name}</div>
            </div>
          ))}
      {showEvents === 'About' && (
        // {aboutDetails.map((item: any) => (
        //     <div className="group-section__item" key={item.name}>
        //       <div className="group-section__main__item">{item.name}</div>
        //     </div>
        //   ))}
        <div>{groupDetail?.description}</div>
      )}
    </div>
  );
};

export default GroupSection;
