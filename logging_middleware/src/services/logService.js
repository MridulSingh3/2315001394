const axios = require("axios");

const getAccessToken =
    require("./authService");

const validateLog =
    require("../utils/validator");

const Log = async (
    stack,
    level,
    packageName,
    message
) => {
    validateLog(
        stack,
        level
    );

    try {
        const token =
            await getAccessToken();

        const response =
            await axios.post(
                "YOUR_LOG_API_URL",
                {
                    stack,
                    level,
                    package:
                        packageName,
                    message,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    } catch (error) {
        console.error(
            error.message
        );
    }
};

module.exports = Log;