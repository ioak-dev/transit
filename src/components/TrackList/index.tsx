import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import ReceiptModel from '../../model/ReceiptModel';
import TrackModel from '../../model/TrackModel';
import Topbar from '../../components/Topbar';
import DisableContextBarCommand from '../../events/DisableContextBarCommand';
import EventModel from '../../model/EventModel';
import { formatDateTimeText } from '../Lib/DateUtils';

interface Props {
  space: string;
  eventId?: string | null;
}

const TrackList = (props: Props) => {
  const navigate = useNavigate();

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
    navigate(`/${props.space}/track?eventId=${event?._id || ''}`);
  };

  const goToEditTrackPage = (track: TrackModel) => {
    navigate(
      `/${props.space}/track?eventId=${track.eventId}&id=${track._id}`
    );
  };

  const goToEditEventPage = () => {
    navigate(`/${props.space}/event?id=${props.eventId}`);
  };

  const goToCompanyPage = (trackId: string) => {
    navigate(`/${props.space}/track/${trackId}`);
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
              {`${formatDateTimeText(
                new Date(item.from || new Date())
              )} to ${formatDateTimeText(new Date(item.to || new Date()))}`}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrackList;
