import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});

export const flightData = async ({
    limit = 10,
    departureCity,
    destinationCity,
    date
} = {}) => {
    console.log({date})
    try {
        let url = `api/flights?limit=${limit}`;

        if (destinationCity !== "") {
            url = `${url}&destination_city=${destinationCity}`;
        }

        if (departureCity) {
            url = `${url}&departure_city=${departureCity}`;
        }
        if (date) {
            url = `${url}&date=${date}`;
        }

        const response = await instance.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching flight data:", error);
        throw error; // Rethrow the error for higher-level error handling
    }
};

export const bookFlight = async (data) => {
    try {
        const response = await instance.post("api/booking", data);
        return response.data;
    } catch (error) {
        console.error("Error booking flight:", error);
        throw error; // Rethrow the error for higher-level error handling
    }
};

export const getPaymentLink = async (id) => {
    try {
        const response = await instance.get("api/initialize_payment/" + id);
        return response.data;
    } catch (error) {
        console.error("Error getting payment link:", error);
        throw error; // Rethrow the error for higher-level error handling
    }
};
