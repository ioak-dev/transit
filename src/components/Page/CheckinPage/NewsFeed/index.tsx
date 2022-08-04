import React, { useEffect } from 'react';
import './style.scss';
import ParticipantModel from 'src/model/ParticipantModel';
import EventModel from 'src/model/EventModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Compose from '../../../../components/Compose';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
  tracks: any[];
  handleChange: any;
}

const NewsFeed = (props: Props) => {
  const handleChange = (text: string) => {};

  return (
    <div className="news-feed">
      <div>news feed</div>
      <Compose handleChange={handleChange} />
    </div>
  );
};

export default NewsFeed;
