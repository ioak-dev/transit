import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';

interface Props {
  space: string;
  location: any;
  handleValidation: any;
  eventId: string;
  referenceIdList: any;
  emailToReferenceIdMap: any;
}

const ParticipantSelectSection = (props: Props) => {
  const [showError, setshowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const getDateTimeString = (_date: Date) => {
    return format(_date, 'yyyy-MM-dd');
  };

  const [state, setState] = useState<any>({
    id: '',
  });

  const handleChange = (track: any) => {
    setState({
      ...state,
      [track.currentTarget.name]: track.currentTarget.value,
    });
  };

  const checkIn = () => {
    if (state.id && props.referenceIdList.includes(state.id)) {
      navigate(`/${props.space}/checkin/${props.eventId}/${state.id}`);
    } else if (
      state.id &&
      Object.keys(props.emailToReferenceIdMap).includes(state.id.toLowerCase())
    ) {
      navigate(
        `/${props.space}/checkin/${props.eventId}/${
          props.emailToReferenceIdMap[state.id.toLowerCase()]
        }`
      );
    } else {
      setshowError(true);
    }
  };

  const hideError = () => {
    setshowError(false);
  };

  return (
    <div className="participant-select-section">
      <div className="participant-select-section__item__label">
        Please enter your employee ID or e-mail
      </div>
      <input
        name="id"
        onInput={handleChange}
        onFocus={hideError}
        value={state.id}
      />
      {showError && (
        <div className="errorText">Employee ID / e-mail does not exist</div>
      )}
      <button className="circle-button" onClick={checkIn}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default ParticipantSelectSection;
