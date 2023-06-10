import { loginRequest } from '../authConfig';
import { msalInstance } from '../index';

export async function callMsGraph(graphEndpoint: string, blobResponse = false) {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      'No active account! Verify a user has been signed in and setActiveAccount has been called.'
    );
  }

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account,
  });

  const headers = new Headers();
  const bearer = `Bearer ${response.accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers: headers,
  };

  return fetch(graphEndpoint, options)
    .then((response) => (blobResponse ? response.blob() : response.json()))
    .catch((error) => console.log(error));
}
