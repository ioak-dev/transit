import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from '../../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import EventModel from '../../../../model/EventModel';
import ParticipantTile from '../GroupSection/ParticipantTile';
import SearchInput from './SearchInput';
import { isEmptyOrSpaces } from '../../../../components/Utils';
import CheckinModel from '../../../../model/CheckinModel';

interface Props {
  space: string;
  location: any;
  participantList: ParticipantModel[];
  event: EventModel;
  tracks: any[];
  checkinData: CheckinModel[];
}

const People = (props: Props) => {
  const [search, setSearch]: [string, (search: string) => void] =
    React.useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [registered, setRegistered] = useState<string[]>([]);
  const [attended, setAttended] = useState<string[]>([]);

  const handleChange = (payload: any) => {
    setSearch(payload);
  };

  const selected = (label: any) => {
    const _selectedLabels = [...selectedLabels];
    _selectedLabels.indexOf(label) === -1
      ? _selectedLabels.push(label)
      : _selectedLabels.splice(_selectedLabels.indexOf(label), 1);
    setSelectedLabels(_selectedLabels);
  };

  useEffect(() => {
    const _registered: string[] = [];
    const _attended: string[] = [];
    console.log('*', props.checkinData);
    props.checkinData?.forEach((item) => {
      if (!item.trackId && item.register) {
        _registered.push(item.participantId);
      }
      console.log(item);
      if (!item.trackId && item.from) {
        _attended.push(item.participantId);
      }
    });
    setRegistered(_registered);
    setAttended(_attended);
    console.log(_registered, _attended);
  }, [props.checkinData]);

  return (
    <>
      <div className="people">
        {props.participantList
          .filter((item) => {
            return (
              selectedLabels.length === 0 ||
              selectedLabels.length === 3 ||
              (selectedLabels.includes('online') &&
                attended.includes(item._id || '')) ||
              (selectedLabels.includes('away') &&
                registered.includes(item._id || '') &&
                !attended.includes(item._id || '')) ||
              (selectedLabels.includes('offline') &&
                !registered.includes(item._id || '') &&
                !attended.includes(item._id || ''))
            );
          })
          .filter((item) => {
            return (
              search === '' ||
              item.firstName.toLowerCase().includes(search.toLowerCase()) ||
              item.lastName.toLowerCase().includes(search.toLowerCase())
            );
          })
          .map((participant: ParticipantModel) => (
            <ParticipantTile
              participant={participant}
              key={participant._id}
              isRegistered={registered.includes(participant._id || '')}
              isAttended={attended.includes(participant._id || '')}
            />
          ))}
      </div>
      <div className="label-list">
        <button
          className={`button label ${
            selectedLabels.includes('online') ? 'active' : ''
          }`}
          onClick={() => selected('online')}
        >
          <div className="label-list__indicator label-list__indicator--online" />
          <div className="label-list__text">Online</div>
        </button>
        <button
          className={`button label ${
            selectedLabels.includes('away') ? 'active' : ''
          }`}
          onClick={() => selected('away')}
        >
          <div className="label-list__indicator label-list__indicator--away" />
          <div className="label-list__text">Away</div>
        </button>
        <button
          className={`button label ${
            selectedLabels.includes('offline') ? 'active' : ''
          }`}
          onClick={() => selected('offline')}
        >
          <div className="label-list__indicator label-list__indicator--offline" />
          <div className="label-list__text">Offline</div>
        </button>
      </div>
      <div>
        <SearchInput
          searchText={search}
          handleChange={handleChange}
        ></SearchInput>
      </div>
    </>
  );
};

export default People;
