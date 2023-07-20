/* eslint-disable import/prefer-default-export */
import {
  TRACK_ITEMS_APPEND,
  TRACK_ITEMS_DELETE,
  TRACK_ITEMS_FETCH_AND_SET,
  TRACK_ITEMS_UPDATE,
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetTrackItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/track/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: TRACK_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };

export const updateTrackItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: TRACK_ITEMS_UPDATE,
    payload,
  });
};

export const appendTrackItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: TRACK_ITEMS_APPEND,
    payload,
  });
};

export const deleteTrackItems = (payload: any) => (dispatch: any) => {
  dispatch({
    type: TRACK_ITEMS_DELETE,
    payload,
  });
};
