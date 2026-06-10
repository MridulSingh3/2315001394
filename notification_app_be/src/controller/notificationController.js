const { Log } = require(
    "../../../logging_middleware/src"
);
const notifications = [
    {
        id: 1,
        type: "Placement",
        title: "Afford Medical Hiring Drive",
        isRead: false,
    },
    {
        id: 2,
        type: "Result",
        title: "Semester Result Published",
        isRead: true,
    },
    {
        id: 3,
        type: "Event",
        title: "Tech Fest 2026",
        isRead: false,
    },
];


const getNotifications = async (req, res) => {
    try {

        const { type } = req.query;

        let result = notifications;

        if (type) {
            result = notifications.filter(
                (item) => item.type === type
            );
        }

        try {
            await Log(
                "backend",
                "info",
                "controller",
                "Fetched notifications"
            );
        } catch (logError) {
            console.error(
                "Logging failed:",
                logError.message
            );
        }

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        try {
            await Log(
                "backend",
                "error",
                "controller",
                error.message
            );
        } catch (logError) {
            console.error(
                "Logging failed:",
                logError.message
            );
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getPriorityNotifications = async (req, res) => {
    const priorityMap = {
        Placement: 3,
        Result: 2,
        Event: 1
    };

    const sortedNotifications = [...notifications]
        .sort(
            (a, b) =>
                priorityMap[b.type] -
                priorityMap[a.type]
        );

    res.status(200).json({
        success: true,
        data: sortedNotifications
    });
};

const markAsRead = async (req, res) => {

    const id = Number(req.params.id);

    const notification =
        notifications.find(
            item => item.id === id
        );

    if (!notification) {

        await Log(
            "backend",
            "warn",
            "controller",
            `Notification ${id} not found`
        );

        return res.status(404).json({
            success: false
        });
    }

    notification.isRead = true;

    await Log(
        "backend",
        "info",
        "controller",
        `Notification ${id} marked as read`
    );

    res.status(200).json({
        success: true
    });
};

module.exports = {
    getNotifications,
    getPriorityNotifications,
    markAsRead,
};