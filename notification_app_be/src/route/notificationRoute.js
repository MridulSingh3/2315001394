const express = require("express");

const {
    getNotifications,
    getPriorityNotifications,
    markAsRead
} = require("../controller/notificationController");

const router = express.Router();

router.get("/", getNotifications);
router.get("/priority", getPriorityNotifications);
router.patch("/:id/read", markAsRead);

module.exports = router;