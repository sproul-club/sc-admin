import React, { Fragment, useRef } from 'react';

import {
  Button,
  Input,
  Stack,
  Heading,
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

import { useDiffCheck } from '../utils/hooks';

function constructObj(_fields, ref) {
  const copy = {};
  Object.keys(_fields).forEach(key => {
    if (ref.current[key])
      copy[key] = ref.current[key].value.trim();
    else
      copy[key] = _fields[key].value;
  });

  return copy;
}

const AddEditModal = ({ title, fields, ctrl, onSave }) => {
  const fieldsRef = useRef({});

  const orig = constructObj(fields, fieldsRef);
  const [copy, setCopy, isSame] = useDiffCheck(orig);

  return (
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
              {Object.entries(fields).map(([key, meta]) => (
                <Fragment key={key}>
                  <Heading size="md">{meta.name}</Heading>
                  <Input
                    placeholder={meta.name}
                    defaultValue={meta.value || ''}
                    onChange={() => setCopy(constructObj(fields, fieldsRef))}
                    ref={ref => fieldsRef.current[key] = ref} />
                </Fragment>
              ))}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={isSame}
              onClick={async () => {
                ctrl.onClose();
                await onSave(copy);
              }}>
              Save
            </Button>

            <Button onClick={ctrl.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

export default AddEditModal;
