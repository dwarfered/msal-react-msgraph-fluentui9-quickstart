import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignInSignOutButton from './SignInSignOutButton';
import {
  Link,
  makeStyles,
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
  },
  link: {
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
      <ToolbarGroup className={styles.link} role="presentation">
        <Link className={styles.link} onClick={handleOnClick}>
          ms-identity-typescript-react
        </Link>
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
