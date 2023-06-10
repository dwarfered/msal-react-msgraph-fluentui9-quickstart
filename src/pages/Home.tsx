import React from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { Button } from '@fluentui/react-components';

import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate('/profile');

  return (
    <>
      <AuthenticatedTemplate>
        <Button appearance="primary" as="button" onClick={handleOnClick}>
          Request Profile Information
        </Button>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        Please sign-in to see your profile information.
      </UnauthenticatedTemplate>
    </>
  );
}
