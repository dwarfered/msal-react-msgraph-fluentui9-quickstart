import React from 'react';
import { useEffect, useState } from 'react';
import { useMsal, useAccount } from '@azure/msal-react';
import { Body1 } from '@fluentui/react-components';

const WelcomeName = () => {
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [name, setName] = useState('');

  useEffect(() => {
    if (account && account.name) {
      setName(account.name.split(' ')[0]);
    } else {
      setName('');
    }
  }, [account]);

  if (name) {
    return <Body1 >Welcome, {name}</Body1>;
  } else {
    return null;
  }
};

export default WelcomeName;
