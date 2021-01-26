import React, { useState } from 'react';
import { useTitle } from 'hookrouter';
import {
  Box,
  Text,
  Flex,
  Stack,
  Button,
} from '@chakra-ui/react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
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
import { faPlus, faDownload, faSync, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';

import { GlobalAPI } from '../utils/backendClient';
import fileDownload from 'js-file-download';
import { useSearch, useSimplePaginator } from '../utils/hooks';
import DataLoaderPage from './DataLoaderPage';

import FirstRowHeader from '../components/FirstRowHeader';
import SecondRowHeader from '../components/SecondRowHeader';

import { toast } from 'react-toastify';
import AddEditModal from '../components/AddEditModal';
import DeleteModal from '../components/DeleteModal';

const SEARCH_DELAY = 500;
const NUM_EMAILS_SHOWN = 10;

async function fetchRSOList() {
  const res = await GlobalAPI.client().get('/api/monitor/rso/list');
  return res.data;
}

async function downloadRSOList() {
  const res = await GlobalAPI.client().get('/api/monitor/rso/download');

  // NOTE: Not a synchronous call!
  fileDownload(res.data, 'rso_emails.csv');
}

async function addRSOEmail(email) {
  try {
    await GlobalAPI.client().post(`/api/monitor/rso`, { email });
    toast.success(`Successfully added RSO email: '${email}'!`);
  } catch (err) {
    const apiError = err.response && err.response.data && err.response.data.reason;
    toast.error(apiError || err.message);
  }
}

async function deleteRSOEmail(email) {
  try {
    await GlobalAPI.client().delete(`/api/monitor/rso/${email}`);
    toast.success(`Successfully deleted RSO email: '${email}'!`);
  } catch (err) {
    const apiError = err.response && err.response.data && err.response.data.reason;
    toast.error(apiError || err.message);
  }
}

const RSOEmailRow = ({ rso, onRequestDelete }) => (
  <TableRow>
    <TableCell>
      <Text fontSize="md" color="gray.500">
        {rso.email}
      </Text>
    </TableCell>
    <TableCell bg={rso.registered ? "green.200" : "red.200"}>
      <Text textAlign="center" fontSize="md" color="gray.500">
        {rso.registered ? "Yes" : "No"}
      </Text>
    </TableCell>
    <TableCell bg={rso.confirmed ? "green.200" : "red.200"}>
      <Text textAlign="center" fontSize="md" color="gray.500">
        {rso.confirmed ? "Yes" : "No"}
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

const AddRSOModal = ({ ctrl, onAdd }) => (
  <AddEditModal
    title="Add RSO Email"
    ctrl={ctrl}
    onSave={onAdd}
    fields={{
      email: {
        name: 'RSO Email',
        value: ''
      }
    }}
  />
);

const DeleteRSOModal = ({ rso = null, ctrl, onDelete }) => (
  rso &&
  <DeleteModal
    title="Delete RSO Email"
    ctrl={ctrl}
    onDelete={() => onDelete(rso)}
    fields={{
      'RSO Email': rso.email,
      'Registered': (rso.registered ? 'Yes' : 'No'),
      'Confirmed': (rso.confirmed ? 'Yes' : 'No'),
    }}
  />
);

const RSOListComponent = ({ rsoList, setRsoList }) => {
  const [search, dirtyView, searchView, onDataListChange] = useSearch({
    data: rsoList,
    mapper: rso => rso.email,
    searchDelay: SEARCH_DELAY,
    onListChange: async () => {
      const newRsoList = await fetchRSOList();
      setRsoList(newRsoList);
    }
  });

  const [pageNum, numPages, rsoListView, nextPage, prevPage] = useSimplePaginator(searchView, NUM_EMAILS_SHOWN);

  const deleteModalCtrl = useDisclosure();
  const addModalCtrl = useDisclosure();
  const [selectedRSO, setSelectedRSO] = useState(null);

  return (
    <Flex align="center" justify="center">
      <Stack paddingTop="32px">
        <FirstRowHeader
          title="RSO List"
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
              {icon: faPlus, onClick: addModalCtrl.onOpen},
              {icon: faDownload, onClick: downloadRSOList},
              {icon: faSync, onClick: () => onDataListChange(() => {})}
            ]}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Club email</TableHeader>
              <TableHeader>Registered?</TableHeader>
              <TableHeader>Confirmed?</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody opacity={dirtyView.get() ? 0.5 : 1}>
            <AddRSOModal
              ctrl={addModalCtrl}
              onAdd={async (rso) => {
                await onDataListChange(() => addRSOEmail(rso.email));
                setSelectedRSO(null);
              }}
            />

            <DeleteRSOModal
              rso={selectedRSO}
              ctrl={deleteModalCtrl}
              onDelete={async (rso) => {
                await onDataListChange(() => deleteRSOEmail(rso.email));
                setSelectedRSO(null);
              }}
            />

            {rsoListView.map((rso, i) => (
              <RSOEmailRow
                key={i}
                rso={rso}
                onRequestDelete={() => {
                  setSelectedRSO(rso);
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


const RSOListPage = () => {
  useTitle('RSO List - sproul.club Dashboard');

  return (
    <DataLoaderPage promiseFn={fetchRSOList}>
      {(data, { setData }) => <RSOListComponent rsoList={data} setRsoList={setData} />}
    </DataLoaderPage>
  );
};

export default RSOListPage;
