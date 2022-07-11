import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import EventModel from '../../../model/EventModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const EditEventPage = (props: Props) => {
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);

  const goToCreateEventPage = () => {
    history.push(`/${props.space}/event`);
  };

  const goToEditEventPage = (event: EventModel) => {
    history.push(`/${props.space}/event?id=${event._id}`);
  };

  const goToTrackListPage = (event: EventModel) => {
    history.push(`/${props.space}/tracklist?eventId=${event._id}`);
  };

  const goToManageEventPage = (event: EventModel) => {
    history.push(`/${props.space}/event/${event._id}`);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="event-list-page">
      <Topbar title="Event list">
        <button className="button default-button" onClick={goToCreateEventPage}>
          New event
        </button>
      </Topbar>
      <div className="event-list-page__main">
        {eventList.map((item: EventModel) => (
          <button
            className="button event-list-page__main__item"
            key={item._id}
            onClick={() => goToManageEventPage(item)}
          >
            <div className="event-list-page__main__item__name">{item.name}</div>
            <div className="event-list-page__main__item__description">
              {item.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditEventPage;
