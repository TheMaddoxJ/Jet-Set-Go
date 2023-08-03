// TOP LOCATIONS (Destinations)
import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_TOP_LOCATIONS = gql`
  query GetTopLocations {
    topLocations {
      _id
      name
      description
      country
      imageUrl
    }
  }
`;

const TopLocations = () => {
  const { loading, error, data } = useQuery(GET_TOP_LOCATIONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Top Destinations to Travel</h2>
      {data.topLocations.map((location) => (
        <div key={location._id}>
          <h3>{location.name}</h3>
          <p>{location.description}</p>
          <p>Country: {location.country}</p>
          <img src={location.imageUrl} alt={location.name} />
        </div>
      ))}
    </div>
  );
};

export default TopLocations;
