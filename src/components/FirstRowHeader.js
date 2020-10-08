import React from 'react';

import {
  Heading,
  Flex,
  Button,
  ButtonGroup
} from '@chakra-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FirstRowHeader = ({ title, pageNum, numPages, prevPage, nextPage }) => (
  <Flex justify="space-between">
    <Heading as="h1" size="xl">{title}</Heading>

    <ButtonGroup align="flex-end" paddingTop="4px">
      <Button onClick={prevPage} isDisabled={pageNum <= 1}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>

      {/* FIXME/HACK: Using button here because text looks nice when aligning within ButtonGroup */}
      <Button isDisabled>
        {`${pageNum} / ${numPages}`}
      </Button>

      <Button onClick={nextPage} isDisabled={pageNum >= numPages}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </ButtonGroup>
  </Flex>
);

export default FirstRowHeader;