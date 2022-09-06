import {
  faBuilding,
  faBuildingUser,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';
import './ParticipantTile.scss';

interface Props {
  participant: ParticipantModel;
  isRegistered?: boolean;
  isAttended?: boolean;
}

const ParticipantTile = (props: Props) => {
  return (
    <div className="button participant-tile" key={props.participant._id}>
      <div className="participant-tile__lineone">
        <div className="participant-tile__lineone__left">
          {props.participant.firstName} {props.participant.lastName}
        </div>
        <div className="participant-tile__lineone__right">
          {props.isAttended && (
            <div className="participant-tile__lineone__right__attended" />
          )}
          {!props.isAttended && props.isRegistered && (
            <div className="participant-tile__lineone__right__registered" />
          )}
          {!props.isAttended && !props.isRegistered && (
            <div className="participant-tile__lineone__right__notregistered" />
          )}
        </div>
      </div>
      <div className="participant-tile__phone__time">
        {props.participant.telephone && (
          <div className="participant-tile__phone">
            <a href={`tel:${props.participant.telephone}`}>
              <FontAwesomeIcon icon={faPhone} />
            </a>
            {props.participant.telephone}
          </div>
        )}
        {!props.participant.telephone && (
          <div className="participant-tile__phone" />
        )}
      </div>
    </div>
  );
};

export default ParticipantTile;
