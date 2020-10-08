import React from 'react';

import { Async } from 'react-async';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

const DataLoaderPage = ({ promiseFn, children }) => {
  return (
    <Async promiseFn={promiseFn}>
      <Async.Loading>
        <LoadingPage hasNavbar />
      </Async.Loading>
      <Async.Fulfilled>
        {(data, { setData, reload }) => children(data, { setData, reload})}
      </Async.Fulfilled>
      <Async.Rejected>
        {error => (
          <ErrorPage
            errorCode={error.code}
            errorMsg={error.message}
          />
        )}
      </Async.Rejected>
    </Async>
  )
};

export default DataLoaderPage;