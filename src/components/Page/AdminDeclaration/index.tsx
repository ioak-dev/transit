import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addDays, format } from 'date-fns';
import {
  faCheck,
  faPen,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ParticipantModel from '../../../model/ParticipantModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import EventModel from '../../../model/EventModel';

const queryString = require('query-string');

interface Props {
  space: string;
  eventId?: string | null;
}

const AdminDeclaration = (props: Props) => {
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);
  // const participantList = useSelector((state: any) => state.participant.items);

  const participantList = useSelector((state: any) =>
    state.participant.items
  );

  const [event, setEvent] = useState<EventModel | null>(null);
  const [selectedDeclare, setSelectedDeclare] = useState<string[]>([]);

  useEffect(() => {
    const _event = eventList.find(
      (item: EventModel) => item._id === props.eventId
    );
    setEvent(_event);
  }, [eventList, props.eventId]);

  const goToCreateParticipantPage = () => {
    history.push(`/${props.space}/participant?eventId=${event?._id || ''}`);
  };

  const goToEditParticipantPage = (participant: ParticipantModel) => {
    history.push(
      `/${props.space}/participant?eventId=${participant.eventId}&id=${participant._id}`
    );
  };

  const goToEditEventPage = () => {
    history.push(`/${props.space}/event?id=${props.eventId}`);
  };

  const goToCompanyPage = (participantId: string) => {
    history.push(`/${props.space}/participant/${participantId}`);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const selected = (declare: any) => {
    const _selectedDeclare = [...selectedDeclare];
    _selectedDeclare.indexOf(declare) === -1
      ? _selectedDeclare.push(declare)
      : _selectedDeclare.splice(_selectedDeclare.indexOf(declare), 1);
    setSelectedDeclare(_selectedDeclare);
  };

  return (
    <div className="participant-list">
      <Topbar
        alternateView
        // title={event?.name || ''}
        // title="Declaration - Before Travel/After Travel"
        title={`Declaration - ${
          selectedDeclare.includes('declared')
            ? 'Before Travel'
            : ''
        }${
          selectedDeclare.includes('not-declared')
            ? 'After Travel'
            : ''
        }`}
      />
      <div className="participant-list__main">
        {participantList.map((item: ParticipantModel) => (
          <button
            className="button participant-list__main__item"
            key={item._id}
          >
            {/* <pre>{JSON.stringify(item)}</pre> */}
            <div className="participant-list__main__item__name">
              {`${item.firstName} ${item.lastName}`}
              {item.firstDeclaration && (
                <div className="declare-list__indicator declare-list__indicator--online" />
              )}
              {item.secondDeclaration && (
                <div className="declare-list__indicator declare-list__indicator--away" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="declare-list">
        <button
          className={`button declare ${
            selectedDeclare.includes('declared') ? 'active' : ''
          }`}
          onClick={() => selected('declared')}
        >
          {/* <div className="declare-list__indicator declare-list__indicator--declared" /> */}
          <div className="declare-list__text">Declared</div>
        </button>
        <button
          className={`button declare ${
            selectedDeclare.includes('not-declared') ? 'active' : ''
          }`}
          onClick={() => selected('not-declared')}
        >
          {/* <div className="declare-list__indicator declare-list__indicator--not-declared" /> */}
          <div className="declare-list__text">Not Declared</div>
        </button>
      </div>
    </div>
  );
};

export default AdminDeclaration;
