import React, { useEffect } from 'react';
import './style.scss';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

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
          {support.type === 'phone' && (
            <div className="help__item__phone">
              <div className="help__item__phone__label">
                {support.name} &nbsp;
                <span className="help__item__phone__sub">
                  {support.subtitle}
                </span>
              </div>
              <div className="help__item__phone__phone">
                <a href={`tel:${support.phone}`}>
                  <FontAwesomeIcon icon={faPhone} />
                </a>
                {support.phone}
              </div>
            </div>
          )}

          {support.type === 'title' && (
            <div className="help__item__title">{support.name}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HelpSection;
