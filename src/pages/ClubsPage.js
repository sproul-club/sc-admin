import React, { useState } from 'react';
import { useTitle } from 'hookrouter';
import {
  Box,
  Text,
  Flex,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../components/Table';

import { useDisclosure } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faChevronDown, faSync, faTrash } from '@fortawesome/free-solid-svg-icons';

import { GlobalAPI } from '../utils/backendClient';
import fileDownload from 'js-file-download';
import { useSearch, useSimplePaginator } from '../utils/hooks';
import DataLoaderPage from './DataLoaderPage';

import { toast } from 'react-toastify';
import DeleteModal from '../components/DeleteModal';

import FirstRowHeader from '../components/FirstRowHeader';
import SecondRowHeader from '../components/SecondRowHeader';

const NUM_CLUBS_SHOWN = 10;
const SEARCH_DELAY = 500;

async function fetchClubs() {
  const res = await GlobalAPI.client().get('/api/monitor/club/list');
  return res.data;
}

async function downloadClubs() {
  const res = await GlobalAPI.client().get('/api/monitor/club/download');

  // NOTE: Not a synchronous call!
  fileDownload(res.data, 'clubs.csv');
}

async function deleteClub(club) {
  try {
    await GlobalAPI.client().delete(`/api/monitor/club/${club.email}`);
    toast.success(`Successfully deleted club: '${club.name}'!`);
  } catch (err) {
    const apiError = err.response && err.response.data && err.response.data.reason;
    toast.error(apiError || err.message);
  }
}

const ClubRow = ({ club, onRequestDelete }) => (
  <TableRow>
    <TableCell>
      <Text fontSize="md" color="gray.500">
        {club.name}
      </Text>
    </TableCell>
    <TableCell>
      <Text fontSize="md" color="gray.500">
        {club.email}
      </Text>
    </TableCell>
    <TableCell bg={club.confirmed ? "green.200" : "red.200"}>
      <Text textAlign="center" fontSize="md" color="gray.500">
        {club.confirmed ? "Yes" : "No"}
      </Text>
    </TableCell>
    <TableCell textAlign="center">
      <Menu>
        <MenuButton as={Button} variant="ghost">
          <FontAwesomeIcon icon={faChevronDown} size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onRequestDelete}>
            <span>
              <FontAwesomeIcon icon={faTrash} size="sm" />
              {"  "}Remove
            </span>
          </MenuItem>
        </MenuList>
      </Menu>
    </TableCell>
  </TableRow>
);

const DeleteClubModal = ({ club = null, ctrl, onDelete }) => (
  club && <DeleteModal
    title="Delete Club"
    ctrl={ctrl}
    onDelete={() => onDelete(club)}
    fields={{
      'Club Name': club.name,
      'Club Email': club.email,
    }}
  />
);

const ClubListComponent = ({ clubs, setClubList }) => {
  const [search, dirtyView, searchView, onDataListChange] = useSearch({
    data: clubs,
    mapper: club => club.name,
    searchDelay: SEARCH_DELAY,
    onListChange: async () => {
      const newClubList = await fetchClubs();
      setClubList(newClubList);
    }
  });

  const [pageNum, numPages, clubListView, nextPage, prevPage] = useSimplePaginator(searchView, NUM_CLUBS_SHOWN);

  const deleteModalCtrl = useDisclosure();
  const [selectedClub, setSelectedClub] = useState(null);

  return (
    <Flex align="center" justify="center">
      <Stack paddingTop="32px">
        <FirstRowHeader
          title="Clubs"
          pageNum={pageNum}
          numPages={numPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />

        <Box
          paddingTop="8px"
          paddingBottom="4px"
        >
          <SecondRowHeader
            onChange={query => search.set(query)}
            onSearch={query => search.set(query)}
            extraButtons={[
              {icon: faDownload, onClick: downloadClubs},
              {icon: faSync, onClick: () => onDataListChange(() => {})}
            ]}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Club name</TableHeader>
              <TableHeader>Club email</TableHeader>
              <TableHeader>Confirmed?</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody opacity={dirtyView.get() ? 0.5 : 1}>
            <DeleteClubModal
              club={selectedClub}
              ctrl={deleteModalCtrl}
              onDelete={async (club) => {
                await onDataListChange(() => deleteClub(club));
                setSelectedClub(null);
              }}
            />

            {clubListView.map((club, i) => (
              <ClubRow
                key={i}
                club={club}
                onRequestDelete={() => {
                  setSelectedClub(club);
                  deleteModalCtrl.onOpen();
                }}
              />
            ))}
          </TableBody>
        </Table>
      </Stack>
    </Flex>
  );
}

const ClubsPage = () => {
  useTitle('Clubs - sproul.club Dashboard');

  return (
    <DataLoaderPage promiseFn={fetchClubs}>
      {(data, { setData }) => <ClubListComponent clubs={data} setClubList={setData} />}
    </DataLoaderPage>
  );
};

export default ClubsPage;
