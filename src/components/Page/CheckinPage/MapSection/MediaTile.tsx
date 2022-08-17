import React from 'react';
import { useEffect } from 'react';
import './MediaTile.scss';
import { saveAs } from 'file-saver';

interface Props {
  media: any;
}

const MediaTile = (props: Props) => {
  const downloadImage = () => {
    saveAs(props.media.link, props.media.link.split('/').pop()); // Put your image url here.
  };
  // const src = 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4';
  const src = props.media.link;
  return (
    <div className="media_tile">
      <div>
        <h4>{props.media.title}</h4>
        {/* <h6>{props.media.caption}</h6> */}
      </div>
      {props.media.type === 'image' && (
        <div className='image-wrapper'>
          <img
            className="thumbnail"
            src={props.media.link}
            alt="Location map"
          />
          <p onClick={downloadImage}>Download</p>
        </div>
      )}
      {/* {props.media.type === 'video' && (
        <div>
          <video width="100%" controls>
            <source src={src} type="video/mp4" />
            Sorry, your browser doesn't support videos.
          </video>
        </div>
      )}
      {props.media.type === 'youtube' && (
        <div>
          <iframe
            width="100%"
            src={src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )} */}
    </div>
  );
};

export default MediaTile;
