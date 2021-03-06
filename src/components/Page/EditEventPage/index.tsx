import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
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
import { fetchAndSetEventItems } from '../../../actions/EventActions';
import EditEvent from '../../../components/EditEvent';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const EventListPage = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setId(query.id);
  }, [props.location.search]);

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);

  const [state, setState] = useState<EventModel>({
    name: '',
    description: '',
  });

  useEffect(() => {
    console.log(id, eventList);
    if (id && eventList) {
      const event = eventList.find((item: EventModel) => item._id === id);
      if (event) {
        setState({ ...event });
      }
    }
  }, [id, eventList]);

  const goToCreateEventPage = () => {
    history.push(`/${props.space}/event/new`);
  };

  const goToCompanyPage = (eventId: string) => {
    history.push(`/${props.space}/event/${eventId}`);
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
      history.goBack();
    });
  };

  const cancel = () => history.goBack();

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="edit-event-page">
      <Topbar title="Edit event" />
      <EditEvent id={id} space={props.space} />
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
