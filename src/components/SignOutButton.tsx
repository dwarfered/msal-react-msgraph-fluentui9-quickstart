import React from 'react';
import { useEffect, useState } from 'react';
import { useAccount, useMsal } from '@azure/msal-react';
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import {
  AccountInfo,
  InteractionRequiredAuthError,
  InteractionStatus,
} from '@azure/msal-browser';
import { callMsGraph } from '../utils/MsGraphApiCall';
import { graphConfig, loginRequest } from '../authConfig';

export const SignOutButton = () => {
  const { instance } = useMsal();
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [name, setName] = useState('');

  const { inProgress } = useMsal();
  const [graphData, setGraphData] = useState<null | Blob>(null);

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      callMsGraph(graphConfig.graphMePhotoEndpoint, true)
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

  useEffect(() => {
    if (account && account.name) {
      setName(account.name);
    } else {
      setName('');
    }
  }, [account]);

  const handleLogout = (logoutType: string) => {
    if (logoutType === 'popup') {
      instance.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else if (logoutType === 'redirect') {
      instance.logoutRedirect();
    }
  };

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button size="small" shape="square" appearance="primary">
          <Avatar
            name={name}
            image={{
              src: graphData ? URL.createObjectURL(graphData) : '',
            }}
          />
        </Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem onClick={() => handleLogout('popup')} key="logoutPopup">
            Logout using Popup
          </MenuItem>
          <MenuItem
            onClick={() => handleLogout('redirect')}
            key="logoutRedirect"
          >
            Logout using Redirect
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
