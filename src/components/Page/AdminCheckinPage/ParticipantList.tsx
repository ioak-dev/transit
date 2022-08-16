import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
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

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  eventId: string;
  participants: ParticipantModel[];
  code: string;
  trackId: string;
}

const ParticipantList = (props: Props) => {
  const history = useHistory();
  const [checkinMap, setCheckinMap] = useState<any>({});
  const [isIn, setIsIn] = useState(false);
  const [isNotIn, setIsNotIn] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [track, setTrack] = useState<TrackModel>();

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
        response.forEach((item) => {
          _checkinMap[item.participantId] = item;
        });
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
              (!isIn && !isNotIn) ||
              (isIn && isNotIn) ||
              (isIn && checkinMap[item._id || '']) ||
              (isNotIn && !checkinMap[item._id || ''])
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
            className={`button ${isIn ? 'active' : ''}`}
            onClick={() => setIsIn(!isIn)}
          >
            IN ({Object.keys(checkinMap).length})
          </button>
        </div>
        <div>
          <button
            className={`button ${isNotIn ? 'active' : ''}`}
            onClick={() => setIsNotIn(!isNotIn)}
          >
            NOT IN ({props.participants.length - Object.keys(checkinMap).length}
            )
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
