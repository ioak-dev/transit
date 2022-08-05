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
  faCircleInfo,
  faFeed,
  faHand,
  faHands,
  faHandsClapping,
  faInfo,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
import NewsFeed from '../NewsFeed';

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
  const [participantMap, setParticipantMap] = useState<any>({});
  let [showEvents, setShowEvents] = useState<string>('Members');

  useEffect(() => {
    DisableContextBarCommand.next(true);
    fetchParticipantsByGroupData();
  }, []);

  const fetchParticipantsByGroupData = () => {
    getParticipantsByGroup(props.space, props.group).then(
      (response: ParticipantModel[]) => {
        setParticipantsByGroup(response);
        const _participantMap: any = {};
        response.forEach((item: ParticipantModel) => {
          _participantMap[item._id || ''] = item;
        });
        setParticipantMap(_participantMap);
      }
    );
  };

  const groupDetail = JSON.parse(props.event.group)?.find(
    (item: any) => item.name === props.group
  );

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
        </div>
        <div
          className={`set_item ${showEvents === 'Events' ? 'active' : ''}`}
          onClick={() => setShowEvents('Events')}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </div>
        <div
          className={`set_item ${showEvents === 'About' ? 'active' : ''}`}
          onClick={() => setShowEvents('About')}
        >
          <FontAwesomeIcon icon={faCircleInfo} />
        </div>
        <div
          className={`set_item ${showEvents === 'Feed' ? 'active' : ''}`}
          onClick={() => setShowEvents('Feed')}
        >
          <FontAwesomeIcon icon={faFeed} />
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
      {showEvents === 'About' && <div>{groupDetail?.description}</div>}
      {showEvents === 'Feed' && (
        <NewsFeed
          event={props.event}
          handleChange={fetchParticipantsByGroupData}
          location={props.location}
          space={props.space}
          participant={props.participant}
          tracks={props.tracks}
          participantMap={participantMap}
        />
      )}
    </div>
  );
};

export default GroupSection;
