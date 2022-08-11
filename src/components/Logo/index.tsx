/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import transitWhiteSmall from '../../images/transit_white_small.svg';
import transitWhiteText from '../../images/transit_white_text.svg';
import transitBlackSmall from '../../images/transit_black_small.svg';
import transitBlackText from '../../images/transit_black_text.svg';
import transitBlack from '../../images/transit_black.svg';

interface Props {
  variant: 'full' | 'short';
  handleClick?: any;
}

const Logo = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  const handleClick = () => {
    console.log('***home');
    if (props.handleClick) {
      props.handleClick();
    }
  };

  return (
    <div className="logo" onClick={handleClick}>
      <div className="logo--image button" onClick={handleClick}>
        {profile.theme === 'theme_light' && (
          <img
            src={transitWhiteSmall}
            alt="Fortuna logo"
            onClick={handleClick}
          />
        )}
        {profile.theme !== 'theme_light' && (
          <img
            src={transitWhiteSmall}
            alt="Fortuna logo"
            onClick={handleClick}
          />
        )}
      </div>
      {props.variant === 'full' && (
        <div className="logo--text">
          <img
            src={transitWhiteText}
            alt="Fortuna logo"
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
};

export default Logo;
