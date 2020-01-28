import { isFSA } from 'flux-standard-action';
import { get } from 'lodash';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function isDeferred(val) {
  return val && val.promise && isPromise(val.promise);
}

// eslint-disable-next-line max-params
function handlePromise(actionPromise, action, dispatch, isAutoDispatchResult) {
  return isAutoDispatchResult
    ? actionPromise
      .then((result) => {
        dispatch({
          payload: result,
          type: `${action.type}__SUCCESS`,
          meta: action.meta,
        });
        return result;
      })
      .catch((error) => {
        dispatch({
          error: true,
          payload: error,
          type: `${action.type}__FAIL`,
          meta: action.meta,
        });
        return Promise.reject(error);
      })
    : actionPromise;
}

export default ({ dispatch }) => (next) => (action) => {
  if (!isFSA(action)) {
    return next(action);
  }

  next(action);

  const isAutoDispatchResult = get(action.meta, 'isAutoDispatchResult');

  if (isPromise(action.payload)) {
    return handlePromise(action.payload, action, dispatch, isAutoDispatchResult);
  }
  if (isDeferred(action.payload)) {
    return handlePromise(action.payload.promise, action, dispatch, isAutoDispatchResult);
  }

  return null;
};
