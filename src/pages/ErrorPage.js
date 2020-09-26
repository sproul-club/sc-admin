import React from 'react';
import { Stack, Box, Heading, Icon } from '@chakra-ui/core';

const ERROR_MESSAGES = {
  404: 'Oh no! This page does not exist!',
  403: 'You are not allowed to go here!',
  500: "An internal server error has occurred! Call the backend dev about this abomination and tell them 'shame on you and your cow'."
}

const ErrorPage = ({ errorCode, errorMsg }) => {
  let finalErrorMsg = errorMsg || ERROR_MESSAGES[errorCode];
  if (typeof finalErrorMsg !== 'string')
    finalErrorMsg = `An unexpected error happened: Code ${errorCode}`;

  return (
    <Stack spacing={8} align="center" padding="32px">
      <Box paddingBottom="2.0rem" />
      <Icon name="warning" size="10rem" color="red.500"></Icon>
      <Heading as="h1" size="xl">Error {errorCode}</Heading>
      <Heading as="h4" size="md">{finalErrorMsg}</Heading>
    </Stack>
  );
};

export default ErrorPage;
