import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './style.scss';
import ParticipantModel from '../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import EventModel from '../../../model/EventModel';
import { isEmptyOrSpaces } from '../../../components/Utils';
import Topbar from '../../../components/Topbar';
import { getTracks } from './service';
import TrackList from './TrackList';
import ParticipantList from './ParticipantList';
import { getParticipantList } from '../CheckinPage/service';
import TrackModel from 'src/model/TrackModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const AdminCheckinPage = (props: Props) => {
  const params: {
    eventId: string;
    code: string;
  } = useParams();
  const [queryParam, setQueryParam] = useState<any>();

  useEffect(() => {
    const queryParam = queryString.parse(props.location.search);
    setQueryParam(queryParam);
  }, [props.location.search]);

  const [tracks, setTracks] = useState<TrackModel[]>([]);
  const [participants, setParticipants] = useState<ParticipantModel[]>([]);
  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  useEffect(() => {
    getTracks(props.space, params.eventId).then((response: TrackModel[]) => {
      setTracks(response);
    });
    getParticipantList(props.space, params.eventId).then(
      (response: ParticipantModel[]) => {
        setParticipants(response);
      }
    );
  }, []);

  return (
    <div className="admin-checkin-page">
      <Topbar
        alternateView
        // title={event?.name || ''}
        title="Administrator"
      />
      {!queryParam?.trackId && (
        <TrackList
          tracks={tracks}
          eventId={params.eventId}
          location={props.location}
          space={props.space}
          code={params.code}
        />
      )}
      {queryParam?.trackId && (
        <ParticipantList
          participants={participants}
          eventId={params.eventId}
          location={props.location}
          space={props.space}
          code={params.code}
          trackId={queryParam.trackId}
        />
      )}
    </div>
  );
};

export default AdminCheckinPage;
