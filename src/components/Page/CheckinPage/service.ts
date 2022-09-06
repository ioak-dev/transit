/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const registerIn = (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string,
  code: number
) => {
  return httpPost(
    `/checkin/${space}/${eventId}/${participantId}/${trackId}/in?code=${code}`,
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
  return httpGet(`/checkin/${space}/${eventId}/${participantId}/track`, {
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

export const getCheckinByEventIdAndParticipantId = (
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

export const getParticipantList = (space: string, eventId: string) => {
  return httpGet(`/participant/${space}/event/${eventId}`, {
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

export const getParticipantById = (space: string, participantId: string) => {
  return httpGet(`/participant/${space}/${participantId}`, {
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

export const getParticipantByReferenceId = (
  space: string,
  eventId: string,
  participantReferenceId: string
) => {
  return httpGet(
    `/participant/${space}/event/${eventId}/reference/${participantReferenceId}`,
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

export const getEventById = (space: string, eventId: string) => {
  return httpGet(`/event/${space}/${eventId}`, {
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

export const getParticipantsByGroup = (space: string, group: string) => {
  return httpGet(`/participant/${space}/group/${group}`, {
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

export const getCheckinByParticipantId = (
  space: string,
  participantId: string
) => {
  return httpGet(`/participant/${space}/reference/${participantId}`, {
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
