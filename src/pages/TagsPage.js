import React, { useState } from 'react';
import { useTitle } from 'hookrouter';

import {
  Box,
  Flex,
  Stack,
  Button,
  Text,
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
import { faDownload, faChevronDown, faPlus, faEdit, faSync, faTrash } from '@fortawesome/free-solid-svg-icons';

import { GlobalAPI } from '../utils/backendClient';
import fileDownload from 'js-file-download';
import { useSearch, useSimplePaginator } from '../utils/hooks';
import DataLoaderPage from './DataLoaderPage';

import { toast } from 'react-toastify';
import AddEditModal from '../components/AddEditModal';
import DeleteModal from '../components/DeleteModal';

import FirstRowHeader from '../components/FirstRowHeader';
import SecondRowHeader from '../components/SecondRowHeader';

const SEARCH_DELAY = 500;
const NUM_TAGS_SHOWN = 10;

async function fetchTags() {
  const res = await GlobalAPI.client().get('/api/monitor/tags/list');
  return res.data;
}

async function downloadTags() {
  const res = await GlobalAPI.client().get('/api/monitor/tags/download');

  // NOTE: Not a synchronous call!
  fileDownload(res.data, 'tags.csv');
}

async function addTag(tag) {
  try {
    await GlobalAPI.client().post(`/api/monitor/tags`, { name: tag.name });
    toast.success(`Successfully added tag: '${tag.name}'!`);
  } catch (err) {
    const apiError = err.response && err.response.data && err.response.data.reason;
    toast.error(apiError || err.message);
  }
}

async function editTag(tag, newTag) {
  try {
    await GlobalAPI.client().put(`/api/monitor/tags/${tag._id}`, { name: newTag.name });
    toast.success(`Successfully changed tag name from '${tag.name}'' to '${newTag.name}'!`);
  } catch (err) {
    const apiError = err.response && err.response.data && err.response.data.reason;
    toast.error(apiError || err.message);
  }
}

async function deleteTag(tag) {
  try {
    await GlobalAPI.client().delete(`/api/monitor/tags/${tag._id}`);
    toast.success(`Successfully deleted tag: '${tag.name}'!`);
  } catch (err) {
    const apiError = err.response && err.response.data && err.response.data.reason;
    toast.error(apiError || err.message);
  }
}

const TagRow = ({ tag, onRequestEdit, onRequestDelete }) => {
  return (
    <TableRow>
      <TableCell>
        <Text fontSize="md" color="gray.500">
          {tag.name}
        </Text>
      </TableCell>
      <TableCell bg={tag.num_clubs !== 0 ? "green.200" : "red.200"}>
        <Text textAlign="center" fontSize="md" color="gray.500">
          {tag.num_clubs}
        </Text>
      </TableCell>
      <TableCell textAlign="center">
        <Menu>
          <MenuButton as={Button} variant="ghost">
            <FontAwesomeIcon icon={faChevronDown} size="sm" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onRequestEdit}>
              <span>
                <FontAwesomeIcon icon={faEdit} size="sm" />
                {"  "}Edit
              </span>
            </MenuItem>
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
}

const AddTagModal = ({ ctrl, onAdd }) => (
  <AddEditModal
    title="Add Tag"
    ctrl={ctrl}
    onSave={onAdd}
    fields={{
      name: {
        name: 'Tag Name',
        value: ''
      }
    }}
  />
);

const EditTagModal = ({ tag = null, ctrl, onEdit }) => (
  tag &&
  <AddEditModal
    title="Edit Tag"
    ctrl={ctrl}
    onSave={onEdit}
    fields={{
      name: {
        name: 'Tag Name',
        value: tag.name
      }
    }}
  />
);

const DeleteTagModal = ({ tag = null, ctrl, onDelete }) => (
  tag &&
  <DeleteModal
    title="Delete Tag"
    ctrl={ctrl}
    onDelete={() => onDelete(tag)}
    fields={{
      'Tag Name': tag.name,
      '# of Clubs': tag.num_clubs,
    }}
  />
);

const TagListComponent = ({ tags, setTags }) => {
  const [search, dirtyView, searchView, onDataListChange] = useSearch({
    data: tags,
    mapper: tag => tag.name,
    searchDelay: SEARCH_DELAY,
    onListChange: async () => {
      const newTagList = await fetchTags();
      setTags(newTagList);
    }
  });

  const [pageNum, numPages, tagListView, nextPage, prevPage] = useSimplePaginator(searchView, NUM_TAGS_SHOWN);

  const addModalCtrl = useDisclosure();
  const editModalCtrl = useDisclosure();
  const deleteModalCtrl = useDisclosure();

  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <Flex align="center" justify="center">
      <Stack paddingTop="32px">
        <FirstRowHeader
          title="Tags"
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
              {icon: faDownload, onClick: downloadTags},
              {icon: faSync, onClick: () => onDataListChange(() => {})}
            ]}
            onStartDownload={downloadTags}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Tag name</TableHeader>
              <TableHeader># of clubs</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody opacity={dirtyView.get() ? 0.5 : 1}>
            <AddTagModal
              ctrl={addModalCtrl}
              onAdd={async (tag) => {
                await onDataListChange(() => addTag(tag));
                setSelectedTag(null);
              }}
            />

            <EditTagModal
              tag={selectedTag}
              ctrl={editModalCtrl}
              onEdit={async (newTag) => {
                await onDataListChange(() => editTag(selectedTag, newTag));
                setSelectedTag(null);
              }}
            />

            <DeleteTagModal
              tag={selectedTag}
              ctrl={deleteModalCtrl}
              onDelete={async (tag) => {
                await onDataListChange(() => deleteTag(tag));
                setSelectedTag(null);
              }}
            />

            {tagListView.map((tag, i) => (
              <TagRow
                key={i}
                tag={tag}
                onRequestEdit={() => {
                  setSelectedTag(tag);
                  editModalCtrl.onOpen();
                }}
                onRequestDelete={() => {
                  setSelectedTag(tag);
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

const TagsPage = () => {
  useTitle('Tags - sproul.club Dashboard');

  return (
    <DataLoaderPage promiseFn={fetchTags}>
      {(data, { setData }) => (
        <TagListComponent
          tags={data}
          setTags={setData}
        />
      )}
    </DataLoaderPage>
  );
};

export default TagsPage;
