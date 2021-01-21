import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const LoadingPage = ({ hasNavbar = false }) => {
  return (
    <Flex align="center" justify="center" minHeight={hasNavbar ? '90vh' : '100vh'}>
      <Spinner size="xl" />
    </Flex>
  );
};

export default LoadingPage;
