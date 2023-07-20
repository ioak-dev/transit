import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.scss';
import Logo from './Logo';
import { setSessionValue } from '../../../utils/SessionUtils';
import {
  AuthliteComponents,
  AuthliteTypes,
  AuthliteAuthenticationService,
} from 'authlite';

interface Props {
}

const appRealm = process.env.REACT_APP_ONEAUTH_APPSPACE_ID || '';
const apiKey = process.env.REACT_APP_ONEAUTH_API_KEY || '';
const environment: any = process.env.REACT_APP_ENVIRONMENT || 'local';

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [view, setView] = useState<AuthliteTypes.PageView>(AuthliteTypes.PageView.signin);
  const [successPage, setSuccessPage] = useState<'signin' | 'signup' | 'resetpassword' | 'resendverifylink' | null>(null);
  const [forgotPasswordFormErrorMessages, setForgotPasswordFormErrorMessages] = useState<AuthliteTypes.ForgotPasswordFormErrorMessages>({});
  const [resendVerifyLinkFormErrorMessages, setResendVerifyLinkFormErrorMessages] = useState<AuthliteTypes.ResendVerifyLinkFormErrorMessages>({});
  const [signinFormErrorMessages, setSigninFormErrorMessages] = useState<AuthliteTypes.SigninFormErrorMessages>({});
  const [signupFormErrorMessages, setSignupFormErrorMessages] = useState<AuthliteTypes.SignupFormErrorMessages>({});

  const onSignin = (payload: AuthliteTypes.SigninRequest) => {
    AuthliteAuthenticationService.signin(environment, appRealm, payload).then((response: AuthliteTypes.SigninResponse) => {
      console.log(response);
      setSigninFormErrorMessages(response.errorMessages);
      if (response.outcome === 'SUCCESS') {
        setSessionValue(`transit-access_token`, response.data.access_token);
        setSessionValue(`transit-refresh_token`, response.data.refresh_token);
        navigate(searchParams.get("from") || '/home');
      }
    })
  }

  const onSignup = (data: AuthliteTypes.SignupRequest) => {
    AuthliteAuthenticationService.signup(environment, appRealm, data, apiKey).then((response: AuthliteTypes.SignupResponse) => {
      console.log(response);
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("signup");
      }
      setSignupFormErrorMessages(response.errorMessages);
    })
  }

  const onForgotPassword = (data: AuthliteTypes.SignupRequest) => {
    AuthliteAuthenticationService.resetPasswordLink(environment, appRealm, data).then((response: AuthliteTypes.ForgotPasswordResponse) => {
      console.log(response);
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("resetpassword");
      }
      setForgotPasswordFormErrorMessages(response.errorMessages);
    })
  }

  const onResendVerifyLink = (data: AuthliteTypes.ResendVerifyLinkRequest) => {
    AuthliteAuthenticationService.resendVerifyLink(environment, appRealm, data).then((response: AuthliteTypes.ResendVerifyLinkResponse) => {
      console.log(response);
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("resendverifylink");
      }
      setResendVerifyLinkFormErrorMessages(response.errorMessages);
    })
  }

  const clearErrorMessages = () => {
    setSigninFormErrorMessages({});
    setSignupFormErrorMessages({});
  }

  return (
    <AuthliteComponents.Login
      onSignin={onSignin}
      onSignup={onSignup}
      onForgotPassword={onForgotPassword}
      onResendVerifyLink={onResendVerifyLink}
      signinFormErrorMessages={signinFormErrorMessages}
      signupFormErrorMessages={signupFormErrorMessages}
      forgotPasswordFormErrorMessages={forgotPasswordFormErrorMessages}
      resendVerifyLinkFormErrorMessages={resendVerifyLinkFormErrorMessages}
      clearErrorMessages={clearErrorMessages}
      view={view}
      changeView={setView}
    >
      <AuthliteComponents.Logo>
        <Logo variant='full' />
      </AuthliteComponents.Logo>
      <AuthliteComponents.Placeholder>
        {successPage === "signin" && <AuthliteComponents.InfoPage heading='Authentication successful!'>
          <AuthliteComponents.InfoPageDescription>
            Posuere ipsum tellus ornare rutrumaliquam torquent fermentum euismod musvestibulum tincidunt cursus quisque elitsuspendisse augue. rutrumaliquam commodo <a onClick={() => setView(AuthliteTypes.PageView.signin)}>login now</a> parturient rutrumaliquam nec varius sociosqu.
          </AuthliteComponents.InfoPageDescription>
          <AuthliteComponents.InfoPageFootnote>
            Commodo nullam et facilisis hendrerit pharetra platea duis commodo nascetur libero aptent
          </AuthliteComponents.InfoPageFootnote>
        </AuthliteComponents.InfoPage>}
        {successPage === "signup" && <AuthliteComponents.InfoPage heading='User account created!'>
          <AuthliteComponents.InfoPageDescription>
            Gravida dolor suscipit urna sagittis per  <a onClick={() => setView(AuthliteTypes.PageView.signin)}>login now</a> parturient eu. laoreet congue fermentum ipsum tincidunt elementum auctor aptent aliquam feugiat interdum. porta sem metus convallis donec nam sodales.
          </AuthliteComponents.InfoPageDescription>
          <AuthliteComponents.InfoPageFootnote>
            Rutrum elit lacus consequat justo luctus per proin venenatis varius quam dui dignissim etiam
          </AuthliteComponents.InfoPageFootnote>
        </AuthliteComponents.InfoPage>}
        {successPage === "resetpassword" && <AuthliteComponents.InfoPage heading='Password reset link sent!'>
          <AuthliteComponents.InfoPageDescription>
            Gravida dolor suscipit urna sagittis per  <a onClick={() => setView(AuthliteTypes.PageView.signin)}>login now</a> parturient eu. laoreet congue fermentum ipsum tincidunt elementum auctor aptent aliquam feugiat interdum. porta sem metus convallis donec nam sodales.
          </AuthliteComponents.InfoPageDescription>
          <AuthliteComponents.InfoPageFootnote>
            Rutrum elit lacus consequat justo luctus per proin venenatis varius quam dui dignissim etiam
          </AuthliteComponents.InfoPageFootnote>
        </AuthliteComponents.InfoPage>}
        {successPage === "resendverifylink" && <AuthliteComponents.InfoPage heading='Email confirmation link sent!'>
          <AuthliteComponents.InfoPageDescription>
            Please check your email for  <a onClick={() => setView(AuthliteTypes.PageView.signin)}>login now</a> parturient eu. laoreet congue fermentum ipsum tincidunt elementum auctor aptent aliquam feugiat interdum. porta sem metus convallis donec nam sodales.
          </AuthliteComponents.InfoPageDescription>
          <AuthliteComponents.InfoPageFootnote>
            Rutrum elit lacus consequat justo luctus per proin venenatis varius quam dui dignissim etiam
          </AuthliteComponents.InfoPageFootnote>
        </AuthliteComponents.InfoPage>}
      </AuthliteComponents.Placeholder>
    </AuthliteComponents.Login>
  );
};

export default LoginPage;
