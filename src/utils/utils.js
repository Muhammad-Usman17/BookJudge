// libs
import isEqual from 'lodash/isEqual';
import some from 'lodash/some';
import fromPairs from 'lodash/fromPairs';

/**
 *
 * @param {string | Array<string>} key
 * @param {Object} thisProps
 * @param {Object} nextProps
 */
export const hasPropChanged = (
  key: string | Array<string>,
  thisProps: Object,
  nextProps: Object
): boolean => {
  if (typeof key === 'string') {
    return !isEqual(thisProps[key], nextProps[key]);
  }

  return some(key, value => !isEqual(thisProps[value], nextProps[value]));
};

/**
 * Converts a query string into a map
  @param {} query
 */
export const parseQueryString = (query: string): Object =>
  fromPairs(query.substring(1).split('&').map(s => s.split('=').map(decodeURIComponent)));
