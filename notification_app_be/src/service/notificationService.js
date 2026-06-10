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

const getAllNotifications = () => {
    return notifications;
};

module.exports = {
    getAllNotifications,
};