import React from 'react';
import {
  PersonRegular,
  MailRegular,
  LocationRegular,
  PhoneRegular,
  InfoRegular,
} from '@fluentui/react-icons';
import {
  Avatar,
  makeStyles,
  tokens,
  Text,
  Caption1,
  Card,
  CardHeader,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  card: {
    width: '400px',
    height: 'fit-content',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },
});

export type GraphData = {
  displayName: string;
  jobTitle: string;
  mail: string;
  businessPhones: string[];
  officeLocation: string;
};

export const GraphAttribute = (props: any) => {
  const styles = useStyles();
  return (
    <>
      <Card
        appearance="outline"
        className={styles.card}
        size="small"
        role="listitem"
      >
        <CardHeader
          image={<Avatar icon={props.icon} aria-label={props.attribute} />}
          header={<Text weight="semibold">{props.title}</Text>}
          description={
            <Caption1 className={styles.caption}>{props.displayName}</Caption1>
          }
        />
      </Card>
    </>
  );
};

export const ProfileData: React.FC<{ graphData: GraphData }> = ({
  graphData,
}) => {
  return (
    <>
      <Card>
        <CardHeader
          header={
            <Text weight="semibold">https://graph.microsoft.com/v1.0/me</Text>
          }
          description={<Caption1>Microsoft Graph</Caption1>}
        />

        <GraphAttribute
          title="Name"
          icon={<PersonRegular />}
          displayName={graphData.displayName}
        />
        <GraphAttribute
          title="Job Title"
          icon={<InfoRegular />}
          displayName={graphData.jobTitle}
        />
        <GraphAttribute
          title="Mail"
          icon={<MailRegular />}
          displayName={graphData.mail}
        />
        <GraphAttribute
          title="Phone"
          icon={<PhoneRegular />}
          displayName={graphData.businessPhones[0]}
        />
        <GraphAttribute
          title="Location"
          icon={<LocationRegular />}
          displayName={graphData.officeLocation}
        />
      </Card>
    </>
  );
};
