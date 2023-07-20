import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import './RouterView.scss';
import Home from '../Home';
import { loginPageSubject } from '../../events/LoginPageEvent';
import ProtectedRouteApp from '../ProtectedRouteApp';
import LandingPage from '../Page/LandingPage';
import OaLogin from '../Auth/OaLogin';
import EditCompanyPage from '../Page/EditCompanyPage';
import SettingsPage from '../Page/SettingsPage';
import UnauthorizedPage from '../Page/UnauthorizedPage';
import EditCompany from '../Page/SettingsPage/EditCompany';
import Permissions from '../Page/SettingsPage/Permissions';
import BackupAndRestore from '../Page/SettingsPage/BackupAndRestore';
import EventListPage from '../Page/EventListPage';
import EditEventPage from '../Page/EditEventPage';
import EditTrackPage from '../Page/EditTrackPage';
import ManageEventPage from '../Page/ManageEventPage';
import EditParticipantPage from '../Page/EditParticipantPage';
import CheckinPage from '../Page/CheckinPage';
import AdminCheckinPage from '../Page/AdminCheckinPage';
import AdminNewsFeed from '../Page/AdminFeed';
import AdminDeclaration from '../Page/AdminDeclaration';
import LoginPage from '../Page/LoginPage';

interface Props {
}

const RouterView = (props: Props) => {
  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => {
    loginPageSubject.subscribe((message) => {
      setLoginPage(message.state);
    });
  }, []);

  return (
    <div
      className={`router-view ${loginPage ? 'on-login-page' : 'not-on-login-page'}`}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={LandingPage} />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={LandingPage} />
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRouteApp
              middleware={[]} component={LoginPage} />}
        />
        <Route
          path="/company/edit"
          element={
            <ProtectedRouteApp
              middleware={['authenticate']} component={EditCompanyPage} />}
        />
        <Route
          path="/:space/unauthorized"
          element={
            <ProtectedRouteApp
              middleware={['isAuthenticated']} component={UnauthorizedPage} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRouteApp
              component={LandingPage}
              middleware={[]}
            />
          }
        />
        <Route
          path="/:space/eventlist"
          element={
            <ProtectedRouteApp
              component={EventListPage}
              middleware={['authenticate']}
            />
          }
        />
        <Route
          path="/:space/event/:id"
          element={
            <ProtectedRouteApp
              component={ManageEventPage}
              middleware={['authenticate']}
            />
          }
        />
        <Route
          path="/:space/event"
          element={
            <ProtectedRouteApp
              component={ManageEventPage}
              middleware={['authenticate']}
            />
          }
        />
        <Route
          path="/:space/track"
          element={
            <ProtectedRouteApp
              component={EditTrackPage}
              middleware={['authenticate']}
            />
          }
        />
        <Route
          path="/:space/participant"
          element={
            <ProtectedRouteApp
              component={EditParticipantPage}
              middleware={['authenticate']}
            />
          }
        />
        <Route
          path="/:space/checkin/:eventId/:participantReferenceId"
          element={
            <ProtectedRouteApp
              component={CheckinPage}
              middleware={[]}
            />
          }
        />
        <Route
          path="/:space/admin-checkin/:eventId/:code"
          element={
            <ProtectedRouteApp
              component={AdminCheckinPage}
              middleware={[]}
            />
          }
        />
        <Route
          path="/:space/admin-feed/:eventId/:code"
          element={
            <ProtectedRouteApp
              component={AdminNewsFeed}
              middleware={[]}
            />
          }
        />
        <Route
          path="/:space/admin-declaration/:eventId/:declarationType/:code"
          element={
            <ProtectedRouteApp
              component={AdminDeclaration}
              middleware={[]}
            />
          }
        />
        <Route
          path="/:space/settings/company"
          element={
            <ProtectedRouteApp
              component={EditCompany}
              middleware={['authenticate']}
            />
          }
        />
        <Route
          path="/:space/settings/user"
          element={
            <ProtectedRouteApp
              component={Permissions}
              middleware={['authenticate']}
            />
          }
        />
        <Route
          path="/:space/settings/backup"
          element={
            <ProtectedRouteApp
              component={BackupAndRestore}
              middleware={['authenticate']}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default RouterView;
