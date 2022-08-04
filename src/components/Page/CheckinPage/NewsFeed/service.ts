/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../../../Lib/RestTemplate';

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
