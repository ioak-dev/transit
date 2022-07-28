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

  return (
    <div className="help">
      <div className="help__item">
        <div className="help__item__label">Name</div>
        <div className="help__item__phone">
          <a href="tel:555-123-4567">
            <FontAwesomeIcon icon={faPhone} />
          </a>
          555-123-4567
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
