import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NightsStay, WbSunny } from '@material-ui/icons';
import './style.scss';
import ParticipantModel from 'src/model/ParticipantModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faPeopleGroup,
  faPerson,
  faPhone,
  faQuestion,
  faUser,
  fas,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import DisableContextBarCommand from '../../../../events/DisableContextBarCommand';
import DarkModeIcon from '../../../../components/Navigation/DarkModeIcon';
import { setProfile } from '../../../../actions/ProfileActions';
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(fas, fab);

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
  goToPage: any;
  event: any;
  page:
    | 'Home'
    | 'Schedule'
    | 'Agenda'
    | 'Map'
    | 'User'
    | 'Help'
    | 'More'
    | 'Group'
    | 'News Feed';
  participant: ParticipantModel;
}

const MoreMenuSection = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const [groupMap, setGroupMap] = useState<any>({});

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  const toggleMode = () => {
    dispatch(
      setProfile({
        theme: profile.theme === 'theme_dark' ? 'theme_light' : 'theme_dark',
      })
    );

    sessionStorage.setItem(
      'transit_pref_profile_colormode',
      profile.theme === 'theme_dark' ? 'theme_light' : 'theme_dark'
    );
  };

  useEffect(() => {
    const _groupMap: any = {};
    if (props.event?.group) {
      JSON.parse(props.event.group)?.forEach((item: any) => {
        _groupMap[item.name] = item;
      });
    }

    setGroupMap(_groupMap);
  }, [props.event]);

  return (
    <div className="more-menu-section">
      <button
        onClick={() => props.goToPage('Map')}
        className={`button more-menu-section__button ${
          props.page === 'Map' ? 'more-menu-section__button--active' : ''
        }`}
      >
        <div className="more-menu-section__button__label">
          <FontAwesomeIcon icon={faLocationDot} />
          <div className="more-menu-section__button__label__text">Map</div>
        </div>
      </button>
      <button
        onClick={() => props.goToPage('User')}
        className={`button more-menu-section__button ${
          props.page === 'Help' ? 'more-menu-section__button--active' : ''
        }`}
      >
        <div className="more-menu-section__button__label">
          <FontAwesomeIcon icon={faUser} />
          <div className="more-menu-section__button__label__text">
            My detail
          </div>
        </div>
      </button>
      <button
        onClick={() => props.goToPage('Help')}
        className={`button more-menu-section__button ${
          props.page === 'Help' ? 'more-menu-section__button--active' : ''
        }`}
      >
        <div className="more-menu-section__button__label">
          <FontAwesomeIcon icon={faQuestion} />
          <div className="more-menu-section__button__label__text">Help</div>
        </div>
      </button>
      {props.participant.groups?.map((item) => (
        <button
          key={item}
          onClick={() => props.goToPage('Group', item)}
          className={`button more-menu-section__button ${
            props.page === 'Help' ? 'more-menu-section__button--active' : ''
          }`}
        >
          <div className="more-menu-section__button__label">
            <FontAwesomeIcon
              icon={[
                groupMap[item]?.iconPrefix || 'fas',
                groupMap[item]?.icon || 'layer-group',
              ]}
            />
            <div className="more-menu-section__button__label__text">
              Group: {item}
            </div>
          </div>
        </button>
      ))}
      <button
        onClick={toggleMode}
        className={`button more-menu-section__button ${
          props.page === 'Help' ? 'more-menu-section__button--active' : ''
        }`}
      >
        <div className="more-menu-section__button__label">
          {profile.theme === 'theme_dark' && (
            <WbSunny className="cursor-pointer" />
          )}
          {profile.theme !== 'theme_dark' && (
            <NightsStay className="cursor-pointer" />
          )}
          <div className="more-menu-section__button__label__text">
            {profile.theme === 'theme_dark' && <>Light mode</>}
            {profile.theme !== 'theme_dark' && <>Dark mode</>}
          </div>
        </div>
      </button>
    </div>
  );
};

export default MoreMenuSection;
