const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");

const notificationRoutes = require("./route/notificationRoute");

console.log("notificationRoutes =", notificationRoutes);

const app = express();
app.use(logger);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend Running"
    });
});


app.use("/api/notifications", notificationRoutes);

module.exports = app;