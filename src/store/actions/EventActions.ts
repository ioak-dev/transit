/* eslint-disable import/prefer-default-export */
import {
  EVENT_ITEMS_APPEND,
  EVENT_ITEMS_DELETE,
  EVENT_ITEMS_FETCH_AND_SET,
  EVENT_ITEMS_UPDATE,
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetEventItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/event/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: EVENT_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };

export const updateEventItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: EVENT_ITEMS_UPDATE,
    payload,
  });
};

export const appendEventItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: EVENT_ITEMS_APPEND,
    payload,
  });
};

export const deleteEventItems = (payload: any) => (dispatch: any) => {
  dispatch({
    type: EVENT_ITEMS_DELETE,
    payload,
  });
};
