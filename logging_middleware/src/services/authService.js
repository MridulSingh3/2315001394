const axios = require("axios");

let accessToken = null;

const getAccessToken =
    async () => {
        if (accessToken)
            return accessToken;

        try {
            const response =
                await axios.post(
                    "YOUR_AUTH_API_URL",
                    {
                        clientID:
                            "YOUR_CLIENT_ID",
                        clientSecret:
                            "YOUR_CLIENT_SECRET"
                    }
                );

            accessToken =
                response.data
                    .access_token;

            return accessToken;
        } catch (error) {
            console.error(
                error.message
            );

            throw error;
        }
    };

module.exports = getAccessToken;