/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const registerIn = (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string
) => {
  return httpPost(
    `/checkin/${space}/${eventId}/${participantId}/${trackId}/in`,
    {},
    {
      headers: {},
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};

export const registerOut = (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string
) => {
  return httpPost(
    `/checkin/${space}/${eventId}/${participantId}/${trackId}/out`,
    {},
    {
      headers: {},
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};

export const getAvailableTracks = (
  space: string,
  eventId: string,
  participantId: string
) => {
  return httpGet(`/checkin/${space}/${eventId}/${participantId}`, {
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
