import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
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
import EventModel from '../../../../model/EventModel';
import TrackModel from '../../../../model/TrackModel';
import CheckinTile from './CheckinTile';

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
}

const MySchedule = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [participantId, setParticipantId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);

  const params: any =
    useParams();

  const [showAllTracks, setShowAllTracks] = useState(false);

  const [state, setState] = useState<any>({});

  const goToCreateParticipantPage = () => {
    navigate(`/${props.space}/participant/new`);
  };

  const goToCompanyPage = (participantId: string) => {
    navigate(`/${props.space}/participant/${participantId}`);
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
    <div className="my-schedule">
      <div className="my-schedule__action">
        <button className="button default-button" onClick={toggleShowAllTracks}>
          {showAllTracks ? 'Show current events only' : 'Show all events'}
        </button>
      </div>
      <div className="my-schedule__main">
        {props.event &&
          props.participant &&
          props.tracks
            .filter((item) => showAllTracks || !item.isLocked)
            // .filter(
            //   (item) =>
            //     !item.group || props.participant.groups.includes(item.group)
            // )
            .map((item) => (
              <CheckinTile
                key={item._id}
                space={props.space}
                track={item}
                event={props.event}
                participant={props.participant}
                handleChange={refreshData}
              />
            ))}
      </div>
    </div>
  );
};

export default MySchedule;
