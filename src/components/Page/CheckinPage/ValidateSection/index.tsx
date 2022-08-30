import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faChevronRight,
  faPhone,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import ParticipantModel from '../../../../model/ParticipantModel';
import EventModel from '../../../../model/EventModel';
import { registerIn } from '../service';
import AddSpinnerCommand from '../../../../events/AddSpinnerCommand';
import { newId } from '../../../../events/MessageService';
import RemoveSpinnerCommand from '../../../../events/RemoveSpinnerCommand';
import { registerInReg } from '../Agenda/service';

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleValidation: any;
  checkinData: any[];
  isEventStarted: boolean;
  isEventEnded: boolean;
  isRegistered: boolean;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
}

const ValidateSection = (props: Props) => {
  const [showError, setshowError] = useState(false);

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const getDateTimeString = (_date: Date) => {
    return format(_date, 'yyyy-MM-dd');
  };

  const [state, setState] = useState<any>({
    date: getDateTimeString(new Date()),
  });

  const handleChange = (track: any) => {
    setState({
      ...state,
      [track.currentTarget.name]: track.currentTarget.value,
    });
  };

  const checkIn = () => {
    const spinnerTaskId = newId();
    AddSpinnerCommand.next(spinnerTaskId);
    registerInReg(
      props.space,
      props.event._id || '',
      props.participant._id || '',
      'NA'
    ).then((response) => {
      RemoveSpinnerCommand.next(spinnerTaskId);
    });
    props.handleValidation();
  };

  const hideError = () => {
    setshowError(false);
  };

  return (
    <div className="validate-section">
      {!props.isEventStarted && !props.isRegistered && (
        <div className="validate-section__register">
          <div>Event details</div>
          <button
            className="button validate-section__register__button"
            onClick={checkIn}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default ValidateSection;
