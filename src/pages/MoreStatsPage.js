import React from 'react';
import { useTitle } from 'hookrouter';
import { Heading, Box, Flex, Grid, Stack, Button } from '@chakra-ui/core';

import ChartComponent from 'react-chartjs-2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

import { API } from '../utils/backendClient';
import DataLoaderPage from './DataLoaderPage';

const BG_RAINBOW_COLORS = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)',
];

const BORDER_RAINBOW_COLORS = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)',
];

async function fetchMoreStats() {
  const [tagUsage, socialMediaUsage, clubReqStats, picStats] = await Promise.all([
    API.get('/api/monitor/tags/list'),
    API.get('/api/monitor/more-stats/social-media'),
    API.get('/api/monitor/more-stats/club-reqs'),
    API.get('/api/monitor/more-stats/pic-stats'),
  ]);

  return {
    tagUsage: tagUsage.data,
    socialMedia: socialMediaUsage.data[0],
    clubReqs: clubReqStats.data[0],
    picStats: picStats.data[0],
  }
}

const Card = props => (
  <Box px="4" py="5" rounded="sm" shadow="lg" {...props} />
);

function generateColors(numDataPoints, colorList) {
  const colors = [];
  for (let i = 0; i < numDataPoints; i++)
    colors.push(colorList[i % colorList.length]);

  return colors;
}

const DataChart = ({ type, title, data, dataLabels, dataDescription, bgColors, borderColors, showLegend = false }) => {
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

const SocialMediaUsageChart = ({ stats }) => {
  const labels = Object.keys(stats);
  const data = Object.values(stats);
  const numPoints = data.length;

  const bgColors = generateColors(numPoints, BG_RAINBOW_COLORS);
  const borderColors = generateColors(numPoints, BORDER_RAINBOW_COLORS);

  return (
    <DataChart
      type="horizontalBar"
      title="Social Media Usage"
      data={data}
      dataLabels={labels}
      dataDescription="# of clubs"
      bgColors={bgColors}
      borderColors={borderColors}
      showLegend />
  );
};

const TagUsageChart = ({ stats }) => {
  const labels = stats.map(tag => tag.name);
  const data = stats.map(tag => tag.num_clubs);
  const numPoints = data.length;

  const bgColors = generateColors(numPoints, BG_RAINBOW_COLORS);
  const borderColors = generateColors(numPoints, BORDER_RAINBOW_COLORS);

  return (
    <DataChart
      type="bar"
      title="Tag Usage"
      data={data}
      dataLabels={labels}
      dataDescription="# of clubs"
      bgColors={bgColors}
      borderColors={borderColors}
      showLegend />
  );
};

const AppRequiredChart = ({ stats }) => {
  const labels = ['Yes', 'No'];
  const data = [stats.app_required, stats.no_app_required];

  const bgColors = [BG_RAINBOW_COLORS[3], BG_RAINBOW_COLORS[0]];
  const borderColors = [BORDER_RAINBOW_COLORS[3], BORDER_RAINBOW_COLORS[0]];

  return (
    <DataChart
      type="doughnut"
      title="App Required?"
      data={data}
      dataLabels={labels}
      dataDescription="# of clubs"
      bgColors={bgColors}
      borderColors={borderColors} />
  );
}

const NewMembersChart = ({ stats }) => {
  const labels = ['Yes', 'No'];
  const data = [stats.new_members, stats.no_new_members];

  const bgColors = [BG_RAINBOW_COLORS[3], BG_RAINBOW_COLORS[0]];
  const borderColors = [BORDER_RAINBOW_COLORS[3], BORDER_RAINBOW_COLORS[0]];

  return (
    <DataChart
      type="doughnut"
      title="New Members?"
      data={data}
      dataLabels={labels}
      dataDescription="# of clubs"
      bgColors={bgColors}
      borderColors={borderColors} />
  );
}

const LogoUsageChart = ({ stats }) => {
  const labels = ['Yes', 'No'];
  const data = [stats.logo_pic, stats.no_logo_pic];

  const bgColors = [BG_RAINBOW_COLORS[3], BG_RAINBOW_COLORS[0]];
  const borderColors = [BORDER_RAINBOW_COLORS[3], BORDER_RAINBOW_COLORS[0]];

  return (
    <DataChart
      type="doughnut"
      title="Has Logo?"
      data={data}
      dataLabels={labels}
      dataDescription="# of clubs"
      bgColors={bgColors}
      borderColors={borderColors} />
  );
}

const BannerUsageChart = ({ stats }) => {
  const labels = ['Yes', 'No'];
  const data = [stats.banner_pic, stats.no_banner_pic];

  const bgColors = [BG_RAINBOW_COLORS[3], BG_RAINBOW_COLORS[0]];
  const borderColors = [BORDER_RAINBOW_COLORS[3], BORDER_RAINBOW_COLORS[0]];

  return (
    <DataChart
      type="doughnut"
      title="Has Banner?"
      data={data}
      dataLabels={labels}
      dataDescription="# of clubs"
      bgColors={bgColors}
      borderColors={borderColors} />
  );
}

const MoreStatsDashboard = ({ stats, reload }) => {
  return (
    <Stack padding="24px" pr="108px" pl="108px">
      <Flex justify="space-between">
        <Heading as="h3" size="lg">More Statistics</Heading>
        <Button onClick={reload}>
          <FontAwesomeIcon icon={faRedo}/>
        </Button>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Card>
          <SocialMediaUsageChart stats={stats.socialMedia} />
        </Card>

        <Card>
          <TagUsageChart stats={stats.tagUsage} />
        </Card>
      </Grid>

      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Card>
          <AppRequiredChart stats={stats.clubReqs} />
        </Card>

        <Card>
          <NewMembersChart stats={stats.clubReqs} />
        </Card>

        <Card>
          <LogoUsageChart stats={stats.picStats} />
        </Card>

        <Card>
          <BannerUsageChart stats={stats.picStats} />
        </Card>
      </Grid>
    </Stack>
  );
}

const MoreStatsPage = () => {
  useTitle('More Stats - sproul.club Dashboard');

  return (
    <DataLoaderPage promiseFn={fetchMoreStats}>
      {(data, { reload }) => <MoreStatsDashboard stats={data} reload={reload} />}
    </DataLoaderPage>
  );
};

export default MoreStatsPage;