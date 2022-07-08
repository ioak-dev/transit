/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import './style.scss';
import Topbar from '../../../components/Topbar';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const UnauthorizedPage = (props: Props) => {
  const history = useHistory();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="unauthorized-page">
      <Topbar title="Unauthorized">right</Topbar>
      <div className="unauthorized-page__main main-section page-width content-section">
        <div>
          Company file you are trying to open does not exist or you don't have
          necessary permissions.
        </div>
        <div>
          <a className="hyperlink" href="#/home">
            Choose a different company
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
