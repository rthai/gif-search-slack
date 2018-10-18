// old -> new
export function sortAscending(a, b) {
  a = a.upload;
  b = b.upload;

  if (a > b) {
    return 1;
  } else if (a === b) {
    return 0;
  } else {
    return -1;
  }
}

// new -> old
export function sortDescending(a, b) {
  a = a.upload;
  b = b.upload;

  if (a < b) {
    return 1;
  } else if (a === b) {
    return 0;
  } else {
    return -1;
  }
}

export default {sortAscending, sortDescending};