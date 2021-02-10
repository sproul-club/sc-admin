import React from 'react';
import { useTitle } from 'hookrouter';
import { Heading, Box, Flex, Grid, Stack, Button } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

import { GlobalAPI } from '../utils/backendClient';
import DataLoaderPage from './DataLoaderPage';

import ReactEcharts from 'echarts-for-react';

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
    GlobalAPI.client().get('/api/monitor/tags/list'),
    GlobalAPI.client().get('/api/monitor/more-stats/social-media'),
    GlobalAPI.client().get('/api/monitor/more-stats/club-reqs'),
    GlobalAPI.client().get('/api/monitor/more-stats/pic-stats'),
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

const SocialMediaUsageChart = ({ stats }) => {
  const labels = Object.keys(stats);
  const data = Object.values(stats);

  const bgColors = generateColors(data.length, BG_RAINBOW_COLORS);
  const borderColors = generateColors(data.length, BORDER_RAINBOW_COLORS);

  const option = {
    'title': {
      text: 'Social Media Usage',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      height: '100%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: labels,
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0
      }
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Count',
      type: 'bar',
      position: 'right',
      barWidth: '80%',
      data: data.map((value, i) => ({
        value,
        itemStyle: { color: bgColors[i], borderColor: borderColors[i] }
      }))
    }]
  };

  return (
    <ReactEcharts option={option} />
  );
};

const TagUsageChart = ({ stats }) => {
  const labels = stats.map(tag => tag.name);
  const data = stats.map(tag => tag.num_clubs);

  const bgColors = generateColors(data.length, BG_RAINBOW_COLORS);
  const borderColors = generateColors(data.length, BORDER_RAINBOW_COLORS);

  const option = {
    'title': {
      text: 'Tag Usage',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      height: '100%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: labels,
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Count',
      type: 'bar',
      barWidth: '80%',
      data: data.map((value, i) => ({
        value,
        itemStyle: { color: bgColors[i], borderColor: borderColors[i] }
      }))
    }]
  };

  return (
    <ReactEcharts option={option} />
  );
};

const ApplicationXMembersHeatChart = ({ stats }) => {
  const xLabels = ['Recruitment Open', 'Recruitment Closed'];
  const yLabels = ['App Required', 'No App Required'];
  const data = [
    [0, 0, stats.app_required_and_new_members], 
    [1, 0, stats.app_required_and_no_new_members],
    [0, 1, stats.no_app_required_and_new_members],
    [1, 1, stats.no_app_required_and_no_new_members],
  ];

  const option = {
    'title': {
      text: 'Recruitment & Application Status',
      left: 'center',
    },
    grid: {
      height: '50%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xLabels
    },
    yAxis: {
      type: 'category',
      data: yLabels
    },
    visualMap: {
      min: 0,
      max: [...Object.values(stats)].reduce((acc, val) => acc + val),
      orient: 'horizontal',
      left: 'center',
      inRange : {
        color: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)']
      }
    },
    series: [{
      type: 'heatmap',
      data: data,
      label: {
        show: true,
        fontSize: 18
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  return (
    <ReactEcharts option={option} />
  );
}

const LogoXBannerUsageHeatChart = ({ stats }) => {
  const xLabels = ['Has Logo Pic', 'No Logo Pic'];
  const yLabels = ['Has Banner Pic', 'No Banner Pic'];
  const data = [
    [0, 0, stats.logo_pic_and_banner_pic], 
    [1, 0, stats.logo_pic_and_no_banner_pic],
    [0, 1, stats.no_logo_pic_and_banner_pic],
    [1, 1, stats.no_logo_pic_and_no_banner_pic],
  ];

  const option = {
    'title': {
      text: 'Logo & Banner Usage',
      left: 'center',
    },
    grid: {
      height: '50%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xLabels
    },
    yAxis: {
      type: 'category',
      data: yLabels
    },
    visualMap: {
      min: 0,
      max: [...Object.values(stats)].reduce((acc, val) => acc + val),
      orient: 'horizontal',
      left: 'center',
      inRange : {   
        color: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)']
      }
    },
    series: [{
      type: 'heatmap',
      data: data,
      label: {
        show: true,
        fontSize: 18
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  return (
    <ReactEcharts option={option} />
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

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Card>
          <ApplicationXMembersHeatChart stats={stats.clubReqs} />
        </Card>

        <Card>
          <LogoXBannerUsageHeatChart stats={stats.picStats} />
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
