import React from 'react';
import { useTitle } from 'hookrouter';
import { Heading, Box, Flex, Grid, Stack, Button } from '@chakra-ui/react';

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

import ChartComponent from 'react-chartjs-2';

import { GlobalAPI } from '../utils/backendClient';
import DataLoaderPage from './DataLoaderPage';

const BASE_PADDING = 48;
const SIDE_PADDING = 96;
const SECTION_PADDING = 16;
const CARD_GAP = 6;

const DataChart = ({ type, title, data, dataLabels, dataDescription, bgColors, borderColors, showLegend = false, beginAtZero = false }) => {
  const chartData = {
    labels: dataLabels,
    datasets: [{
      label: dataDescription,
      data: data,
      fill: false,
      backgroundColor: bgColors,
      borderColor: borderColors,
      borderWidth: 1
    }]
  };

  const chartOptions = {
    title: {
      display: true,
      text: title,
      fontSize: 18
    },
    legend: {
      display: showLegend
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: beginAtZero,
            callback: function(value) { if (value % 1 === 0) { return value; } }
          },
        }
      ],
    },
  };

  return (
    <ChartComponent
      data={chartData}
      options={chartOptions}
      type={type}
      height={50}
      width={100}
    />
  );
};

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
  const [signUpStats, activityStats] = await Promise.all([
    GlobalAPI.client().get('/api/monitor/overview/stats/sign-up'),
    GlobalAPI.client().get('/api/monitor/overview/stats/activity')
  ]);

  return {
    sign_up: signUpStats.data,
    activity: activityStats.data,
  }
}

function getStatArrow(value) {
  if (value > 0)
    return 'increase';
  else if (value < 0)
    return 'decrease';
  else
    return null;
}

