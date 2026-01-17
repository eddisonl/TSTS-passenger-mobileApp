import { useState } from "react";
import PassengerHeader from "../layout/passenger-header";
import RouteDiscovery from "../sections/route-discovery";
import BookingDetails from "../sections/booking-details";
import ActiveBooking from "../sections/active-booking";
import WalletInfo from "../sections/wallet-info";
import PassengerSettings from "../sections/passenger-settings";
import PassengerNotifications from "../sections/passenger-notifications";

export default function PassengerHome({ passenger, onLogout }) {
  const [activeView, setActiveView] = useState("search");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);

  const handleBookRoute = (route) => {
    setSelectedRoute(route);
    setActiveView("booking");
  };

  const handleConfirmBooking = (bookingData) => {
    setActiveBooking(bookingData);
    setActiveView("active");
  };

  const handleCancelBooking = () => {
    setActiveBooking(null);
    setActiveView("search");
  };

  const renderView = () => {
    switch (activeView) {
      case "search":
        return <RouteDiscovery onBookRoute={handleBookRoute} />;
      case "booking":
        return (
          <BookingDetails
            route={selectedRoute}
            passenger={passenger}
            onConfirm={handleConfirmBooking}
          />
        );
      case "active":
        return (
          <ActiveBooking
            booking={activeBooking}
            onCancel={handleCancelBooking}
          />
        );
      case "wallet":
        return <WalletInfo passenger={passenger} />;
      case "settings":
        return <PassengerSettings passenger={passenger} onLogout={onLogout} />;
      case "notifications":
        return <PassengerNotifications />;
      default:
        return <RouteDiscovery onBookRoute={handleBookRoute} />;
    }
  };

  return (
    <div className="min-h-screen bg-pass-bg flex flex-col">
      <PassengerHeader
        passenger={passenger}
        onLogout={onLogout}
        activeView={activeView}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-2xl mx-auto p-4 md:p-6">{renderView()}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-pass-surface border-t border-pass-border flex items-center justify-around px-2 py-2">
        {[
          { id: "search", label: "Find Ride", icon: "🔍" },
          { id: "active", label: "My Bookings", icon: "📋" },
          { id: "wallet", label: "Wallet", icon: "💳" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all ${
              activeView === item.id
                ? "bg-pass-primary text-white"
                : "text-pass-muted hover:text-pass-foreground"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
