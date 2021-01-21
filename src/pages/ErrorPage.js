import React from 'react';

import { Flex, Stack, Box, Heading, Icon } from '@chakra-ui/react';

const ERROR_MESSAGES = {
  404: 'Oh no! This page does not exist!',
  403: 'You are not allowed to go here!',
  500: "An internal server error has occurred! Call the backend dev about this abomination and tell them 'shame on you and your cow'."
}

const ErrorPage = ({ errorCode, errorMsg }) => {
  let finalErrorMsg = errorMsg || ERROR_MESSAGES[errorCode] || 'An unexpected error happened!';

  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Stack spacing={8} align="center" padding="32px">
        <Box paddingBottom="2.0rem" />
        <Icon name="warning" size="10rem" color="red.500"></Icon>
        {errorCode && <Heading as="h1" size="xl">Error {errorCode}</Heading>}
        <Heading as="h4" size="md">{finalErrorMsg}</Heading>
      </Stack>
    </Flex>
  );
};

export default ErrorPage;
