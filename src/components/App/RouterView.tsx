import React from 'react';

import { Route } from 'react-router-dom';
import './RouterView.scss';
import OaLogin from '../Auth/OaLogin';
import OakRouteApp from '../Auth/OakRouteApp';
import OakRouteGraph from '../Auth/OakRouteGraph';
import Login from '../Login';
import ExternLogin from '../Auth/ExternLogin';
import OneAuth from '../Login/OneAuth';
import LandingPage from '../Page/LandingPage';
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

interface Props {
  cookies: any;
}

const RouterView = (props: Props) => {
  return (
    <div className="router-view">
      <Route
        path="/login"
        render={(propsLocal) => (
          <OakRouteApp {...propsLocal} {...props} component={OaLogin} />
        )}
      />
      <Route
        path="/home"
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={LandingPage}
            middleware={['readAuthentication']}
          />
        )}
      />
      <Route
        path="/company/edit"
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={EditCompanyPage}
            middleware={[]}
          />
        )}
      />
      <Route
        path="/:space/unauthorized"
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={UnauthorizedPage}
            middleware={['isAuthenticated']}
          />
        )}
      />
      <Route
        path="/"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={LandingPage}
            middleware={[]}
          />
        )}
      />
      <Route
        path="/:space/eventlist"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={EventListPage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/event/:id"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={ManageEventPage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/event"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={ManageEventPage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/track"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={EditTrackPage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/participant"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={EditParticipantPage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/checkin/:eventId/:participantReferenceId"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={CheckinPage}
            middleware={[]}
          />
        )}
      />
      <Route
        path="/:space/admin-checkin/:eventId/:code"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={AdminCheckinPage}
            middleware={[]}
          />
        )}
      />
      <Route
        path="/:space/admin-feed/:eventId/:code"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={AdminNewsFeed}
            middleware={[]}
          />
        )}
      />
      <Route
        path="/:space/settings/company"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={EditCompany}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/settings/user"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={Permissions}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/settings/backup"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={BackupAndRestore}
            middleware={['authenticate']}
          />
        )}
      />
    </div>
  );
};

export default RouterView;
