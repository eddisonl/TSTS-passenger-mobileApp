import { useState } from "react";
import { MapPin, User, CheckCircle2, Footprints, Plus, Minus } from "lucide-react";

export default function BookingDetails({ route, passenger, onConfirm }) {
  const [bookingType, setBookingType] = useState("seats"); // "seats" or "standing"
  const [numPassengers, setNumPassengers] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate available spaces
  const availableSeats = route.available;
  const availableStanding = route.capacity - route.available; // Assuming standing spaces equal to capacity
  const totalPrice = numPassengers * route.price;

  // Auto-assign seats or standing spaces
  const assignedSpaces = bookingType === "seats"
    ? Array.from({ length: numPassengers }, (_, i) => `Seat ${(route.capacity - route.available) + i + 1}`)
    : Array.from({ length: numPassengers }, (_, i) => `Standing ${i + 1}`);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      onConfirm({
        id: `BK-${Date.now()}`,
        route,
        passenger,
        bookingType,
        numPassengers,
        assignedSpaces,
        totalPrice,
        paymentMethod,
        qrCode: `QR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        status: "confirmed",
        bookingTime: new Date(),
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handleBookingTypeChange = (type) => {
    setBookingType(type);
    // Adjust passenger count if exceeds available spaces
    const maxAvailable = type === "seats" ? availableSeats : availableStanding;
    if (numPassengers > maxAvailable) {
      setNumPassengers(maxAvailable);
    }
  };

  const adjustPassengers = (delta) => {
    const maxAvailable = bookingType === "seats" ? availableSeats : availableStanding;
    const newCount = Math.max(1, Math.min(maxAvailable, numPassengers + delta));
    setNumPassengers(newCount);
  };

  return (
    <div className="space-y-6">
      <div className="bg-pass-surface border border-pass-border rounded-2xl p-4 space-y-4">
        {/* Route Summary */}
        <div className="pb-4 border-b border-pass-border">
          <h2 className="font-bold text-pass-foreground mb-3">
            Booking Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-pass-muted flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                From
              </span>
              <span className="font-semibold text-pass-foreground">
                {route.from}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-pass-muted flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                To
              </span>
              <span className="font-semibold text-pass-foreground">
                {route.to}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-pass-muted">Price per person</span>
              <span className="font-semibold text-pass-foreground">
                GHS {route.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Booking Type Selection */}
        <div className="space-y-3">
          <h3 className="font-semibold text-pass-foreground">Select Booking Type</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleBookingTypeChange("seats")}
              disabled={availableSeats === 0}
              className={`p-3 rounded-lg border transition-all text-center ${
                bookingType === "seats"
                  ? "bg-pass-primary/10 border-pass-primary"
                  : "bg-pass-bg border-pass-border hover:border-pass-primary"
              } ${availableSeats === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="text-xl mb-1">💺</div>
              <p className="text-xs font-semibold text-pass-foreground">
                Seats ({availableSeats} left)
              </p>
            </button>
            <button
              onClick={() => handleBookingTypeChange("standing")}
              disabled={availableStanding === 0}
              className={`p-3 rounded-lg border transition-all text-center ${
                bookingType === "standing"
                  ? "bg-pass-primary/10 border-pass-primary"
                  : "bg-pass-bg border-pass-border hover:border-pass-primary"
              } ${availableStanding === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="text-xl mb-1"><Footprints className="w-5 h-5 mx-auto" /></div>
              <p className="text-xs font-semibold text-pass-foreground">
                Standing ({availableStanding} left)
              </p>
            </button>
          </div>
        </div>

        {/* Number of Passengers */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-pass-foreground">Number of Passengers</h3>
            <span className="text-xs text-pass-muted">
              Max: {bookingType === "seats" ? availableSeats : availableStanding}
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => adjustPassengers(-1)}
              disabled={numPassengers <= 1}
              className="w-10 h-10 rounded-full bg-pass-bg border border-pass-border flex items-center justify-center hover:border-pass-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xl font-bold text-pass-foreground min-w-[3rem] text-center">
              {numPassengers}
            </span>
            <button
              onClick={() => adjustPassengers(1)}
              disabled={numPassengers >= (bookingType === "seats" ? availableSeats : availableStanding)}
              className="w-10 h-10 rounded-full bg-pass-bg border border-pass-border flex items-center justify-center hover:border-pass-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Assigned Spaces */}
        <div className="space-y-3">
          <h3 className="font-semibold text-pass-foreground">Assigned Spaces</h3>
          <div className="bg-pass-bg rounded-lg p-3 space-y-2" style={{height:'7.5em', overflowY:'scroll'}}>
            {assignedSpaces.map((space, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-pass-muted">Passenger {index + 1}</span>
                <span className="font-semibold text-pass-foreground">{space}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Passenger Info */}
        <div className="space-y-3">
          <h3 className="font-semibold text-pass-foreground">
            Passenger Details
          </h3>
          <div className="bg-pass-bg rounded-lg p-3 flex items-center gap-3">
            <User className="w-5 h-5 text-pass-primary" />
            <div>
              <p className="text-xs text-pass-muted">Primary Passenger</p>
              <p className="font-semibold text-pass-foreground">
                {passenger.name}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <h3 className="font-semibold text-pass-foreground">Payment Method</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "momo", name: "Mobile Money", icon: "📱" },
              { id: "card", name: "Card", icon: "💳" },
              { id: "wallet", name: "Wallet", icon: "💰" },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`p-3 rounded-lg border transition-all text-center ${
                  paymentMethod === method.id
                    ? "bg-pass-primary/10 border-pass-primary"
                    : "bg-pass-bg border-pass-border hover:border-pass-primary"
                }`}
              >
                <div className="text-xl mb-1">{method.icon}</div>
                <p className="text-xs font-semibold text-pass-foreground">
                  {method.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-pass-primary/5 border border-pass-primary/20 rounded-lg p-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-pass-muted">
              Subtotal ({numPassengers} passenger{numPassengers > 1 ? "s" : ""})
            </span>
            <span className="font-semibold text-pass-foreground">
              GHS {totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-pass-muted">Service Fee</span>
            <span className="font-semibold text-pass-foreground">Free</span>
          </div>
          <div className="border-t border-pass-primary/20 pt-2 flex justify-between">
            <span className="font-bold text-pass-foreground">Total</span>
            <span className="font-bold text-pass-primary text-lg">
              GHS {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <form onSubmit={handleConfirmBooking} className="space-y-3">
        <button
          type="submit"
          disabled={isProcessing || numPassengers === 0}
          className="w-full bg-gradient-to-r from-pass-primary to-pass-accent hover:shadow-lg disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Confirm Booking
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full border border-pass-border text-pass-foreground font-semibold py-3 rounded-lg hover:bg-pass-bg transition-all"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
