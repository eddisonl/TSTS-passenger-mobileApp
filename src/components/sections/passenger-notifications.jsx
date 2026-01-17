import { useState } from "react";
import { Bell, Clock, CheckCircle2, AlertCircle, Info, ChevronDown, ChevronUp } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    message: "Your booking for Accra Central to Tema Station has been confirmed. Your seat number is A12.",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
    details: "Bus departs at 11:00 AM. Please arrive 15 minutes early. Show this notification at the boarding gate."
  },
  {
    id: 2,
    type: "arrival",
    title: "Bus Arrived at Destination",
    message: "Your bus has arrived at Tema Station. Safe travels!",
    timestamp: "2024-01-15T11:45:00Z",
    read: false,
    details: "Thank you for choosing TSTS. We hope you had a comfortable journey. Please rate your experience."
  },
  {
    id: 3,
    type: "delay",
    title: "Bus Delayed",
    message: "Your bus from Kumasi Junction to Accra Central is delayed by 20 minutes.",
    timestamp: "2024-01-14T14:15:00Z",
    read: true,
    details: "New departure time: 3:20 PM. We apologize for the inconvenience."
  },
  {
    id: 4,
    type: "standing",
    title: "Standing Passenger Alert",
    message: "Passenger John Doe has arrived at their destination. Standing space now available.",
    timestamp: "2024-01-14T12:00:00Z",
    read: true,
    details: "A standing space has been freed up on your route. You can now upgrade to a seat if available."
  },
  {
    id: 5,
    type: "system",
    title: "New Feature Available",
    message: "Book in advance feature is now available! Plan your trips ahead of time.",
    timestamp: "2024-01-13T09:00:00Z",
    read: true,
    details: "You can now select your preferred arrival time when booking. This helps us optimize routes and reduce wait times."
  }
];

const getNotificationIcon = (type) => {
  switch (type) {
    case "booking":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "arrival":
      return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
    case "delay":
      return <Clock className="w-5 h-5 text-orange-500" />;
    case "standing":
      return <AlertCircle className="w-5 h-5 text-purple-500" />;
    case "system":
      return <Info className="w-5 h-5 text-gray-500" />;
    default:
      return <Bell className="w-5 h-5 text-pass-primary" />;
  }
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

export default function PassengerNotifications() {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-pass-foreground">Notifications</h1>
          <p className="text-pass-muted">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
          </p>
        </div>
        <Bell className="w-8 h-8 text-pass-primary" />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "all", label: "All" },
          { id: "unread", label: "Unread" },
          { id: "booking", label: "Bookings" },
          { id: "arrival", label: "Arrivals" },
          { id: "delay", label: "Delays" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              filter === tab.id
                ? "bg-pass-primary text-white"
                : "bg-pass-bg text-pass-muted hover:bg-pass-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-pass-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-pass-foreground mb-2">
              No notifications
            </h3>
            <p className="text-pass-muted">
              {filter === "unread" ? "All notifications read!" : "No notifications in this category."}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-pass-surface border border-pass-border rounded-2xl p-4 transition-all ${
                !notification.read ? "border-l-4 border-l-pass-primary" : ""
              }`}
            >
              {/* Notification Header */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className={`font-semibold text-pass-foreground ${
                        !notification.read ? "font-bold" : ""
                      }`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-pass-muted mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-pass-muted mt-2">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleExpanded(notification.id)}
                      className="flex-shrink-0 p-1 hover:bg-pass-bg rounded-lg transition-colors"
                    >
                      {expandedId === notification.id ? (
                        <ChevronUp className="w-4 h-4 text-pass-muted" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-pass-muted" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === notification.id && (
                    <div className="mt-3 pt-3 border-t border-pass-border">
                      <p className="text-sm text-pass-foreground">
                        {notification.details}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
