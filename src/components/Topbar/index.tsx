import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../actions/ProfileActions';
import Logo from '../Logo';
import DarkModeIcon from '../Navigation/DarkModeIcon';
import './style.scss';

interface Props {
  title: string;
  left?: any;
  children?: any;
  fixed?: boolean;
  isContextExpanded?: boolean;
  alternateView?: boolean;
}

const Topbar = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const toggleSidebar = () => {
    sessionStorage.setItem(
      'transit_pref_sidebar_status',
      profile.sidebar ? 'collapsed' : 'expanded'
    );

    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  return (
    <div
      className={`topbar text-gray-900 dark:text-gray-200 ${
        props.fixed ? 'topbar--fixed' : 'topbar--not-fixed'
      } ${
        props.isContextExpanded
          ? 'topbar--context-active'
          : 'topbar--context-inactive'
      } ${
        profile.sidebar ? 'topbar--sidebar-active' : 'topbar--sidebar-inactive'
      } ${props.alternateView ? 'topbar--alternate' : 'topbar--alternate'}`}
    >
      <div className="topbar__left">
        {!props.alternateView && (
          <button className="button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
        <Logo variant="short" />
        <div>{props.title}</div>
        {props.left && <div>{props.left}</div>}
      </div>
      <div className="topbar__right">
        {/* <DarkModeIcon /> */}
        {props.children}
        <Logo variant="short" />
      </div>
    </div>
  );
};

export default Topbar;
