import { Configuration, PopupRequest } from '@azure/msal-browser';

const ApplicationId = '<YOUR CLIENT ID>';
const TenantId = '<YOUR AZURE AD TENANT ID>';

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: ApplicationId,
    authority: `https://login.microsoftonline.com/${TenantId}`,
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: ['User.Read'],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphMePhotoEndpoint:
    'https://graph.microsoft.com/v1.0/me/photos/48x48/$value',
};
