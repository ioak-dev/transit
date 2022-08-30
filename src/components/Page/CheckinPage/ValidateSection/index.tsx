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
    const stateDate = format(new Date(state.date), 'yyyy-MM-dd');
    const participantDate = format(
      new Date(props.participant?.joiningDate),
      'yyyy-MM-dd'
    );
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

  return <div className="validate-section">validate</div>;
};

export default ValidateSection;
