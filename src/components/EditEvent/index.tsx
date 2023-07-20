import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { fetchAndSetEventItems } from '../../store/actions/EventActions';
import { useNavigate } from 'react-router-dom';

interface Props {
  space: string;
  id?: string | null;
}

const EditEvent = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getDateTimeString = (_date: Date) => {
    console.log(_date);
    return format(_date, "yyyy-MM-dd'T'HH:mm");
  };

  const getDateString = (_date: Date) => {
    return format(_date, 'yyyy-MM-dd');
  };

  const authorization = useSelector((state: any) => state.authorization);
  const eventList = useSelector((state: any) => state.event.items);

  const [state, setState] = useState<EventModel>({
    name: '',
    description: '',
    venueTitle: '',
    venueDescription: '',
    notification: '',
    media: '',
    code: '',
    support: '',
    group: '',
    home: '',
    adminKey: '',
    customFields: '',
    registrationFrom: getDateTimeString(new Date()),
    registrationTo: getDateTimeString(new Date()),
    eventFrom: getDateTimeString(new Date()),
    dresscode: '',
  });

  useEffect(() => {
    if (props.id && eventList) {
      const event = eventList.find((item: EventModel) => item._id === props.id);
      if (event) {
        const registrationFrom = getDateTimeString(
          new Date(event.registrationFrom || new Date())
        );
        const registrationTo = getDateTimeString(
          new Date(event.registrationTo || new Date())
        );
        const eventFrom = getDateTimeString(
          new Date(event.eventFrom || new Date())
        );
        setState({ ...event, registrationFrom, registrationTo, eventFrom });
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
      navigate(-1);
    });
  };

  const cancel = () => navigate(-1);

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
          <div>
            <label>Venue title</label>
            <textarea
              name="venueTitle"
              onInput={handleChange}
              value={state.venueTitle}
            />
          </div>
          <div>
            <label>Venue description</label>
            <textarea
              name="venueDescription"
              onInput={handleChange}
              value={state.venueDescription}
            />
          </div>
          <div>
            <label>Dresscode</label>
            <textarea
              name="dresscode"
              onInput={handleChange}
              value={state.dresscode}
            />
          </div>
          <div>
            <label>Registration open from</label>
            <input
              type="datetime-local"
              name="registrationFrom"
              onInput={handleChange}
              value={state.registrationFrom}
            />
          </div>
          <div>
            <label>Registration open upto</label>
            <input
              type="datetime-local"
              name="registrationTo"
              onInput={handleChange}
              value={state.registrationTo}
            />
          </div>
          <div>
            <label>Event starts from</label>
            <input
              type="datetime-local"
              name="eventFrom"
              onInput={handleChange}
              value={state.eventFrom}
            />
          </div>
          <div>
            <label>Notification message</label>
            <textarea
              name="notification"
              onInput={handleChange}
              value={state.notification}
            />
          </div>
          <div>
            <label>Register declaration JSON (name, text, required)</label>
            <textarea
              name="registerDeclaration"
              onInput={handleChange}
              value={state.registerDeclaration}
            />
          </div>
          <div>
            <label>Checkin declaration JSON (name, text, required)</label>
            <textarea
              name="checkinDeclaration"
              onInput={handleChange}
              value={state.checkinDeclaration}
            />
          </div>
          <div>
            <label>Custom fields JSON (name, label, datatype)</label>
            <textarea
              name="customFields"
              onInput={handleChange}
              value={state.customFields}
            />
          </div>
          <div>
            <label>Media JSON (type (image/video), title, caption, link)</label>
            <textarea name="media" onInput={handleChange} value={state.media} />
          </div>
          <div>
            <label>
              Home page JSON (type (title/subtitle/text/image/video), text,
              link)
            </label>
            <textarea name="home" onInput={handleChange} value={state.home} />
          </div>
          <div>
            <label>Customer Support JSON (name, phone)</label>
            <textarea
              name="support"
              onInput={handleChange}
              value={state.support}
            />
          </div>
          <div>
            <label>
              Group definition JSON (name, caption, icon, iconPrefix,
              description)
            </label>
            <textarea name="group" onInput={handleChange} value={state.group} />
          </div>
          <div>
            <label>Code</label>
            <input name="code" onInput={handleChange} value={state.code} />
          </div>
          <div>
            <label>Admin Key</label>
            <input
              name="adminKey"
              onInput={handleChange}
              value={state.adminKey}
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
