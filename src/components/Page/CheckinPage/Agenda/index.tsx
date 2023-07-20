import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
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
import AgendaTile from './AgendaTile';
import AgendaTileGroup from './AgendaTileGroup';
import CheckinModel from '../../../../model/CheckinModel';

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
  checkinData: any[];
  allCheckinData: CheckinModel[];
}

const Agenda = (props: Props) => {
  const dispatch = useDispatch();

  const [participantId, setParticipantId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [tracksAsMap, setTracksAsMap] = useState<any>({});

  const params: any =
    useParams();

  const [state, setState] = useState<any>({});

  useEffect(() => {
    const _tracksAsMap: any = {};
    if (props.tracks && props.participant) {
      props.tracks
        .filter(
          (item) => !item.group || props.participant.groups.includes(item.group)
        )
        .forEach((item: any) => {
          const _from = format(new Date(item.from), 'yyyy-MM-dd');
          if (_tracksAsMap[_from]) {
            _tracksAsMap[_from].push(item);
          } else {
            _tracksAsMap[_from] = [item];
          }
        });
    }
    setTracksAsMap(_tracksAsMap);
  }, [props.tracks, props.participant]);

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
        Object.keys(tracksAsMap).map((day) => (
          <AgendaTileGroup
            space={props.space}
            trackList={tracksAsMap[day]}
            day={day}
            key={day}
            participant={props.participant}
            checkinData={props.checkinData}
            allCheckinData={props.allCheckinData}
            event={props.event}
            handleChange={props.handleChange}
          />
        ))}
    </div>
  );
};

export default Agenda;
