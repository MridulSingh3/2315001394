# Notification System Design

## Stage 1 - API Design

The system provides APIs to fetch notifications, view priority notifications, filter notifications by type, and mark notifications as read.

Implemented APIs:

* GET /api/notifications
* GET /api/notifications/priority
* GET /api/notifications?type=Placement
* PATCH /api/notifications/:id/read

The API responses are returned in JSON format and contain status information along with notification data.

---

## Stage 2 - Database Design

If this application is connected to a database, I would use a Notifications table with the following fields:

| Field     | Type    |
| --------- | ------- |
| id        | Number  |
| title     | String  |
| type      | String  |
| isRead    | Boolean |
| createdAt | Date    |

The type field can contain values such as Placement, Result, Event, etc.

---

## Stage 3 - Query Optimization

To improve performance, indexes can be created on frequently filtered fields such as:

* type
* createdAt

This will make filtering and sorting operations faster when the number of notifications increases.

---

## Stage 4 - Performance Improvements

For a larger system, the following improvements can be added:

* Pagination for notification lists
* Response caching
* Database indexing
* Background processing for bulk notifications

These changes help reduce server load and improve response times.

---

## Stage 5 - Notify All Students

If notifications need to be sent to all students, I would use a queue-based approach.

Steps:

1. Create notification entry.
2. Push notification jobs into a queue.
3. Worker processes send notifications in batches.
4. Failed deliveries can be retried later.

This approach prevents server overload when the number of users is very large.

---

## Stage 6 - Priority Inbox

Priority notifications are displayed before normal notifications.

Current priority order:

1. Placement
2. Result
3. Event

The backend sorts notifications based on priority before sending them to the client.

This allows important notifications to appear at the top of the inbox.