const OverviewStatsDashboard = ({ stats, reload }) => {
  // Club officer stats
  const clubsRegistered = stats.sign_up.club_admin.main.clubs_registered;
  const clubsRegisteredRecent = stats.sign_up.club_admin.changed.clubs_registered;
  const clubsRegisteredHistory = stats.sign_up.club_admin.history.clubs_registered;

  const clubsConfirmed = stats.sign_up.club_admin.main.clubs_confirmed;
  const clubsConfirmedRecent = stats.sign_up.club_admin.changed.clubs_confirmed;
  const clubsConfirmedHistory = stats.sign_up.club_admin.history.clubs_confirmed;

  const clubsReactivated = stats.sign_up.club_admin.main.clubs_reactivated;
  const clubsReactivatedRecent = stats.sign_up.club_admin.changed.clubs_reactivated;
  const clubsReactivatedHistory = stats.sign_up.club_admin.history.clubs_reactivated;

  // Student stats
  const studentsRegistered = stats.sign_up.student.main.students_signed_up;
  const studentsRegisteredRecent = stats.sign_up.student.changed.students_signed_up;

  const studentsConfirmed = stats.sign_up.student.main.students_confirmed;
  const studentsConfirmedRecent = stats.sign_up.student.changed.students_confirmed;

  return (
    <Tabs
      isLazy
      variant="soft-rounded"
      padding={`${BASE_PADDING}px`}
      pr={`${SIDE_PADDING}px`}
      pl={`${SIDE_PADDING}px`}
    >
      <TabList>
        <Tab>Club Admins Accounts</Tab>
        <Tab>Student Accounts</Tab>
      </TabList>

      {/* Club Admins Accounts */}
      <TabPanels>
        <TabPanel>
          <Stack>
            <TitleHeading onReload={reload}>Sign Up</TitleHeading>
            <Grid templateColumns="repeat(4, 1fr)" gap={CARD_GAP}>
              <StatCard
                label="Number of clubs registered"
                number={clubsRegistered}
                arrow={getStatArrow(clubsRegisteredRecent)}
                helpText={`${Math.abs(clubsRegisteredRecent)} from past week`}
              />
              <StatCard
                label="Number of confirmed clubs"
                number={clubsConfirmed + ' / ' + clubsRegistered}
                arrow={getStatArrow(clubsConfirmedRecent)}
                helpText={`${Math.abs(clubsConfirmedRecent)} from past week`}
              />
              <StatCard
                label="Number of reactivated clubs"
                number={clubsReactivated + ' / ' + clubsConfirmed}
                arrow={getStatArrow(clubsReactivatedRecent)}
                helpText={`${Math.abs(clubsReactivatedRecent)} from past week`}
              />
              <StatCard
                label="Number of clubs on RSO list"
                number={stats.sign_up.club_admin.main.clubs_rso_list}
              />
            </Grid>

            <Grid templateColumns="repeat(3, 1fr)" gap={CARD_GAP}>
              <Card>
                <DataChart
                  type="bar"
                  title="Registered clubs over time"
                  dataLabels={[...Array(clubsRegisteredHistory.length).keys()].map(x => clubsRegisteredHistory.length - x - 1)}
                  data={clubsRegisteredHistory}
                  dataDescription="# of clubs"
                  bgColors="rgba(255, 99, 132, 0.4)"
                  beginAtZero />
              </Card>
              <Card>
                <DataChart
                  type="bar"
                  title="Confirmed clubs over time"
                  dataLabels={[...Array(clubsConfirmedHistory.length).keys()].map(x => clubsConfirmedHistory.length - x - 1)}
                  data={clubsConfirmedHistory}
                  dataDescription="# of clubs"
                  bgColors="rgba(75, 192, 192, 0.4)"
                  beginAtZero />
              </Card>
              <Card>
                <DataChart
                  type="bar"
                  title="Reactivated clubs over time"
                  dataLabels={[...Array(clubsReactivatedHistory.length).keys()].map(x => clubsReactivatedHistory.length - x - 1)}
                  data={clubsReactivatedHistory}
                  dataDescription="# of clubs"
                  bgColors="rgba(54, 162, 235, 0.4)"
                  beginAtZero />
              </Card>
            </Grid>

            <Box padding={`${SECTION_PADDING}px`} />

            <TitleHeading>Activity</TitleHeading>
            <Grid templateColumns="repeat(3, 1fr)" gap={CARD_GAP}>
              <StatCard
                label="Number of active club admins"
                number={stats.activity.active_club_admins}
              />
              <StatCard
                label="Number of active students"
                number={stats.activity.active_students}
              />
              <StatCard
                label="Number of searches"
                number={stats.activity.catalog_searches}
              />
            </Grid>
          </Stack>
        </TabPanel>

        {/* Student Accounts */}
        <TabPanel>
          <Stack>
            <TitleHeading onReload={reload}>Sign Up</TitleHeading>
            <Grid templateColumns="repeat(2, 1fr)" gap={CARD_GAP}>
              <StatCard
                label="Number of students registered"
                number={studentsRegistered}
                arrow={getStatArrow(studentsRegisteredRecent)}
                helpText={`${Math.abs(studentsRegisteredRecent)} from past week`}
              />
              <StatCard
                label="Number of students confirmed"
                number={studentsConfirmed}
                arrow={getStatArrow(studentsConfirmedRecent)}
                helpText={`${Math.abs(studentsConfirmedRecent)} from past week`}
              />
            </Grid>

            <Box padding={`${SECTION_PADDING}px`} />

            <TitleHeading>Activity</TitleHeading>
            <Grid templateColumns="repeat(3, 1fr)" gap={CARD_GAP}>
              <StatCard
                label="Number of active club admins"
                number={stats.activity.active_club_admins}
              />
              <StatCard
                label="Number of active students"
                number={stats.activity.active_students}
              />
              <StatCard
                label="Number of searches"
                number={stats.activity.catalog_searches}
              />
            </Grid>
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

const OverviewPage = () => {
  useTitle('Home - sproul.club Dashboard');

  return (
    <DataLoaderPage promiseFn={fetchStats}>
      {(data, { reload }) => <OverviewStatsDashboard stats={data} reload={reload} />}
    </DataLoaderPage>
  );
};

export default OverviewPage;
