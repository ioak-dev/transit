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

const LogoAlt = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo-alt">
      <div className="logo-alt--image">
        {profile.theme === 'theme_light' && (
          <img src={transitWhiteSmall} alt="Fortuna logo-alt" />
        )}
        {profile.theme !== 'theme_light' && (
          <img src={transitWhiteSmall} alt="Fortuna logo-alt" />
        )}
      </div>
      {props.variant === 'full' && (
        <div className="logo-alt--text">
          <img src={transitWhiteText} alt="Fortuna logo-alt" />
        </div>
      )}
    </div>
  );
};

export default LogoAlt;
