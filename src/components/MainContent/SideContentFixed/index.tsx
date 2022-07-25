import {
  faBalanceScaleRight,
  faCalendar,
  faCalendarAlt,
  faChartArea,
  faChartBar,
  faChevronLeft,
  faChevronRight,
  faCircleDot,
  faClone,
  faCog,
  faCogs,
  faCoins,
  faCopy,
  faDatabase,
  faFileExport,
  faFileImport,
  faFingerprint,
  faFolderOpen,
  faFolderPlus,
  faHome,
  faMagnifyingGlass,
  faMoneyBillWave,
  faMoneyBillWaveAlt,
  faReceipt,
  faRunning,
  faShoppingBag,
  faShoppingCart,
  faSignOutAlt,
  faTable,
  faTag,
  faTags,
  faTh,
  faThLarge,
  faThumbTack,
  faTimes,
  faUniversity,
  faUserShield,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Subject } from 'rxjs';
import DarkModeIcon from '../../../components/Navigation/DarkModeIcon';
import NavAccountIcon from '../../../components/Navigation/NavAccountIcon';
import Logo from '../../../components/Logo';
import SideNavLink from '../SideNavLink';

import './style.scss';
import { removeAuth } from '../../../actions/AuthActions';
import { sendMessage } from '../../../events/MessageService';
import SideNavSubHeading from '../SideNavSubHeading';
import { setProfile } from '../../../actions/ProfileActions';

const queryString = require('query-string');

interface Props {
  cookies: any;
  space: string;
}

const SideContentFixed = (props: Props) => {
  const location = useLocation();
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const [queryParam, setQueryParam] = useState({
    id: '',
  });
  const [view, setView] = useState<'file' | 'search' | 'pin'>('file');
  const [addFolderCommand, setAddFolderCommand] = useState(0);
  const [locateFolderCommand, setLocateFolderCommand] = useState(0);

  const [searchText, setSearchText] = useState<string>('');

  const [searchResults, setSearchResults] = useState<any>({
    results: [],
    words: [
      {
        name: [],
        path: [],
        content: [],
      },
    ],
  });

  useEffect(() => {
    const queryParam = queryString.parse(location.search);
    setQueryParam(queryParam);
  }, [location]);

  const logout = (
    event: any,
    type = 'success',
    message = 'You have been logged out'
  ) => {
    dispatch(removeAuth());
    props.cookies.remove(
      `transit_${process.env.REACT_APP_ONEAUTH_APPSPACE_ID}`
    );
    history.push(`/`);
    sendMessage('notification', true, {
      type,
      message,
      duration: 3000,
    });
  };

  const login = (type: string) => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/realm/${process.env.REACT_APP_ONEAUTH_APPSPACE_ID}/login/${process.env.REACT_APP_ONEAUTH_APP_ID}`;
  };

  const handleAddFolder = () => {
    setAddFolderCommand(addFolderCommand + 1);
  };

  const handleLocateFolder = () => {
    setLocateFolderCommand(locateFolderCommand + 1);
  };

  const changeToFileView = () => {
    setAddFolderCommand(0);
    setLocateFolderCommand(0);
    setView('file');
  };

  const chooseCompany = () => {
    history.push('/home');
  };

  const toggleSidebar = () => {
    sessionStorage.setItem(
      'transit_pref_sidebar_status',
      profile.sidebar ? 'collapsed' : 'expanded'
    );

    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  return (
    <div
      className={`side-content-fixed ${
        profile.sidebar
          ? 'side-content-fixed__sidebar-active'
          : 'side-content-fixed__sidebar-inactive'
      } bg-light-300 dark:bg-dark-400`}
    >
      <div className="side-content-fixed__header">
        {/* <div className="side-content-fixed__header__logo" /> */}
        {profile.sidebar && (
          <div className="side-content-fixed__header__button">
            <button className="button" onClick={chooseCompany}>
              <FontAwesomeIcon icon={faTh} />
            </button>
            <button className="button" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}
      </div>
      <div className="side-content-fixed__menu">
        {props.space && (
          <>
            {/* <SideNavSubHeading short="Record" long="Record" /> */}
            <SideNavLink
              link={`/${props.space}/dashboard`}
              icon={faChartBar}
              label="Dashboard"
            />
            <SideNavLink
              link={`/${props.space}/eventlist`}
              icon={faCalendar}
              label="Event list"
            />
            {/* <SideNavSubHeading short="System" long="System" /> */}
            <SideNavLink
              link={`/${props.space}/settings/company`}
              icon={faCogs}
              label="Company setting"
            />
          </>
        )}
      </div>
      <div className="side-content-fixed__footer">
        <div className="side-content-fixed__footer__left">
          <div className="side-content-fixed__footer__right">
            <DarkModeIcon />
          </div>
        </div>
        {profile.sidebar && (
          <div className="side-content-fixed__footer__right">
            {profile.sidebar && (
              <div>{`${authorization.given_name} ${authorization.family_name}`}</div>
            )}
            {authorization.isAuth && (
              <button className="button" onClick={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            )}
            {!authorization.isAuth && (
              <button className="button" onClick={() => login('signin')}>
                <FontAwesomeIcon icon={faFingerprint} />
              </button>
            )}
          </div>
        )}
        {/* <NavAccountIcon logout={logout} login={login} /> */}
      </div>
    </div>
  );
};

export default SideContentFixed;
