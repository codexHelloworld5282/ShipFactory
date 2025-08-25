const axios = require("axios");
const axiosRetry = require("axios-retry").default; // <-- note the .default without calling it

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    shouldResetTimeout: true,
});

const logResponse = (method, response) => {
    console.log(`\n=== BlueEx ${method} response:`, response.data, "===\n");
};

const handleError = (method, error) => {
    console.error(`[BlueEx ${method}] Error:`, error.message);
    return error;
};

const  BlueExAPI = {
    post: async (endpoint, payload, auth) => {
        try {
            const res = await axios.post(endpoint, payload, { auth });
            logResponse("POST", res);
            return res.data;
        } catch (err) {
            return handleError("POST", err);
        }
    },
};

module.exports = BlueExAPI;
