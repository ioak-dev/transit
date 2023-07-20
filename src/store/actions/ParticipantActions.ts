/* eslint-disable import/prefer-default-export */
import {
  PARTICIPANT_ITEMS_APPEND,
  PARTICIPANT_ITEMS_DELETE,
  PARTICIPANT_ITEMS_FETCH_AND_SET,
  PARTICIPANT_ITEMS_UPDATE,
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetParticipantItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/participant/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: PARTICIPANT_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };

export const updateParticipantItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: PARTICIPANT_ITEMS_UPDATE,
    payload,
  });
};

export const appendParticipantItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: PARTICIPANT_ITEMS_APPEND,
    payload,
  });
};

export const deleteParticipantItems = (payload: any) => (dispatch: any) => {
  dispatch({
    type: PARTICIPANT_ITEMS_DELETE,
    payload,
  });
};
