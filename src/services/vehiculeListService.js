import { createClient, defaultExchanges } from '@urql/core';
import qql from 'graphql-tag';

const CLIENT_ID = process.env.REACT_APP_CHARGETRIP_CLIENT_ID;
const APP_ID = process.env.REACT_APP_CHARGETRIP_APP_ID;

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

export const vehicleListQuery = qql`
query vehicleList($page: Int, $size: Int, $search: String) {
  vehicleList(
    page: $page, 
    size: $size, 
    search: $search, 
  ) {
    id
    naming {
      make
      model
      chargetrip_version
    }
    media {
      image {
        thumbnail_url
      }
    }
    connectors {
      time
    }
    range {
      chargetrip_range {
        best
        worst
      }
    }
    battery {
      usable_kwh
      full_kwh
    }

  }
}
`;
