import qql from 'graphql-tag';
import { createClient, defaultExchanges } from '@urql/core';

const CLIENT_ID = process.env.CHARGETRIP_CLIENT_ID;
const APP_ID = process.env.CHARGETRIP_APP_ID;

export const headers = {
  'x-client-id': CLIENT_ID,
  'x-app-id': APP_ID
};

export const client = createClient({
  url: 'https://api.chargetrip.io/graphql',
  fetchOptions: {
    method: 'POST',
    headers,
  },
  exchanges: [...defaultExchanges],
});

export const chargingStationQuery = qql`
    query stationAround ($lat: Float!, $lng: Float!) {
        stationAround(
            filter: {
                location: { 
                    type: Point,
                    coordinates: [$lng, $lat]
                }
                distance: 10000
            }
            size: 10
            page: 0
        ) {
            location {
                type
                coordinates
            }
            power
            speed
            status
            }
        }
    `;
