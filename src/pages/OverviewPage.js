import React from 'react';
import { useTitle } from 'hookrouter';
import { Heading, Box, Flex, Grid, Stack, Button } from '@chakra-ui/core';

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/core";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

import { API } from '../utils/backendClient';
import DataLoaderPage from './DataLoaderPage';

const BASE_PADDING = 48;
const SIDE_PADDING = 72;
const SECTION_PADDING = 16;
const CARD_GAP = 6;

const Card = props => (
  <Box px="4" py="5" rounded="sm" shadow="lg" {...props} />
);

const TitleHeading = ({ children, onReload }) => (
  <Flex justify="space-between" paddingBottom="8px">
    <Heading as="h3" size="lg">{children}</Heading>
    {onReload &&
      <Button onClick={onReload}>
        <FontAwesomeIcon icon={faRedo}/>
      </Button>
    }
  </Flex>
);

const StatCard = ({ label, number, arrow = null, helpText = null, isLoaded = false }) => (
  <Card>
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{number}</StatNumber>
      {helpText && <StatHelpText>
        {arrow && <StatArrow type={arrow} />}
        {helpText}
      </StatHelpText>}
    </Stat>
  </Card>
);

async function fetchStats() {
  const [signUpStats, activityStats, performanceStats] = await Promise.all([
    API.get('/api/monitor/overview/stats/sign-up'),
    API.get('/api/monitor/overview/stats/activity'),
    API.get('/api/monitor/overview/stats/performance'),
  ]);

  return {
    signUp: signUpStats.data.main,
    recentSignUp: signUpStats.data.changed,
    activity: activityStats.data,
    performance: performanceStats.data,
  }
}

const OverviewStatsDashboard = ({ stats, reload }) => (
  <Stack
    padding={`${BASE_PADDING}px`}
    pr={`${SIDE_PADDING}px`}
    pl={`${SIDE_PADDING}px`}
  >
    <TitleHeading onReload={reload}>Sign Up</TitleHeading>
    <Grid templateColumns="repeat(3, 1fr)" gap={CARD_GAP}>
      <StatCard
        label="Number of clubs registered"
        number={stats.signUp.clubs_registered}
        arrow={stats.recentSignUp.clubs_registered >= 0 ? "increase" : "decrease"}
        helpText={`${Math.abs(stats.recentSignUp.clubs_registered)} from past week`}
      />
      <StatCard
        label="Number of confirmed clubs"
        number={stats.signUp.clubs_confirmed}
        arrow={stats.recentSignUp.clubs_confirmed >= 0 ? "increase" : "decrease"}
        helpText={`${Math.abs(stats.recentSignUp.clubs_confirmed)} from past week`}
      />
      <StatCard
        label="Number of clubs on RSO list"
        number={stats.signUp.clubs_rso_list}
      />
    </Grid>

    <Box padding={`${SECTION_PADDING}px`} />

    <TitleHeading>Activity</TitleHeading>
    <Grid templateColumns="repeat(3, 1fr)" gap={CARD_GAP}>
      <StatCard
        label="Number of active club admins"
        number={stats.activity.active_admins}
      />
      <StatCard
        label="Number of active users"
        number={stats.activity.active_users}
      />
      <StatCard
        label="Number of searches"
        number={stats.activity.catalog_searches}
      />
    </Grid>

    <Box padding={`${SECTION_PADDING}px`} />

    <TitleHeading>Performance</TitleHeading>
    <Grid templateColumns="repeat(3, 1fr)" gap={CARD_GAP}>
      <StatCard
        label="Uptime"
        number={stats.performance.uptime_percent === 'N/A' ? 'N/A' : `${stats.performance.uptime_percent}%`}
        helpText="since 3 months"
      />
      <StatCard
        label="Number of API calls"
        number={stats.performance.api_calls}
        helpText="from past 30 minutes"
      />
      <StatCard
        label="Amount of data stored"
        number={stats.performance.data_stored === 'N/A' ? 'N/A' : `${stats.performance.data_stored} KB`}
      />
    </Grid>
  </Stack>
);

const OverviewPage = () => {
  useTitle('Home - sproul.club Dashboard');

  return (
    <DataLoaderPage promiseFn={fetchStats}>
      {(data, { reload }) => <OverviewStatsDashboard stats={data} reload={reload} />}
    </DataLoaderPage>
  );
};

export default OverviewPage;