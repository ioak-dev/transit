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
}

const Logo = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      <div className="logo--image">
        {profile.theme === 'theme_light' && (
          <img src={transitWhiteSmall} alt="Fortuna logo" />
        )}
        {profile.theme !== 'theme_light' && (
          <img src={transitWhiteSmall} alt="Fortuna logo" />
        )}
      </div>
      {props.variant === 'full' && (
        <div className="logo--text">
          <img src={transitWhiteText} alt="Fortuna logo" />
        </div>
      )}
    </div>
  );
};

export default Logo;
