import React from 'react';
import { MsalAuthenticationResult } from '@azure/msal-react';
import { Body1 } from '@fluentui/react-components';

export const ErrorComponent: React.FC<MsalAuthenticationResult> = ({
  error,
}) => {
  return (
    <Body1>
      An Error Occurred: {error ? error.errorCode : 'unknown error'}
    </Body1>
  );
};
