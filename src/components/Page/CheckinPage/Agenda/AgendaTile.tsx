import React, { useEffect, useState } from 'react';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';
import './style.scss';

interface Props {
  space: string;
  track: any;
  handleChange: any;
  event: EventModel;
  participant: ParticipantModel;
}

const AgendaTile = (props: Props) => {
  const [state, setState] = useState<any>({});
  const [showAllAgendas, setShowAllAgendas] = useState(false);

  const toggleShowAllAgendas = () => {
    setShowAllAgendas(!showAllAgendas);
  };

  return (
    <div className="my-schedule">
      <div className="my-schedule__action">
        <button className="button default-button" onClick={toggleShowAllAgendas}>
          {showAllAgendas ? 'Show current events only' : 'Show all events'}
        </button>
      </div>
      <div className="my-schedule__main">
        {props.event &&
          props.participant &&
          props.track
            .map((item: any) => (
              {item}
            ))}
      </div>
    </div>
  );
};

export default AgendaTile;
