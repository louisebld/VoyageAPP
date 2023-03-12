import { createClient, defaultExchanges } from '@urql/core';
import qql from 'graphql-tag';

export const headers = {
  'x-client-id': '6402f92d85c5c3f0221ae397',
  'x-app-id': '6402f92d85c5c3f0221ae399'
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
