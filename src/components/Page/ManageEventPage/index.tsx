import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addDays, format } from 'date-fns';
import {
  faCalendar,
  faCheck,
  faPen,
  faPlus,
  faRss,
  faTimes,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import EventModel from '../../../model/EventModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import Footer from '../../../components/Footer';
import { fetchAndSetEventItems } from '../../../actions/EventActions';
import EditEventPage from '../EditEventPage';
import EditEvent from '../../../components/EditEvent';
import TrackList from '../../../components/TrackList';
import ParticipantList from '../../../components/ParticipantList';
import FeedList from '../../../components/FeedList';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const ManageEventPage = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [view, setView] = useState<'details' | 'tracklist' | 'users' | 'feed'>(
    'details'
  );
  const params: { id: string } = useParams();
  useEffect(() => {
    console.log(params);
  }, [params]);

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setView(query.view || 'details');
  }, [props.location.search]);

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);

  const [state, setState] = useState<EventModel>({
    name: '',
    description: '',
    code: '',
  });

  useEffect(() => {
    console.log(params.id, eventList);
    if (params.id && eventList) {
      const event = eventList.find(
        (item: EventModel) => item._id === params.id
      );
      if (event) {
        setState({ ...event });
      }
    }
  }, [params.id, eventList]);

  const goToCreateEventPage = () => {
    history.push(`/${props.space}/event/new`);
  };

  const goToCompanyPage = (eventId: string) => {
    history.push(`/${props.space}/event/${eventId}`);
  };

  const cancel = () => history.goBack();

  const changeView = (_view: 'details' | 'tracklist' | 'users' | 'feed') => {
    history.push(`/${props.space}/event/${params.id}?view=${_view}`);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="manage-event-page">
      <Topbar title={`Manage event > ${view}`}>
        <div className="topbar-action-group">
          <button
            className={`button ${view === 'details' ? 'active' : ''}`}
            onClick={() => changeView('details')}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            className={`button ${view === 'tracklist' ? 'active' : ''}`}
            onClick={() => changeView('tracklist')}
          >
            <FontAwesomeIcon icon={faCalendar} />
          </button>
          <button
            className={`button ${view === 'users' ? 'active' : ''}`}
            onClick={() => changeView('users')}
          >
            <FontAwesomeIcon icon={faUsers} />
          </button>
          <button
            className={`button ${view === 'feed' ? 'active' : ''}`}
            onClick={() => changeView('feed')}
          >
            <FontAwesomeIcon icon={faRss} />
          </button>
        </div>
      </Topbar>
      <div className="manage-event-page__main">
        {view === 'details' && <EditEvent space={props.space} id={params.id} />}
        {view === 'tracklist' && (
          <TrackList eventId={params.id} space={props.space} />
        )}
        {view === 'users' && (
          <ParticipantList eventId={params.id} space={props.space} />
        )}
        {view === 'feed' && <FeedList eventId={params.id} space={props.space} />}
      </div>
      {/* <Footer>
        <div className="footer-action">
          <button className="button primary-button" onClick={save}>
            <FontAwesomeIcon icon={faCheck} />
            Save
          </button>
          <button className="button default-button" onClick={cancel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </Footer> */}
    </div>
  );
};

export default ManageEventPage;
