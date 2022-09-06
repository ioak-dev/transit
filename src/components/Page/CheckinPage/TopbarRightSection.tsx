import { faPeopleGroup, faRss } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';

import './TopbarRightSection.scss';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
}

const TopbarRightSection = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (page: string) => {
    history.push(
      `/${props.space}/checkin/${props.event._id}/${props.participant.referenceId}?page=${page}`
    );
  };

  return (
    <div className="checkin-page-topbar">
      {/* <button
        className="button checkin-page-topbar__link"
        onClick={() => handleClick('News Feed')}
      >
        <FontAwesomeIcon icon={faRss} />
      </button> */}
      <button
        className="button checkin-page-topbar__name"
        onClick={() => handleClick('User')}
      >{`${props.participant?.firstName}`}</button>
    </div>
  );
};

export default TopbarRightSection;
