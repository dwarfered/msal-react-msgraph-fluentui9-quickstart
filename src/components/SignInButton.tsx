import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  makeStyles,
  typographyStyles,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  buttonText: {
    '&text': typographyStyles.body1,
    marginRight: '5px',
  },
});

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {
    if (loginType === 'popup') {
      instance
        .loginPopup(loginRequest)
        .then(function (response) {
          // success response
        })
        .catch(function (error) {
          // the user likely closed the popup
          console.log(error);
        });
    } else if (loginType === 'redirect') {
      instance.loginRedirect(loginRequest);
    }
  };

  const styles = useStyles();

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        {/* <MenuButton>Sign in</MenuButton> */}
        <Button size="small" shape="square" appearance="primary">
          <Text className={styles.buttonText}>Sign-in</Text>
          <Avatar />
        </Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem onClick={() => handleLogin('popup')} key="loginPopup">
            Sign in using Popup
          </MenuItem>
          <MenuItem onClick={() => handleLogin('redirect')} key="loginRedirect">
            Sign in using Redirect
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
