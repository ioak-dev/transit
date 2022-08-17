import React, { useEffect, useState } from 'react';
import './style.scss';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faChevronRight,
  faPhone,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { registerIn } from '../service';
import AddSpinnerCommand from '../../../../events/AddSpinnerCommand';
import { newId } from '../../../../events/MessageService';
import RemoveSpinnerCommand from '../../../../events/RemoveSpinnerCommand';

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleValidation: any;
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
    console.log(props.participant?.joiningDate, state.date);
    const stateDate = format(new Date(state.date), 'yyyy-MM-dd');
    const participantDate = format(
      new Date(props.participant?.joiningDate),
      'yyyy-MM-dd'
    );
    console.log(participantDate, stateDate);
    if (participantDate === stateDate) {
      const spinnerTaskId = newId();
      AddSpinnerCommand.next(spinnerTaskId);
      sessionStorage.setItem('joiningDate', stateDate);
      registerIn(
        props.space,
        props.event._id || '',
        props.participant._id || '',
        'NA',
        0
      ).then((response) => {
        RemoveSpinnerCommand.next(spinnerTaskId);
      });
      props.handleValidation();
    } else {
      setshowError(!showError);
    }
  };

  const hideError = () => {
    setshowError(false);
  };

  return (
    <div className="validate_section">
      <div className="validate_section__item__label">
        When did you join Westernacher?
      </div>
      <input
        type="date"
        name="date"
        onInput={handleChange}
        onFocus={hideError}
        value={state.date}
      />
      {showError && <div className="errorText">Joining date is Incorrect!</div>}
      <button className="circle-button" onClick={checkIn}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <a href="tel:+91 7676755630" className="call-for-help">
        <FontAwesomeIcon icon={faPhone} />
        Helpdesk
      </a>
    </div>
  );
};

export default ValidateSection;
