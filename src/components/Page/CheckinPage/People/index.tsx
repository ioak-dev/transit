import React, { useEffect, useState } from 'react';
import './style.scss';
import ParticipantModel from '../../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import EventModel from '../../../../model/EventModel';
import ParticipantTile from '../GroupSection/ParticipantTile';
import SearchInput from './SearchInput';

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

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const handleChange = (payload: any) => {
    setSearch(payload);
  };

  return (
    <>
      <div className="people">
        {props.participantList
          .filter((item) => {
            if (search === '') {
              return item;
            } else if (
              item.firstName.toLocaleLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          })
          .map((participant: any) => (
            <ParticipantTile
              participant={participant}
              key={participant.firstName}
            ></ParticipantTile>
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
