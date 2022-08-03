import React from 'react';
import { useEffect } from 'react';
import './MediaTile.scss';

interface Props {
  content: any;
}

const MediaTile = (props: Props) => {
  console.log(props.content);
  // const src = 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4';
  const src = props.content.link;
  return (
    <div className="content_tile">
      {props.content.type === 'title' && <h2>{props.content.text}</h2>}
      {props.content.type === 'subtitle' && <h4>{props.content.text}</h4>}
      <h6>{props.content.caption}</h6>
      {props.content.type === 'image' && (
        <img src={props.content.link} alt="Location map" />
      )}
      {props.content.type === 'video' && (
        <div>
          <video width="100%" controls>
            <source src={src} type="video/mp4" />
            Sorry, your browser doesn't support videos.
          </video>
        </div>
      )}
      {props.content.type === 'youtube' && (
        <div>
          <iframe
            width="100%"
            src={src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-content; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MediaTile;
