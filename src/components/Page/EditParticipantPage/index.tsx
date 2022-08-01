import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ParticipantModel from '../../../model/ParticipantModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import Footer from '../../../components/Footer';
import { saveParticipant } from './service';
import { fetchAndSetParticipantItems } from '../../../actions/ParticipantActions';
import EventModel from '../../../model/EventModel';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const EditParticipantPage = (props: Props) => {
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
  const participantList = useSelector((state: any) => state.participant.items);

  const getDateTimeString = (_date: Date) => {
    console.log(_date);
    return format(_date, "yyyy-MM-dd'T'HH:mm");
  };
  const getDateString = (_date: Date) => {
    console.log(_date);
    return format(_date, 'yyyy-MM-dd');
  };

  const [state, setState] = useState<ParticipantModel>({
    firstName: '',
    lastName: '',
    eventId: '',
    email: '',
    telephone: '',
    birthDate: getDateString(new Date()),
    joiningDate: getDateString(new Date()),
    referenceId: '',
    groups: [],
    room: '',
  });

  useEffect(() => {
    if (id && participantList) {
      const participant: ParticipantModel = participantList.find(
        (item: ParticipantModel) => item._id === id
      );
      if (participant) {
        const birthDate = getDateString(
          new Date(participant.birthDate || new Date())
        );
        const joiningDate = getDateString(
          new Date(participant.joiningDate || new Date())
        );
        setState({ ...participant, birthDate, joiningDate });
      }
    }
  }, [id, participantList]);

  useEffect(() => {
    console.log(eventId, eventList);
    if (eventId && eventList) {
      const _event = eventList.find(
        (item: ParticipantModel) => item._id === eventId
      );
      if (_event) {
        setEvent(_event);
      }
    }
  }, [eventId, eventList]);

  const goToCreateParticipantPage = () => {
    history.push(`/${props.space}/participant/new`);
  };

  const goToCompanyPage = (participantId: string) => {
    history.push(`/${props.space}/participant/${participantId}`);
  };

  const handleChange = (participant: any) => {
    setState({
      ...state,
      [participant.currentTarget.name]: participant.currentTarget.value,
    });
  };

  const save = (event: any) => {
    event.preventDefault();
    console.log(state);
    saveParticipant(props.space, { ...state, eventId }, authorization).then(
      (response: any) => {
        console.log(response);
        dispatch(fetchAndSetParticipantItems(props.space, authorization));
        history.goBack();
      }
    );
  };

  const cancel = () => history.goBack();

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="edit-participant-page">
      <Topbar title={`${event?.name} > Edit participant`} />
      <div className="edit-participant-page__main">
        <form className="form" onSubmit={save}>
          <div className="form-two-column">
            <div>
              <label>First Name</label>
              <input
                name="firstName"
                onInput={handleChange}
                value={state.firstName}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                name="lastName"
                onInput={handleChange}
                value={state.lastName}
              />
            </div>
            <div>
              <label>Email</label>
              <input name="email" onInput={handleChange} value={state.email} />
            </div>
            <div>
              <label>Telephone</label>
              <input
                name="telephone"
                onInput={handleChange}
                value={state.telephone}
              />
            </div>
            <div>
              <label>Birth date</label>
              <input
                name="birthDate"
                type="date"
                onInput={handleChange}
                value={state.birthDate}
              />
            </div>
            <div>
              <label>Joining date</label>
              <input
                name="joiningDate"
                type="date"
                onInput={handleChange}
                value={state.joiningDate}
              />
            </div>
            <div>
              <label>Id</label>
              <input
                name="referenceId"
                onInput={handleChange}
                value={state.referenceId}
              />
            </div>
            <div>
              <label>Room</label>
              <input name="room" onInput={handleChange} value={state.room} />
            </div>
            <div>
              <label>Groups</label>
              <select name="groups" id="groups" multiple>
                <option value="java">JAVA</option>
                <option value="finance">Finance</option>
                <option value="sap">SAP</option>
              </select>
            </div>
          </div>
          {/* <div className="form-two-column">
            <div>
              <label>From</label>
              <input
                type="datetime-local"
                name="from"
                onInput={handleChange}
                value={state.from}
              />
            </div>
            <div>
              <label>To</label>
              <input
                type="datetime-local"
                name="to"
                onInput={handleChange}
                value={state.to}
              />
            </div>
          </div> */}
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

export default EditParticipantPage;
