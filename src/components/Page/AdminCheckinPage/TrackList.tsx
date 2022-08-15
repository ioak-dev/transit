import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './TrackList.scss';
import ParticipantModel from '../../../model/ParticipantModel';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import EventModel from '../../../model/EventModel';
import { isEmptyOrSpaces } from '../../Utils';
import Topbar from '../../Topbar';
import { getTracks } from './service';
import TrackModel from '../../../model/TrackModel';
import { formatDateTimeText } from '../../../components/Lib/DateUtils';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  eventId: string;
  tracks: TrackModel[];
  code: string;
}

const TrackList = (props: Props) => {
  const history = useHistory();

  const goToCheckin = (trackId: string) => {
    history.push(
      `/${props.space}/admin-checkin/${props.eventId}/${props.code}?trackId=${trackId}`
    );
  };

  return (
    <div className="track-list">
      {props.tracks.map((item: TrackModel) => (
        <button
          className={`button track-list__item  ${
            new Date(item.from) <= new Date() && new Date(item.to) >= new Date()
              ? 'track-list__item--active'
              : ''
          }`}
          key={item._id}
          onClick={() => goToCheckin(item._id || '')}
        >
          <div className="track-list__item__container">
            <div className="track-list__item__container__name">{item.name}</div>
            <div className="track-list__item__container__time">{`${formatDateTimeText(
              item.from
            )} to ${formatDateTimeText(item.to)} ${
              item.location ? `(${item.location})` : ''
            }`}</div>
            <div className="track-list__item__container__description">
              {item.description}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TrackList;
