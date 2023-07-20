import React, { useEffect } from 'react';
import { loginPageSubject } from '../../events/LoginPageEvent';
import './style.scss';

interface Props {
}
const Home = (props: Props) => {
  useEffect(() => {
    loginPageSubject.next({ state: false });
    return () => {
      loginPageSubject.next({ state: true });
    };
  }, []);
  return (
    <div className="page-home">
      <div className="app-container smooth-page page-home--title">
        Secure identity and authentication provider
      </div>
      <div className="page-home--subtitle">
        Transit handles user account setup, password management and
        authentication needs of your organization. Connect all your
        applications/assets with a single user account per user. Supports
        sign-in with social identity providers such as Google, Outlook and
        Facebook.
      </div>
    </div>
  );
};

export default Home;
