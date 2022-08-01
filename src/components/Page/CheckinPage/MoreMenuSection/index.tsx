import React, { useEffect } from 'react';
import './style.scss';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faQuestion } from '@fortawesome/free-solid-svg-icons';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  goToPage: any;
  page: 'schedule' | 'agenda' | 'map' | 'user' | 'help' | 'more';
}

const MoreMenuSection = (props: Props) => {
  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="more-menu-section">
      <button
        onClick={() => props.goToPage('help')}
        className={`button more-menu-section__button ${
          props.page === 'help' ? 'more-menu-section__button--active' : ''
        }`}
      >
        <div className="more-menu-section__button__label">
          <FontAwesomeIcon icon={faQuestion} />
          <div className="more-menu-section__button__label__text">Help</div>
        </div>
      </button>
    </div>
  );
};

export default MoreMenuSection;
