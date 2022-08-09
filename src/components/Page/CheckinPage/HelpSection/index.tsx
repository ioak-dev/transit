import React, { useEffect } from 'react';
import './style.scss';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
}

const HelpSection = (props: Props) => {
  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const supportList = JSON.parse(props.event.support);

  return (
    <div className="help">
      {supportList.map((support: any) => (
        <div className="help__item" key={support.name}>
          <div className="help__item__label">{support.name}</div>
          <div className="help__item__phone">
            <a href={`tel:${support.telephone}`}>
              <FontAwesomeIcon icon={faPhone} />
            </a>
            {support.phone}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelpSection;
