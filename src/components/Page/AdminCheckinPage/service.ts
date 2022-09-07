/* eslint-disable import/prefer-default-export */
import { httpPost, httpGet, httpDelete } from '../../Lib/RestTemplate';

export const getTracks = (space: string, eventId: string) => {
  return httpGet(`/track/${space}/event/${eventId}`, {
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

export const getTrackById = (space: string, trackId: string) => {
  return httpGet(`/track/${space}/${trackId}`, {
    headers: {},
  })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};

export const getCheckin = (space: string, eventId: string, trackId: string) => {
  return httpGet(`/checkin/${space}/event/${eventId}/track/${trackId}`, {
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

export const getAllCheckin = (space: string, eventId: string) => {
  return httpGet(`/checkin/${space}/event/${eventId}`, {
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

export const deleteCheckin = (space: string, id: string) => {
  return httpDelete(`/checkin/${space}/${id}`, {
    headers: {},
  })
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};

export const registerInAdmin = (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string
) => {
  return httpPost(
    `/checkin/${space}/${eventId}/${participantId}/${trackId}/in/admin`,
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

export const registerOutAdmin = (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string
) => {
  return httpPost(
    `/checkin/${space}/${eventId}/${participantId}/${trackId}/out/admin`,
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
