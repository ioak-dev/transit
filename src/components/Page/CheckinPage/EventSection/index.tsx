import React, { useEffect } from 'react';
import './style.scss';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
}

const EventSection = (props: Props) => {
  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const eventList = JSON.parse(props.event.customFields);
  console.log(eventList);

  return (
    <div className="event">
      {eventList.map((event: any) => (
        <div className="event__item" key={event.name}>
          {event.datatype === 'number' && (
            <>
              <div className="event__item__title">{event.label}</div>
              <div className="event__item__phone">
                <div className="event__item__phone__label">
                  {event.name} &nbsp;
                </div>
                <div className="event__item__phone__phone">
                  {event.datatype}
                </div>
              </div>
            </>
          )}
          {event.datatype === 'date' && (
            <>
              <div className="event__item__title">{event.label}</div>
              <div className="event__item__phone">
                <div className="event__item__phone__label">
                  {moment(event.name).format('h:mm a')}
                </div>
                <div className="event__item__phone__phone">
                  {event.datatype}
                </div>
              </div>
            </>
          )}
          {event.datatype === 'datetime' && (
            <>
              <div className="event__item__title">{event.label}</div>
              <div className="event__item__phone">
                <div className="event__item__phone__label">
                  {moment(event.name).format('MMMM Do, h:mm a') || '-'}
                  {/* {moment(event.name).format('h:mm a')} */}
                  {/* {moment(props.track.from).format('h:mm a') || '-'}&nbsp;to&nbsp;
          {moment(props.track.to).format('MMMM Do, h:mm a') || '-'} */}
                </div>
                <div className="event__item__phone__phone">
                  {event.datatype}
                </div>
              </div>
            </>
          )}
          {event.datatype === 'string' && (
            <>
              <div className="event__item__title">{event.label}</div>
              <div className="event__item__phone">
                <div className="event__item__phone__label">
                  {event.name} &nbsp;
                </div>
                <div className="event__item__phone__phone">
                  {event.datatype}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventSection;
