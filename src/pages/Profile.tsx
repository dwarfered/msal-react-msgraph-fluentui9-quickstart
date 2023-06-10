import React from 'react';
import { useEffect, useState } from 'react';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
  AccountInfo,
} from '@azure/msal-browser';
import { graphConfig, loginRequest } from '../authConfig';
import { ProfileData, GraphData } from '../components/ProfileData';
import { Loading } from '../components/Loading';
import { ErrorComponent } from '../components/ErrorComponent';
import { callMsGraph } from '../utils/MsGraphApiCall';

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState<null | GraphData>(null);

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      callMsGraph(graphConfig.graphMeEndpoint)
        .then((response) => setGraphData(response))
        .catch((e) => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount() as AccountInfo,
            });
          }
        });
    }
  }, [inProgress, graphData, instance]);

  return <>{graphData ? <ProfileData graphData={graphData} /> : null}</>;
};

export function Profile() {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <ProfileContent />
    </MsalAuthenticationTemplate>
  );
}
