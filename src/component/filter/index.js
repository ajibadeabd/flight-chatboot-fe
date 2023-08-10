import React, { useState } from 'react';

const Filter = () => {
  const [destinationTimeFilter, setDestinationTimeFilter] = useState('');
  const [flightIdFilter, setFlightIdFilter] = useState('');

  return (
    //space-y-4
    <div className="flex flex-row  py-4 w-1/2 px-9 bg-red-100">
      <div className="flex flex-col space-y-1 w-5/12 mx-5 ">
        <label htmlFor="destinationTimeFilter" className="text-sm font-medium">
          Filter by Destination Time
        </label>
        <input
          type="text"
          id="destinationTimeFilter"
          placeholder="Enter destination time..."
          value={destinationTimeFilter}
          onChange={e => setDestinationTimeFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>


      <div className="flex flex-col space-y-1 w-1/2 mx-5 ">
        <label htmlFor="flightIdFilter" className="text-sm font-medium">
          Filter by Flight ID
        </label>
        <input
          type="text"
          id="flightIdFilter"
          placeholder="Enter flight ID..."
          value={flightIdFilter}
          onChange={e => setFlightIdFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={() => {
          // Apply filters
        }}
        className="bg-blue-500 text-white p-0.5 rounded"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
