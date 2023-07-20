import React, { useEffect } from 'react';
import './CustomField.scss';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { formatDateText, formatDateTimeText } from '../../../Lib/DateUtils';

interface Props {
  customField: any;
  participant: ParticipantModel;
}

const CustomField = (props: Props) => {
  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <>
      {(props.customField.datatype === 'number' ||
        props.customField.datatype === 'string') && (
        <div className="my-detail__item">
          <div className="my-detail__item__label">
            {props.customField.label}
          </div>
          <div>
            {props.participant?.customFields[props.customField.name] || '-'}
          </div>
        </div>
      )}
      {props.customField.datatype === 'date' && (
        <div className="my-detail__item">
          <div className="my-detail__item__label">
            {props.customField.label}
          </div>
          <div>
            {props.participant?.customFields[props.customField.name]
              ? formatDateText(
                  props.participant?.customFields[props.customField.name]
                )
              : '-'}
          </div>
        </div>
      )}
      {props.customField.datatype === 'datetime' && (
        <div className="my-detail__item">
          <div className="my-detail__item__label">
            {props.customField.label}
          </div>
          <div>
            {props.participant?.customFields[props.customField.name]
              ? formatDateTimeText(
                  props.participant?.customFields[props.customField.name]
                )
              : '-'}
          </div>
        </div>
      )}
    </>
    // <div className="event">
    //     <div className="event__item" key={event.name}>
    //       {event.datatype === 'number' && (
    //         <>
    //           <div className="event__item__title">{event.label}</div>
    //           <div className="event__item__phone">
    //             <div className="event__item__phone__label">
    //               {event.name} &nbsp;
    //             </div>
    //             <div className="event__item__phone__phone">
    //               {event.datatype}
    //             </div>
    //           </div>
    //         </>
    //       )}
    //       {event.datatype === 'date' && (
    //         <>
    //           <div className="event__item__title">{event.label}</div>
    //           <div className="event__item__phone">
    //             <div className="event__item__phone__label">
    //               {moment(event.name).format('h:mm a')}
    //             </div>
    //             <div className="event__item__phone__phone">
    //               {event.datatype}
    //             </div>
    //           </div>
    //         </>
    //       )}
    //       {event.datatype === 'datetime' && (
    //         <>
    //           <div className="event__item__title">{event.label}</div>
    //           <div className="event__item__phone">
    //             <div className="event__item__phone__label">
    //               {moment(event.name).format('MMMM Do, h:mm a') || '-'}
    //               {/* {moment(event.name).format('h:mm a')} */}
    //               {/* {moment(props.track.from).format('h:mm a') || '-'}&nbsp;to&nbsp;
    //       {moment(props.track.to).format('MMMM Do, h:mm a') || '-'} */}
    //             </div>
    //             <div className="event__item__phone__phone">
    //               {event.datatype}
    //             </div>
    //           </div>
    //         </>
    //       )}
    //       {event.datatype === 'string' && (
    //         <>
    //           <div className="event__item__title">{event.label}</div>
    //           <div className="event__item__phone">
    //             <div className="event__item__phone__label">
    //               {event.name} &nbsp;
    //             </div>
    //             <div className="event__item__phone__phone">
    //               {event.datatype}
    //             </div>
    //           </div>
    //         </>
    //       )}
    //     </div>
    // </div>
  );
};

export default CustomField;
