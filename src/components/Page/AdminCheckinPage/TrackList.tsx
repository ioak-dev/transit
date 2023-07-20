import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrackList.scss';
import TrackModel from '../../../model/TrackModel';
import { formatDateTimeText } from '../../Lib/DateUtils';

interface Props {
  space: string;
  location: any;
  eventId: string;
  tracks: TrackModel[];
  code: string;
}

const TrackList = (props: Props) => {
  const navigate = useNavigate();

  const goToCheckin = (trackId: string) => {
    navigate(
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
