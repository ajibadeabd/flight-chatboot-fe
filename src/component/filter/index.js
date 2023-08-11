import React, { useState } from 'react';

const Filter = ({
  destinationCity,
  setDestinationCity,
  setDepartureCity,
  departureCity,
  date,
  setDate 
}) => {
  const handleFilterClick = () => {
    // Apply filters based on destinationCity, departureCity, startDate, and endDate
  };

  return (
    <div className="flex flex-row py-4 w-1/2 px-9 bg-red-100">
      <div className="flex flex-col space-y-1 w-5/12 mx-5">
        <label htmlFor="destinationTimeFilter" className="text-sm font-medium">
          Filter by destination city
        </label>
        <input
          type="text"
          id="destinationCity"
          placeholder="Enter destination city..."
          value={destinationCity}
          onChange={(e) => setDestinationCity(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col space-y-1 w-1/2 mx-5">
        <label htmlFor="flightIdFilter" className="text-sm font-medium">
          Filter by departure city
        </label>
        <input
          type="text"
          id="departureCity"
          placeholder="Enter departureCity..."
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col space-y-1 w-1/2 mx-5">
        <label htmlFor="startDate" className="text-sm font-medium">
        Filter by  Date
        </label>
        <input
          type="date"
          id="startDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
  
    </div>
  );
};

export default Filter;
