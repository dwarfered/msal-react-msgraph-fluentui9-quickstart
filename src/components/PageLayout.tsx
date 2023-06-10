import React from 'react';
import NavBar from './NavBar';
import {
  makeStyles,
  tokens,
  Portal,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorBrandBackground,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
});

type Props = {
  children?: React.ReactNode;
};

export const PageLayout: React.FC<Props> = ({ children }) => {
  const styles = useStyles();
  const [rootElement, setRootElement] = React.useState<HTMLElement | null>(
    null
  );

  return (
    <>
      <div className={styles.container} style={{ overflow: 'hidden' }}>
        <NavBar />
        <Portal mountNode={rootElement}></Portal>
      </div>

      <div ref={setRootElement} />
      <br />
      <div className={styles.content}>{children}</div>
    </>
  );
};
