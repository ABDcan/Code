// notificationModel.js

const mongoose = require('mongoose');

// Define the notification schema
const notificationSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // ID of the user receiving the notification
    message: { type: String, required: true }, // Notification message
    status: { type: String, default: 'unread' }, // Notification status (read/unread)
    timestamp: { type: Date, default: Date.now }, // Time of creation
});

// Create the Notification model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
