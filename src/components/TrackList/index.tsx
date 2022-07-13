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
import ReceiptModel from '../../model/ReceiptModel';
import TrackModel from '../../model/TrackModel';
import Topbar from '../../components/Topbar';
import DisableContextBarCommand from '../../events/DisableContextBarCommand';
import EventModel from '../../model/EventModel';

const queryString = require('query-string');

interface Props {
  space: string;
  eventId?: string | null;
}

const TrackList = (props: Props) => {
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);
  const trackList = useSelector((state: any) =>
    state.track.items.filter(
      (item: TrackModel) => item.eventId === props.eventId
    )
  );

  const [event, setEvent] = useState<EventModel | null>(null);

  useEffect(() => {
    const _event = eventList.find(
      (item: EventModel) => item._id === props.eventId
    );
    setEvent(_event);
  }, [eventList, props.eventId]);

  const goToCreateTrackPage = () => {
    history.push(`/${props.space}/track?eventId=${event?._id || ''}`);
  };

  const goToEditTrackPage = (track: TrackModel) => {
    history.push(
      `/${props.space}/track?eventId=${track.eventId}&id=${track._id}`
    );
  };

  const goToEditEventPage = () => {
    history.push(`/${props.space}/event?id=${props.eventId}`);
  };

  const goToCompanyPage = (trackId: string) => {
    history.push(`/${props.space}/track/${trackId}`);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="track-list">
      <button className="button default-button" onClick={goToCreateTrackPage}>
        New track
      </button>
      <div className="track-list__main">
        {trackList.map((item: TrackModel) => (
          <button
            className="button track-list__main__item"
            key={item._id}
            onClick={() => goToEditTrackPage(item)}
          >
            <div className="track-list__main__item__left">
              <div className="track-list__main__item__left__name">
                {item.name}
              </div>
              <div className="track-list__main__item__left__description">
                {item.description}
              </div>
            </div>
            <div className="track-list__main__item__right">
              {`${format(
                new Date(item.from || new Date()),
                'yyyy-MM-dd HH:mm'
              )} to ${format(
                new Date(item.to || new Date()),
                'yyyy-MM-dd HH:mm'
              )}`}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrackList;
