import React, { useEffect, useState } from 'react';
import './ParticipantList.scss';
import ParticipantModel from '../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import EventModel from '../../../model/EventModel';
import { isEmptyOrSpaces } from '../../Utils';
import Topbar from '../../Topbar';
import { getCheckin, getTrackById, getTracks } from './service';
import TrackModel from '../../../model/TrackModel';
import CheckinTile from './CheckinTile';
import CheckinModel from '../../../model/CheckinModel';

interface Props {
  space: string;
  location: any;
  eventId: string;
  participants: ParticipantModel[];
  code: string;
  trackId: string;
}

const ParticipantList = (props: Props) => {
  const [checkinMap, setCheckinMap] = useState<any>({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAttended, setIsAttended] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [track, setTrack] = useState<TrackModel>();
  const [registered, setRegistered] = useState(0);
  const [attended, setAttended] = useState(0);

  const handleChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  };

  useEffect(() => {
    if (props.eventId && props.trackId && props.trackId !== 'NA') {
      getTrackById(props.space, props.trackId).then((response: TrackModel) => {
        setTrack(response);
      });
    }
    if (props.eventId && props.trackId) {
      refreshData();
    }
  }, [props.trackId, props.eventId]);

  const refreshData = () => {
    getCheckin(props.space, props.eventId, props.trackId).then(
      (response: CheckinModel[]) => {
        const _checkinMap: any = {};
        let _registered = 0;
        let _attended = 0;
        response.forEach((item) => {
          _checkinMap[item.participantId] = item;
          if (item.register) {
            _registered += 1;
          }
          if (item.from) {
            _attended += 1;
          }
        });
        setRegistered(_registered);
        setAttended(_attended);
        setCheckinMap(_checkinMap);
      }
    );
  };

  return (
    <>
      <div className="participant-list">
        {props.participants
          .filter(
            (item) =>
              searchText === '' ||
              item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
              item.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
              item.referenceId === searchText
          )
          .filter(
            (item) =>
              (!isRegistered && !isAttended) ||
              (isRegistered && isAttended) ||
              (isRegistered && checkinMap[item._id || '']?.register) ||
              (isAttended && checkinMap[item._id || '']?.from)
          )
          .map((item: ParticipantModel) => (
            <>
              <CheckinTile
                handleChange={refreshData}
                participant={item}
                space={props.space}
                key={item._id}
                checkinMap={checkinMap}
                eventId={props.eventId}
                track={track}
              />
            </>
          ))}
      </div>
      <div className="participant-list-quickfilter">
        <div>
          <button
            className={`button ${isRegistered ? 'active' : ''}`}
            onClick={() => setIsRegistered(!isRegistered)}
          >
            Registered ({registered})
          </button>
        </div>
        <div>
          <button
            className={`button ${isAttended ? 'active' : ''}`}
            onClick={() => setIsAttended(!isAttended)}
          >
            Attended ({attended})
          </button>
        </div>
      </div>
      <div className="participant-list-filter">
        <input
          className="input"
          name="searchText"
          value={searchText}
          onInput={handleChange}
        />
      </div>
    </>
  );
};

export default ParticipantList;
