import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ParticipantModel from '../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import EventModel from '../../../model/EventModel';
import { isEmptyOrSpaces } from '../../../components/Utils';
import Topbar from '../../../components/Topbar';
import { getTracks } from './service';
import TrackList from './TrackList';
import ParticipantList from './ParticipantList';
import { getEventById, getParticipantList } from '../CheckinPage/service';
import TrackModel from '../../../model/TrackModel';


interface Props {
  space: string;
  location: any;
}

const AdminCheckinPage = (props: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params: any = useParams();
  const [validationSuccessful, setValidationSuccessful] = useState(false);

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
    getEventById(props.space, params.eventId).then((response: EventModel) => {
      setValidationSuccessful(response?.adminKey === params.code);
    });
  }, [params]);

  const goToEventCheckin = () => {
    navigate(
      `/${props.space}/admin-checkin/${params.eventId}/${params.code}?trackId=NA`
    );
  };

  return (
    <div className="admin-checkin-page">
      <Topbar
        // title={event?.name || ''}
        title="Administrator"
      />
      {validationSuccessful && !searchParams.get('trackId') && (
        <div className="admin-checkin-page__event">
          <button
            className="button track-list__item"
            onClick={goToEventCheckin}
          >
            <div className="track-list__item__container">
              <div className="track-list__item__container__name">
                Event attendance
              </div>
              <div className="track-list__item__container__description">
                Check in and check out data for the whole event
              </div>
            </div>
          </button>
        </div>
      )}
      {validationSuccessful && !searchParams.get('trackId') && (
        <TrackList
          tracks={tracks}
          eventId={params.eventId}
          location={props.location}
          space={props.space}
          code={params.code}
        />
      )}
      {validationSuccessful && searchParams.get('trackId') && (
        <ParticipantList
          participants={participants}
          eventId={params.eventId}
          location={props.location}
          space={props.space}
          code={params.code}
          trackId={searchParams.get('trackId') || ''}
        />
      )}
      {!validationSuccessful && <div>Unauthorized</div>}
    </div>
  );
};

export default AdminCheckinPage;
