import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const deepEqual = require('fast-deep-equal/es6/react');

function useSearch({ data, mapper = element => element, searchDelay = 0, onListChange = null }) {
  const [query, setQuery] = useState('');
  const [dirtyView, setDirtyView] = useState(false);
  const [searchView, setSearchView] = useState([]);

  function searchFilter(element) {
    if (!element)
      return false;

    let result = mapper(element).toLowerCase();
    let search = query.toLowerCase();
    return result.includes(search);
  }

  const debouncedSearch = useDebouncedCallback(query => {
    setDirtyView(true);
    setQuery(query);
    setDirtyView(false);
  }, searchDelay);

  async function duringListUpdate(func) {
    setDirtyView(true);
    await func();
    await onListChange();
    setDirtyView(false);
  }

  useEffect(() => {
    let filteredView = query ? data.filter(searchFilter) : data;
    setSearchView(filteredView);
  }, [data, query]);

  return [
    {
      get: () => query,
      set: debouncedSearch.callback
    },
    {
      get: () => dirtyView,
      set: setDirtyView
    },
    searchView,
    !!onListChange ? duringListUpdate : null
  ];
}

function useSimplePaginator(data, itemsPerPage, preview) {
  const [pageNum, setPageNum] = useState(1);
  const [pageView, setPageView] = useState([]);

  const numPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    let pageIndex = (pageNum - 1) * itemsPerPage;
    setPageView(data.slice(pageIndex, pageIndex + itemsPerPage));
  }, [data, pageNum, itemsPerPage]);

  const nextPage = () => pageNum < numPages && setPageNum(pageNum + 1);
  const prevPage = () => pageNum > 1 && setPageNum(pageNum - 1);

  return [pageNum, numPages, pageView, nextPage, prevPage];
}

function useDiffCheck(orig) {
  const [original,] = useState(orig);
  const [copy, setCopy] = useState(orig);
  const [isSame, setSame] = useState(true);

  useEffect(() => {
    setSame(deepEqual(original, copy));
  }, [copy]);

  return [copy, setCopy, isSame];
}

export { useDiffCheck, useSearch, useSimplePaginator };