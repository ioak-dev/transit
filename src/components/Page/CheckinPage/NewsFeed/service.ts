/* eslint-disable import/prefer-default-export */

import { httpGet, httpPut } from "../../../Lib/RestTemplate";

export const sendFeed = (space: string, payload: any, authorization: any) => {
    return httpPut(`/message/${space}`, payload, {
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

export const getFeedsBySpace = (
    space: string, authorization: any,
    eventId: string
) => {
    return httpGet(`/message/${space}/event/${eventId}`, {
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


