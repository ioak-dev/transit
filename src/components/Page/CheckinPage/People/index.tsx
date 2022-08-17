import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from '../../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import EventModel from '../../../../model/EventModel';
import ParticipantTile from '../GroupSection/ParticipantTile';
import SearchInput from './SearchInput';
import { isEmptyOrSpaces } from '../../../../components/Utils';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  participantList: ParticipantModel[];
  event: EventModel;
  tracks: any[];
}

const People = (props: Props) => {
  const [search, setSearch]: [string, (search: string) => void] =
    React.useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  useEffect(() => {
    DisableContextBarCommand.next(true);
    makeLabelsList();
  }, [props.participantList]);

  const handleChange = (payload: any) => {
    setSearch(payload);
  };

  const makeLabelsList = () => {
    const _labels: any = [];
    props.participantList.forEach((item: ParticipantModel) => {
      if (!_labels.includes(item.practice) && !isEmptyOrSpaces(item.practice)) {
        _labels.push(item.practice);
      }
      console.log(_labels);
    });
    setLabels(_labels);
  };

  const selected = (label: any) => {
    const _selectedLabels = [...selectedLabels];
    _selectedLabels.indexOf(label) === -1
      ? _selectedLabels.push(label)
      : _selectedLabels.splice(_selectedLabels.indexOf(label), 1);
    setSelectedLabels(_selectedLabels);
    console.log(_selectedLabels);
  };

  return (
    <>
      <div className="people">
        {props.participantList
          .filter((item) => {
            return (
              (search === '' ||
                item.firstName
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                item.lastName
                  .toLowerCase()
                  .includes(search.toLowerCase())) &&
              (selectedLabels.length === 0 ||
                selectedLabels.includes(item.practice || ''))
            );
          })
          .map((participant: ParticipantModel) => (
            <ParticipantTile participant={participant} key={participant._id} />
          ))}
      </div>
      <div className="label-list">
        {labels.map((item) => (
          <button
            className={`button label ${
              selectedLabels.includes(item) ? 'active' : ''
            }`}
            key={item}
            onClick={() => selected(item)}
          >
            {item}
          </button>
        ))}
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
