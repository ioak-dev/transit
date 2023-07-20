import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import EventModel from '../../../model/EventModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import Footer from '../../../components/Footer';
import { saveEvent } from './service';
import { fetchAndSetEventItems } from '../../../store/actions/EventActions';
import EditEvent from '../../../components/EditEvent';

interface Props {
  space: string;
  location: any;
}

const EventListPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);

  const [state, setState] = useState<EventModel>({
    name: '',
    description: '',
    code: '',
  });

  useEffect(() => {
    console.log(searchParams.get('id'), eventList);
    if (searchParams.has('id') && eventList) {
      const event = eventList.find((item: EventModel) => item._id === searchParams.get('id'));
      if (event) {
        setState({ ...event });
      }
    }
  }, [searchParams, eventList]);

  const goToCreateEventPage = () => {
    navigate(`/${props.space}/event/new`);
  };

  const goToCompanyPage = (eventId: string) => {
    navigate(`/${props.space}/event/${eventId}`);
  };

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const save = (event: any) => {
    event.preventDefault();
    saveEvent(props.space, state, authorization).then((response: any) => {
      dispatch(fetchAndSetEventItems(props.space, authorization));
      navigate(-1);
    });
  };

  const cancel = () => navigate(-1);

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="edit-event-page">
      <Topbar title="Edit event" />
      <EditEvent id={searchParams.get('id')} space={props.space} />
      <div className="edit-event-page__main">
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

export default EventListPage;
