import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './TopbarContainer.scss';
import { receiveMessage } from '../../events/MessageService';

interface Props {
  cookies: any;
  transparent?: boolean;
}

const TopbarContainer = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);
  const [space, setSpace] = useState('');

  useEffect(() => {
    receiveMessage().subscribe((event: any) => {
      if (event.name === 'spaceChange') {
        setSpace(event.data);
      }
    });
  }, []);

  return (
    <div
      className={`topbar-container ${
        props.transparent ? 'topbar-container--transparent' : ''
      } ${profile.sidebar ? 'sidebar-shown' : 'sidebar-hidden'}`}
    >
      {/* <Topbar
        space={space}
        cookies={props.cookies}
        hideSidebarOnDesktop={profile.hideSidebarOnDesktop}
      /> */}
    </div>
  );
};

export default TopbarContainer;
