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
        {profile.theme === 'basicui-light' && (
          <img src={transitBlackSmall} alt="Transit logo" />
        )}
        {profile.theme === 'basicui-dark' && (
          <img src={transitWhiteSmall} alt="Transit logo" />
        )}
      </div>
      {props.variant === 'full' && (
        <div className="logo--text">
          {profile.theme === 'basicui-light' && (
            <img src={transitBlackText} alt="Transit logo" />
          )}
          {profile.theme === 'basicui-dark' && (
            <img src={transitWhiteText} alt="Transit logo" />
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
