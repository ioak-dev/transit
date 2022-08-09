/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../../../../Lib/RestTemplate';

export const getGroupFeedMessages = (space: string, eventId: string, group: string) => {
  return httpGet(`/groupmessage/${space}/event/${eventId}/group/${group}`, {
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

export const sendGroupFeedAsUser = (space: string, payload: any) => {
  return httpPut(`/groupmessage/${space}`, payload, {
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

export const sendGroupFeedAsAdmin = (space: string, payload: any) => {
  return httpPut(`/groupmessage/${space}/admin`, payload, {
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
