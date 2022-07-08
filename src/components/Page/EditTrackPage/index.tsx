import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import TrackModel from '../../../model/TrackModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import Footer from '../../../components/Footer';
import { saveTrack } from './service';
import { fetchAndSetTrackItems } from '../../../actions/TrackActions';
import EventModel from 'src/model/EventModel';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const TrackListPage = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [id, setId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [event, setEvent] = useState<EventModel | null>(null);

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setId(query.id);
    setEventId(query.eventId);
  }, [props.location.search]);

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);
  const trackList = useSelector((state: any) => state.track.items);

  const [state, setState] = useState<TrackModel>({
    name: '',
    description: '',
    eventId: '',
    from: '',
    icon: '',
    to: '',
  });

  useEffect(() => {
    if (id && trackList) {
      const track = trackList.find((item: TrackModel) => item._id === id);
      if (track) {
        setState({ ...track });
      }
    }
  }, [id, trackList]);

  useEffect(() => {
    console.log(eventId, eventList);
    if (eventId && eventList) {
      const _event = eventList.find((item: TrackModel) => item._id === eventId);
      if (_event) {
        setEvent(_event);
      }
    }
  }, [eventId, eventList]);

  const goToCreateTrackPage = () => {
    history.push(`/${props.space}/track/new`);
  };

  const goToCompanyPage = (trackId: string) => {
    history.push(`/${props.space}/track/${trackId}`);
  };

  const handleChange = (track: any) => {
    setState({
      ...state,
      [track.currentTarget.name]: track.currentTarget.value,
    });
  };

  const save = (event: any) => {
    event.preventDefault();
    saveTrack(props.space, { ...state, eventId }, authorization).then(
      (response: any) => {
        dispatch(fetchAndSetTrackItems(props.space, authorization));
        history.goBack();
      }
    );
  };

  const cancel = () => history.goBack();

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="edit-track-page">
      <Topbar title={`${event?.name} > Edit track`} />
      <div className="edit-track-page__main">
        <form className="form" onSubmit={save}>
          <div>
            <label>Name</label>
            <input name="name" onInput={handleChange} value={state.name} />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              onInput={handleChange}
              value={state.description}
            />
          </div>
          <input type="submit" hidden />
        </form>
      </div>
      <Footer>
        <div className="footer-action">
          <button className="button primary-button" onClick={save}>
            <FontAwesomeIcon icon={faCheck} />
            Save
          </button>
          <button className="button default-button" onClick={cancel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </Footer>
    </div>
  );
};

export default TrackListPage;
