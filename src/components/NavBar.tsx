import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignInSignOutButton from './SignInSignOutButton';
import {
  Button,
  makeStyles,
  shorthands,
  tokens,
  Toolbar,
  ToolbarGroup,
  ToolbarProps,
  typographyStyles,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.padding(0),
  },
  toolbarButton: {
    color: tokens.colorBrandBackgroundInverted,
    ...typographyStyles.subtitle2,

  },
});

export const FarGroup = (props: Partial<ToolbarProps>) => {
  const navigate = useNavigate();
  const handleOnClick = () => navigate('/');

  const styles = useStyles();
  return (
    <Toolbar aria-label="with Separeted Groups" className={styles.toolbar}>
      <ToolbarGroup role="presentation">
        <Button shape='square' size='large' className={styles.toolbarButton} appearance="primary" onClick={handleOnClick}>
          ms-identity-typescript-react
        </Button>
      </ToolbarGroup>
      <ToolbarGroup role="presentation">
        <SignInSignOutButton />
      </ToolbarGroup>
    </Toolbar>
  );
};

const NavBar = () => {
  return <FarGroup />;
};

export default NavBar;
