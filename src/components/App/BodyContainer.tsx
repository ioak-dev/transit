import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './BodyContainer.scss';
import Topbar from '../Topbar';
import RouterView from './RouterView';

interface Props {
  cookies: any;
}

const BodyContainer = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const [space, setSpace] = useState('');
  const dispatch = useDispatch();

  return (
    // <div className="body-container">
    //   <div
    //     className={`body-container--content ${
    //       profile.sidebar ? 'sidebar-shown' : 'sidebar-hidden'
    //     }`}
    //   >
    //     <RouterView {...props} />
    //   </div>
    // </div>

    <RouterView {...props} />
  );
};

export default BodyContainer;
