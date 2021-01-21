import React, { useRef } from 'react';

import {
  Flex,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SecondRowHeader = ({ onSearch = null, onChange = null, extraButtons = null }) => {
  const searchInput = useRef(null);

  return (
    <Flex>
      <InputGroup size="lg" flexGrow="1" >
        <Input
          rounded="0"
          placeholder="Search..."
          onChange={event => onChange && onChange(event.target.value.trim())}
          ref={searchInput}
        />
        <InputRightElement>
          <Button
            colorScheme="blue"
            isLoading={false}
            onClick={() => onSearch && onSearch(searchInput.current.value.trim())}
          >
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputRightElement>
      </InputGroup>

      {
        (extraButtons && Object.keys(extraButtons).length > 0) &&
        <ButtonGroup align="flex-end" paddingTop="4px" paddingLeft="4px">
          {extraButtons.map(({ icon, onClick }, i) => (
            <Button onClick={onClick} key={i}>
              <FontAwesomeIcon icon={icon} />
            </Button>
          ))}
        </ButtonGroup>
      }
    </Flex>
  );
}

export default SecondRowHeader;
