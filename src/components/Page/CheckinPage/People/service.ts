/* eslint-disable import/prefer-default-export */
import { httpPost, httpPut } from '../../../Lib/RestTemplate';

export const updateParticipantDeclaration = (
  space: string,
  participantId: any,
  room: any
) => {
  return httpPost(`/participant/${space}/room/${participantId}/${room}`, '', {
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
