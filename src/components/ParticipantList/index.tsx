import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import ReceiptModel from '../../model/ReceiptModel';
import ParticipantModel from '../../model/ParticipantModel';
import Topbar from '../../components/Topbar';
import DisableContextBarCommand from '../../events/DisableContextBarCommand';
import EventModel from '../../model/EventModel';
interface Props {
  space: string;
  eventId?: string | null;
}

const ParticipantList = (props: Props) => {
  const navigate = useNavigate();

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);
  const participantList = useSelector((state: any) =>
    state.participant.items.filter(
      (item: ParticipantModel) => item.eventId === props.eventId
    )
  );

  const [event, setEvent] = useState<EventModel | null>(null);

  useEffect(() => {
    const _event = eventList.find(
      (item: EventModel) => item._id === props.eventId
    );
    setEvent(_event);
  }, [eventList, props.eventId]);

  const goToCreateParticipantPage = () => {
    navigate(`/${props.space}/participant?eventId=${event?._id || ''}`);
  };

  const goToEditParticipantPage = (participant: ParticipantModel) => {
    navigate(
      `/${props.space}/participant?eventId=${participant.eventId}&id=${participant._id}`
    );
  };

  const goToEditEventPage = () => {
    navigate(`/${props.space}/event?id=${props.eventId}`);
  };

  const goToCompanyPage = (participantId: string) => {
    navigate(`/${props.space}/participant/${participantId}`);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="participant-list">
      <button
        className="button default-button"
        onClick={goToCreateParticipantPage}
      >
        New participant
      </button>
      <div className="participant-list__main">
        {participantList.map((item: ParticipantModel) => (
          <button
            className="button participant-list__main__item"
            key={item._id}
            onClick={() => goToEditParticipantPage(item)}
          >
            <div className="participant-list__main__item__name">
              {`${item.firstName} ${item.lastName}`}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ParticipantList;
