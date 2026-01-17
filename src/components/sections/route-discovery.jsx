import { useState } from "react";
import {
  MapPin,
  ArrowRightLeft,
  Search,
  MapPinIcon,
  Clock,
  Users,
} from "lucide-react";

const popularRoutes = [
  {
    id: 1,
    from: "Accra Central",
    to: "Tema Station",
    distance: "23 km",
    time: "45 min",
    price: 15.5,
    available: 12,
    capacity: 48,
  },
  {
    id: 2,
    from: "Accra Central",
    to: "Kumasi Junction",
    distance: "257 km",
    time: "4 hrs",
    price: 45.0,
    available: 8,
    capacity: 48,
  },
  {
    id: 3,
    from: "Tema Station",
    to: "Takoradi Port",
    distance: "138 km",
    time: "2.5 hrs",
    price: 28.0,
    available: 15,
    capacity: 48,
  },
  {
    id: 4,
    from: "Kumasi Junction",
    to: "Accra Central",
    distance: "257 km",
    time: "4 hrs",
    price: 45.0,
    available: 5,
    capacity: 48,
  },
];

export default function RouteDiscovery({ onBookRoute }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchResults, setSearchResults] = useState(popularRoutes);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = popularRoutes.filter(
      (route) =>
        route.from.toLowerCase().includes(from.toLowerCase()) &&
        route.to.toLowerCase().includes(to.toLowerCase())
    );
    setSearchResults(filtered.length > 0 ? filtered : popularRoutes);
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="space-y-6">
      {/* Search Card */}
      <form
        onSubmit={handleSearch}
        className="bg-pass-surface border border-pass-border rounded-2xl p-4 space-y-3 shadow-lg"
      >
        <h2 className="text-lg font-bold text-pass-foreground md:hidden">
          Book a Ride
        </h2>

        <div className="space-y-3">
          {/* From */}
          <div className="relative">
            <label className="block text-xs font-semibold text-pass-foreground mb-1">
              From
            </label>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pass-primary absolute left-3" />
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Enter departure"
                className="flex-1 pl-9 pr-4 py-3 bg-pass-bg border border-pass-border rounded-lg text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={swapLocations}
            className="w-full py-2 flex items-center justify-center hover:bg-pass-bg rounded-lg transition-colors text-pass-primary"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>

          {/* To */}
          <div className="relative">
            <label className="block text-xs font-semibold text-pass-foreground mb-1">
              To
            </label>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-pass-accent absolute left-3" />
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Enter destination"
                className="flex-1 pl-9 pr-4 py-3 bg-pass-bg border border-pass-border rounded-lg text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Book in Advance */}
        <div className="relative">
          <label className="block text-xs font-semibold text-pass-foreground mb-1">
            Book in Advance (Optional)
          </label>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-pass-primary absolute left-3" />
            <input
              type="datetime-local"
              className="flex-1 pl-9 pr-4 py-3 bg-pass-bg border border-pass-border rounded-lg text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pass-primary to-pass-accent hover:shadow-lg text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Request Now
        </button>
      </form>

      {/* Routes List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-pass-foreground flex items-center gap-2">
          <span>Available Routes</span>
          <span className="text-xs bg-pass-primary/20 text-pass-primary px-2 py-1 rounded-full">
            {searchResults.length}
          </span>
        </h3>

        {searchResults.length === 0 ? (
          <div className="text-center py-8 text-pass-muted">
            <p className="text-sm">No routes found. Try different locations.</p>
          </div>
        ) : (
          searchResults.map((route) => (
            <button
              key={route.id}
              onClick={() => onBookRoute(route)}
              className="w-full bg-pass-surface border border-pass-border rounded-xl p-4 text-left hover:border-pass-primary hover:shadow-lg transition-all group"
            >
              {/* Route Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-pass-foreground text-sm group-hover:text-pass-primary transition-colors">
                    {route.from}
                  </p>
                  <p className="text-xs text-pass-muted">To {route.to}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-pass-primary text-lg">
                    GHS {route.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-pass-muted">per seat</p>
                </div>
              </div>

              {/* Route Details */}
              <div className="flex items-center gap-4 mb-3 pb-3 border-b border-pass-border">
                <div className="flex items-center gap-1 text-xs text-pass-muted">
                  <Clock className="w-3 h-3" />
                  {route.time}
                </div>
                <div className="flex items-center gap-1 text-xs text-pass-muted">
                  <MapPin className="w-3 h-3" />
                  {route.distance}
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Users className="w-3 h-3 text-pass-primary" />
                  <span className="text-pass-primary font-semibold">
                    {route.available}
                  </span>
                  <span className="text-pass-muted">seats</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-pass-bg rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pass-primary to-pass-accent"
                    style={{
                      width: `${(route.available / route.capacity) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-pass-muted">
                  {route.capacity - route.available} booked
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
