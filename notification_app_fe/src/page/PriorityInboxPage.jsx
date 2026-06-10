import { useEffect, useState } from "react";
import { getPriorityNotifications } from "../api/notificationApi";

function PriorityInboxPage() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response =
                await getPriorityNotifications();

            setNotifications(response.data.data);
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Priority Inbox</h1>

            {notifications.map((item) => (
                <div
                    className="card"
                    key={item.id}
                >
                    <h3>{item.title}</h3>

                    <p>{item.type}</p>
                </div>
            ))}
        </div>
    );
}

export default PriorityInboxPage;