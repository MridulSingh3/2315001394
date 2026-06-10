import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getNotifications,
    markNotificationAsRead,
} from "../api/notificationApi";

function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async (type = "") => {
        const response =
            await getNotifications(type);

        setNotifications(
            response.data.data
        );
    };

    const handleMarkAsRead = async (id) => {
        try {
            await markNotificationAsRead(id);

            setNotifications((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            isRead: true,
                        }
                        : item
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "Placement":
                return "#1976d2";
            case "Result":
                return "#2e7d32";
            case "Event":
                return "#ed6c02";
            default:
                return "#555";
        }
    };

    return (
        <div className="container">
            <div className="navbar">
                <Link to="/" className="nav-btn">
                    All Notifications
                </Link>

                <Link to="/priority" className="nav-btn">
                    Priority Inbox
                </Link>
            </div>

            <h1>All Notifications</h1>

            <select
                onChange={(e) =>
                    fetchNotifications(
                        e.target.value
                    )
                }
            >
                <option value="">
                    All
                </option>

                <option value="Placement">
                    Placement
                </option>

                <option value="Result">
                    Result
                </option>

                <option value="Event">
                    Event
                </option>
            </select>

            {notifications.map((notification) => (
                <div
                    className="card"
                    key={notification.id}
                >
                    <h3>{notification.title}</h3>

                    <p
                        style={{
                            color: getTypeColor(
                                notification.type
                            ),
                            fontWeight: "bold",
                        }}
                    >
                        {notification.type}
                    </p>

                    <span
                        className={
                            notification.isRead
                                ? "read"
                                : "unread"
                        }
                    >
                        {notification.isRead
                            ? "Read"
                            : "Unread"}
                    </span>

                    {!notification.isRead && (
                        <div
                            style={{
                                marginTop: "10px",
                            }}
                        >
                            <button
                                onClick={() =>
                                    handleMarkAsRead(
                                        notification.id
                                    )
                                }
                            >
                                Mark as Read
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default NotificationsPage;