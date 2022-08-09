import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';
import './SearchInput.scss';

interface Props {
  searchText: string;
  handleChange: any;
}

const SearchInput = (props: Props) => {

  const handleChange = (event: any) => {
    props.handleChange(event.currentTarget.value);
  };

  return (
    <div className="compose">
      <input
        className="input"
        name="compose"
        value={props.searchText}
        onInput={handleChange}
      />
    </div>
  );
};

export default SearchInput;
