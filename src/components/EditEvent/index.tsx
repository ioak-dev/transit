import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../model/ReceiptModel';
import EventModel from '../../model/EventModel';
import Topbar from '../../components/Topbar';
import DisableContextBarCommand from '../../events/DisableContextBarCommand';
import Footer from '../../components/Footer';
import { saveEvent } from './service';
import { fetchAndSetEventItems } from '../../actions/EventActions';

const queryString = require('query-string');

interface Props {
  space: string;
  id?: string | null;
}

const EditEvent = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);

  const [state, setState] = useState<EventModel>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (props.id && eventList) {
      const event = eventList.find((item: EventModel) => item._id === props.id);
      if (event) {
        setState({ ...event });
      }
    }
  }, [props.id, eventList]);

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
    <div className="edit-event">
      <div className="edit-event__main">
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

export default EditEvent;
