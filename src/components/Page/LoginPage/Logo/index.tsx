import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import transitBlack from '../../../../images/transit_black.svg';

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
        <img src={transitBlack} alt="Transit logo" />
      </div>
    </div>
  );
};

export default Logo;
