import {
  faBuilding,
  faBuildingUser,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import EventModel from 'src/model/EventModel';
import ParticipantModel from 'src/model/ParticipantModel';
import './ParticipantTile.scss';

interface Props {
  participant: ParticipantModel;
}

const ParticipantTile = (props: Props) => {
  return (
    <div className="button participant-tile" key={props.participant._id}>
      <div className="participant-tile__name__time">
        <div className="participant-tile__name">
          {props.participant.firstName} {props.participant.lastName}
        </div>
        {props.participant.practice && (
          <div className="participant-tile__time">
            {props.participant.practice}
          </div>
        )}
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
        {props.participant.room && (
          <div className="participant-tile__time">
            <FontAwesomeIcon icon={faBuildingUser} /> {props.participant.room}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantTile;