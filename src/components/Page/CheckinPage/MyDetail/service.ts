/* eslint-disable import/prefer-default-export */
import { httpPost, httpPut } from '../../../Lib/RestTemplate';

export const updateParticipantDeclaration = (
  space: string,
  eventId: any,
  participantId: any,
  declaration: 'first' | 'second',
  value: 'Y' | 'N'
) => {
  return httpPost(
    `/participant/${space}/declaration/${eventId}/${participantId}/${declaration}/${value}`,
    '',
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
