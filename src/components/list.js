import React from "react";
import { useEffect, useState } from "react";
import { createClient, defaultExchanges } from '@urql/core';
import { vehicleListQuery } from '../services/vehiculeListService';

const headers = {
  'x-client-id': '6402f92d85c5c3f0221ae397',
  'x-app-id': '6402f92d85c5c3f0221ae399'
};

const client = createClient({
  url: 'https://api.chargetrip.io/graphql',
  fetchOptions: {
    method: 'POST',
    headers,
  },
  exchanges: [...defaultExchanges],
});


function List() {
  var [data, setData] = React.useState(null);

  useEffect(() => {
  client.query(vehicleListQuery, { page: 10, size: 10, search: "" }).toPromise().then((result) => {
    console.log(result.data);
    setData(result.data);
  });
  }, []);

    return (
        <div>
        <h1>My First React App!</h1>
        {data && data.vehicleList.map((item) => (
          <div>
            <h2>{item.naming.make}</h2>
            <h2>{item.naming.model}</h2>
            <h2>{item.naming.chargetrip_version}</h2>
            <img src={item.media.image.thumbnail_url} />
          </div>
        ))}
        </div>
    );
}

export default List;