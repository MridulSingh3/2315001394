import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});
export const getNotifications = (type = "") =>
    API.get(
        type
            ? `/notifications?type=${type}`
            : "/notifications"
    );
export const getPriorityNotifications = () =>
    API.get("/notifications/priority");

export const markNotificationAsRead = (id) =>
    API.patch(`/notifications/${id}/read`);