import React, { Fragment } from 'react';

import {
  Button,
  ButtonGroup,
  Heading,
  Stack,
  Text
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';

const DeleteModal = ({ title, fields, ctrl, onDelete }) => (
  <Modal
    isOpen={ctrl.isOpen}
    onClose={ctrl.onClose}
    isCentered
  >
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={3}>
            {fields && Object.keys(fields).map((key, i) => (
              <Fragment key={i}>
                <Heading size="md">{key}</Heading>
                <Text>{fields[key]}</Text>
              </Fragment>
            ))}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red" mr={3}>
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Are you sure?</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <ButtonGroup size="sm">
                  <Button
                    colorScheme="red"
                    onClick={async () => {
                      ctrl.onClose();
                      await onDelete();
                    }}
                  >
                    Yes
                  </Button>
                  <Button onClick={ctrl.onClose}>No</Button>
                </ButtonGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button onClick={ctrl.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  </Modal>
);

export default DeleteModal;
