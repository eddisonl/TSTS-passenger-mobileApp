import { LogOut, MapPin, Wallet, Home } from "lucide-react";

export default function PassengerHeader({ passenger, onLogout, activeView }) {
  const titles = {
    search: "Find Your Ride",
    booking: "Book Your Ticket",
    active: "My Booking",
    wallet: "My Wallet",
  };

  return (
    <div className="bg-pass-surface border-b border-pass-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-4">
        {/* Header Top */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-pass-foreground">
              TSTS Rider
            </h1>
            <p className="text-xs text-pass-muted">
              {titles[activeView] ?? "Smart Transport for Ghana"}
            </p>
            <p className="text-xs text-pass-muted">
              Hi, {passenger?.name?.split(" ")[0]}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-pass-bg rounded-lg transition-colors text-pass-muted hover:text-pass-foreground"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div className="bg-pass-bg rounded-lg p-2 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-pass-primary" />
            <div>
              <p className="text-pass-muted text-xs">Balance</p>
              <p className="font-semibold text-pass-foreground">
                GHS {passenger?.wallet?.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="bg-pass-bg rounded-lg p-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-pass-accent" />
            <div>
              <p className="text-pass-muted text-xs">Trips</p>
              <p className="font-semibold text-pass-foreground">24</p>
            </div>
          </div>
          <div className="hidden md:flex bg-pass-bg rounded-lg p-2 items-center gap-2">
            <span className="text-lg">⭐</span>
            <div>
              <p className="text-pass-muted text-xs">Rating</p>
              <p className="font-semibold text-pass-foreground">4.9</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
