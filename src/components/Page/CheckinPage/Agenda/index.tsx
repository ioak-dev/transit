import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../../model/ReceiptModel';
import ParticipantModel from '../../../../model/ParticipantModel';
import Topbar from '../../../../components/Topbar';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import Footer from '../../../../components/Footer';
import {
  getAvailableTracks,
  getEventById,
  getParticipantById,
  getParticipantByReferenceId,
} from './service';
import { fetchAndSetParticipantItems } from '../../../../actions/ParticipantActions';
import EventModel from '../../../../model/EventModel';
import AgendaTile from './AgendaTile';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
}

const Agenda = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [participantId, setParticipantId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);

  const params: { eventId: string; participantReferenceId: string } =
    useParams();

  const [showAllTracks, setShowAllTracks] = useState(false);

  const [state, setState] = useState<any>({});

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
  };

  const toggleShowAllTracks = () => {
    setShowAllTracks(!showAllTracks);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const refreshData = () => {
    props.handleChange();
  };

  return (
    <div className="event-list-page__main">
      {props.event &&
        props.participant &&
        props.tracks
          .filter((item) => showAllTracks || !item.isLocked)
          .map((item) => (
            <button
              className="button event-list-page__main__item"
              key={item?._id}
            >
              {/* <pre key={item?._id}>{JSON.stringify(item)}</pre> */}
              <div className="event-list-page__main__item__name">
                {item.name}
              </div>
              <div className="event-list-page__main__item__description">
                {item.description}
              </div>
            </button>
          ))}
    </div>
  );
};

export default Agenda;
