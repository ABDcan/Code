const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for notifications
let notifications = [];

// Send Notification API
app.post('/api/notifications/send', (req, res) => {
    const { target, userId, message, source, timestamp } = req.body;

    // Create a new notification object
    const notification = {
        id: `notif_${Date.now()}`, // Unique ID
        userId: target === 'specific' ? userId : null, // Associate user ID if specific
        message,
        status: 'unread',
        timestamp
    };

    // Store the notification
    notifications.push(notification);

    // Send response
    res.json({
        success: true,
        message: target === 'specific' ? "Notification sent to specific user." : "Notification sent to all users."
    });
});

// Fetch Notifications API
app.get('/api/notifications/:userId', (req, res) => {
    const userId = req.params.userId;

    // Filter notifications for the specific user
    const userNotifications = notifications.filter(notif => notif.userId === userId);

    // Send the response
    res.json(userNotifications);
});

// Mark Notifications as Read API
app.post('/api/notifications/read', (req, res) => {
    const { userId, notificationIds } = req.body;

    // Mark notifications as read
    notifications.forEach(notif => {
        if (notif.userId === userId && notificationIds.includes(notif.id)) {
            notif.status = 'read';
        }
    });

    res.json({ success: true, message: 'Notifications marked as read.' });
});

// Start server
app.listen(port, () => {
    console.log(`Notification service running at http://localhost:${port}`);
});
