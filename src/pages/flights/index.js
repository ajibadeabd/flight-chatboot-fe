import React, { useEffect, useState } from 'react';
import { flightData, bookFlight, getPaymentLink } from '../../api';
import FilterComponent from '../../component/filter';
import { useSearchParams } from 'react-router-dom';
 
const actionButtons = [
  { type: "submit", name: "Book", className: "px-4 py-2 bg-blue-500 text-white rounded" },
  { type: "button", name: "Cancel", className: "ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded" }
];

function Flight() {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const formFields = [
    { type: "text", name: "Name",onChange:handleNameChange  },
    { type: "email", name: "Email" ,onChange:handleEmailChange}
  ];
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const requestBody = {
      flight_id: selectedFlight.flight_number,
      passenger_name: name,
      email,
    };

    setName("");
    setEmail("");

    const { data: { data: { booking_id } } } = await bookFlight(requestBody);
    let { data } = await getPaymentLink(booking_id);
    let paymentLink = data.data;
    console.log(paymentLink);

    const popupWindow = window.open(
      paymentLink + "?callback_url=http://localhost:3000/flight",
      'Payment',
      'width=400,height=400,resizable=yes'
    );

    if (!popupWindow) {
      alert('Popup blocked or failed to open.');
    }

    closeModal();
  };

  useEffect(() => {
    flightData().then((res) => {
      setFlights(res?.data.data);
    });
  }, []);

  useEffect(() => {
    const queryObject = Object.fromEntries(searchParams.entries());
    console.log(queryObject);
    // self.close();
  }, [searchParams]);

  return (
    <div className="min-h-screen pt-10 bg-gray-100 flex flex-col justify-center items-center">
      <FilterComponent />

      <div className="w-full md:w-2/3 lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Flight Information</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {[
                "#", "Date", "Departure", "Departure Airport",
                "Arrival", "Arrival Airport", "Airline", "Flight Number"
              ].map((eachData, key) => (
                <th key={key} className="border p-2">{eachData}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flights?.map((flight, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="border p-2">{index + 1}</td>
                {[
                  "flight_date", "scheduled_departure", "departure_airport",
                  "scheduled_arrival", "arrival_airport", "airline_name", "flight_number"
                ].map((eachData, key) => (
                  <td key={key} className="border p-2">{flight[eachData]}</td>
                ))}
                <td className="border p-2">
                  <button
                    onClick={() => {
                      setSelectedFlight(flight);
                      openModal();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Book Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-100 w-4/12 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Book Flight - {selectedFlight.flight_number}</h2>
            <form onSubmit={handleSubmit}>
              {formFields.map((data, key) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm font-medium">{data.name}</label>
                  <input
                    type={data.type}
                    value={data.value}
                    onChange={data.onChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              ))}

              {actionButtons.map((data, key) => (
                <button
                  key={key}
                  type={data.type}
                  onClick={() => {
                    data.onClick && data?.onClick();
                  }}
                  className={data.className}
                >
                  {data.name}
                </button>
              ))}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Flight;
