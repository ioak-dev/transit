/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const getFeedMessages = (space: string, eventId: string) => {
  return httpGet(`/message/${space}/event/${eventId}`, {
    headers: {},
  })
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error: any) => {
      return Promise.resolve({});
    });
};

export const sendFeed = (space: string, payload: any, authorization: any) => {
  return httpPut(`/message/${space}/admin`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};

export const sendNotification = (space: string, eventId: string, payload: any) => {
  return httpPost(`/event/${space}/${eventId}/notification`, payload, {
    headers: {},
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};
