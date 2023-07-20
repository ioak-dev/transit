import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import EditEventPage from '../EditEventPage';
import EditEvent from '../../../components/EditEvent';
import TrackList from '../../../components/TrackList';
import ParticipantList from '../../../components/ParticipantList';
import FeedList from '../../../components/FeedList';

interface Props {
  space: string;
  location: any;
}

const ManageEventPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [view, setView] = useState<'details' | 'tracklist' | 'users' | 'feed' | string>(
    'details'
  );
  const params: any = useParams();
  useEffect(() => {
    console.log(params);
  }, [params]);

  useEffect(() => {
    setView(searchParams.get('view') || 'details');
  }, [searchParams]);

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
    navigate(`/${props.space}/event/new`);
  };

  const goToCompanyPage = (eventId: string) => {
    navigate(`/${props.space}/event/${eventId}`);
  };

  const cancel = () => navigate(-1);

  const changeView = (_view: 'details' | 'tracklist' | 'users' | 'feed') => {
    navigate(`/${props.space}/event/${params.id}?view=${_view}`);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="manage-event-page">
      <Topbar title={`Manage event > ${view}`} />
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
