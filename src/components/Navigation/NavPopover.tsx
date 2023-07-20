import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import { receiveMessage, sendMessage } from '../../events/MessageService';
import packetWhite from '../../images/transit_white.svg';
import packetBlack from '../../images/transit_black.svg';
import './NavPopover.scss';
import DropLinks from './DropLinks';

interface Props {
  space: string;
  handleClose: any;
  logout: Function;
  login: Function;
}

const NavPopover = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="nav-popover">
      {/* <div className="nav-popover-header">
        {profile.theme === 'basicui-light' && (
          <img className="logo" src={packetWhite} alt="Packet logo" />
        )}
        {profile.theme === 'basicui-dark' && (
          <img className="logo" src={packetBlack} alt="Packet logo" />
        )}
      </div> */}
      <div className="nav-content">
        <DropLinks space={props.space} handleClose={props.handleClose} />
      </div>
      <div className="midline" />
      <div className="nav-resources">support resources</div>
    </div>
  );
};

export default NavPopover;
