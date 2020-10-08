// This function yields a generator that allows pre-emptive returning of results
// Source: https://stackoverflow.com/a/56168992

function *filterGen(array, condition, limit = 0) {
  if (!limit || limit > array.length)
    limit = array.length;

  let count = 0;
  let i = 0;

  for (let i = 0; count < limit && i < array.length; i++) {
    if (condition(array[i])) {
      yield array[i];
      count++;
    }
  }
}

export { filterGen };