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
import TrackModel from '../../../model/TrackModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import EventModel from 'src/model/EventModel';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const TrackListPage = (props: Props) => {
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);
  const trackList = useSelector((state: any) => state.track.items);

  const [eventId, setEventId] = useState<string | null>(null);
  const [event, setEvent] = useState<EventModel | null>(null);

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setEventId(query.eventId);
  }, [props.location.search]);

  useEffect(() => {
    const _event = eventList.find((item: EventModel) => item._id === eventId);
    setEvent(_event);
  }, [eventList, eventId]);

  const goToCreateTrackPage = () => {
    history.push(`/${props.space}/track?eventId=${event?._id || ''}`);
  };

  const goToEditTrackPage = (track: TrackModel) => {
    history.push(
      `/${props.space}/track?eventId=${track.eventId}&id=${track._id}`
    );
  };

  const goToEditEventPage = () => {
    history.push(`/${props.space}/event?id=${eventId}`);
  };

  const goToCompanyPage = (trackId: string) => {
    history.push(`/${props.space}/track/${trackId}`);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="track-list-page">
      <Topbar
        title={event?.name || ''}
        left={
          <button onClick={goToEditEventPage}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        }
      >
        <button className="button default-button" onClick={goToCreateTrackPage}>
          New track
        </button>
      </Topbar>
      <div className="track-list-page__main">
        {trackList.map((item: TrackModel) => (
          <button
            className="button track-list-page__main__item"
            key={item._id}
            onClick={() => goToEditTrackPage(item)}
          >
            <div className="track-list-page__main__item__name">{item.name}</div>
            <div className="track-list-page__main__item__description">
              {item.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrackListPage;
