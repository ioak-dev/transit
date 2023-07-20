import { faPeopleGroup, faRss } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';

import './TopbarRightSection.scss';

interface Props {
  space: string;
  location: any;
  participant: ParticipantModel;
  event: EventModel;
}

const TopbarRightSection = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (page: string) => {
    navigate(
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
