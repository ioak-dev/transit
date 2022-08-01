import React, { useEffect, useState } from 'react';
import './style.scss';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleValidation: any;
}

const ValidateSection = (props: Props) => {
  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const getDateTimeString = (_date: Date) => {
    return format(_date, "yyyy-MM-dd'T'HH:mm");
  };

  const [state, setState] = useState<any>({
    date: getDateTimeString(new Date()),
  });

  const handleChange = (track: any) => {
    setState({
      ...state,
      [track.currentTarget.name]: track.currentTarget.value,
    });
    console.log(state.date);
    const stateDate = format(new Date(state.date), 'yyyy-MM-dd');
    const participantDate = format(
      new Date(props.participant?.joiningDate),
      'yyyy-MM-dd'
    );
    console.log(participantDate, stateDate);
    if (participantDate === stateDate) {
      sessionStorage.setItem('joiningDate', stateDate);
      props.handleValidation();
    }
  };

  return (
    <div className="validate_section">
      <div className="validate_section__item__label">
        Enter joining date to Check-In
      </div>
      <input
        type="datetime-local"
        name="date"
        onInput={handleChange}
        value={state.date}
      />
      <button className="circle-button" onClick={handleChange}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default ValidateSection;
