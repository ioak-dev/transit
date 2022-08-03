import React from 'react';
import { useEffect } from 'react';
import './HomeTile.scss';

interface Props {
  content: any;
}

const HomeTile = (props: Props) => {
  console.log(props.content);
  // const src = 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4';
  const src = props.content.link;
  return (
    <div className="home_tile">
      {props.content.type === 'image' && (
        <div className="home_tile_image">
          <img src={props.content.link} alt="Location map" />
        </div>
      )}

      {props.content.type === 'title' && (
        <div className="home_tile_title">
          <h4>{props.content.text}</h4>
        </div>
      )}

      {props.content.type === 'html' && (
        <div
          dangerouslySetInnerHTML={{ __html: props.content.text }}
          className="home_tile_text"
        />
      )}

      {props.content.type === 'subtitle' && (
        <div className="home_tile_subtitle">
          <h6>{props.content.text}</h6>
        </div>
      )}
      {props.content.type === 'text' && (
        <div className="home_tile_text">
          <p>{props.content.text}</p>
        </div>
      )}
      {props.content.type === 'video' && (
        <div className="home_tile_video">
          <video width="100%" controls>
            <source src={src} type="video/mp4" />
            Sorry, your browser doesn't support videos.
          </video>
        </div>
      )}
      {props.content.type === 'youtube' && (
        <div className="home_tile_youtube">
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

export default HomeTile;
