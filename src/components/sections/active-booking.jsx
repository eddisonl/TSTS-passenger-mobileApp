import {
  MapPin,
  QrCode,
  Clock,
  Users,
  AlertCircle,
  Share2,
  Copy,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function ActiveBooking({ booking, onCancel }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!booking) {
    return (
      <div className="bg-pass-surface border border-pass-border rounded-2xl p-6 text-center text-pass-muted">
        No active booking. Find a route to get started.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-gradient-to-r from-pass-primary/20 to-pass-accent/20 border border-pass-primary/30 rounded-2xl p-4 space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-pass-primary" />
          <div>
            <p className="text-sm text-pass-muted">Booking Confirmed</p>
            <p className="font-bold text-pass-foreground">
              Your ticket is ready
            </p>
          </div>
        </div>

        {/* Booking ID */}
        <div className="bg-pass-surface border border-pass-border rounded-lg p-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-pass-muted mb-1">Booking ID</p>
            <p className="font-mono font-bold text-pass-foreground text-sm">
              {booking.id}
            </p>
          </div>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-pass-bg rounded-lg transition-colors text-pass-primary"
          >
            {copied ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Route Details */}
      <div className="bg-pass-surface border border-pass-border rounded-2xl p-4 space-y-4">
        <h3 className="font-bold text-pass-foreground">Trip Details</h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-pass-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-pass-muted">From</p>
              <p className="font-semibold text-pass-foreground">
                {booking.route.from}
              </p>
            </div>
          </div>

          <div className="ml-2.5 h-8 border-l-2 border-pass-border" />

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-pass-accent flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-pass-muted">To</p>
              <p className="font-semibold text-pass-foreground">
                {booking.route.to}
              </p>
            </div>
          </div>
        </div>

        {/* Journey Info */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-pass-border">
          <div className="text-center p-2">
            <Clock className="w-4 h-4 text-pass-primary mx-auto mb-1" />
            <p className="text-xs text-pass-muted mb-0.5">Duration</p>
            <p className="font-semibold text-pass-foreground text-sm">
              {booking.route.time}
            </p>
          </div>
          <div className="text-center p-2">
            <Users className="w-4 h-4 text-pass-primary mx-auto mb-1" />
            <p className="text-xs text-pass-muted mb-0.5">
              {booking.bookingType === "seats" ? "Seats" : "Standing"}
            </p>
            <p className="font-semibold text-pass-foreground text-sm">
              {booking.assignedSpaces ? booking.assignedSpaces.join(", ") : `${booking.numPassengers} ${booking.bookingType}`}
            </p>
          </div>
          <div className="text-center p-2">
            <span className="text-xl mb-1">🚌</span>
            <p className="text-xs text-pass-muted mb-0.5">Vehicle</p>
            <p className="font-semibold text-pass-foreground text-sm">
              GR-234-21
            </p>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-pass-surface border border-pass-border rounded-2xl p-6 text-center space-y-3">
        <p className="text-sm font-semibold text-pass-foreground mb-4">
          Show this code to board
        </p>
        <div className="bg-white rounded-xl p-6 inline-block border-2 border-pass-border">
          <div className="w-48 h-48 bg-gradient-to-br from-pass-primary to-pass-accent rounded-lg flex items-center justify-center">
            <QrCode className="w-32 h-32 text-white opacity-80" />
          </div>
        </div>
        <p className="text-xs text-pass-muted">Code: {booking.qrCode}</p>
      </div>

      {/* Driver Info */}
      <div className="bg-pass-surface border border-pass-border rounded-xl p-4 space-y-2">
        <h3 className="font-semibold text-pass-foreground mb-3">
          Driver Information
        </h3>
        <div className="flex items-center justify-between p-3 bg-pass-bg rounded-lg">
          <div>
            <p className="text-sm font-semibold text-pass-foreground">
              Emmanuel Owusu
            </p>
            <p className="text-xs text-pass-muted flex items-center gap-1 mt-1">
              ⭐ 4.8 • 1,250 trips
            </p>
          </div>
          <button className="px-3 py-1.5 bg-pass-primary text-white text-xs font-semibold rounded-lg hover:bg-pass-primary-dark transition-colors">
            Call
          </button>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-pass-primary/5 border border-pass-primary/20 rounded-xl p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-pass-muted">Amount Paid</span>
          <span className="font-bold text-pass-foreground">
            GHS {booking.totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-pass-muted">Payment Method</span>
          <span className="font-semibold text-pass-foreground capitalize">
            {booking.paymentMethod}
          </span>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-pass-warning/10 border border-pass-warning rounded-xl p-3 flex gap-2">
        <AlertCircle className="w-4 h-4 text-pass-warning flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-pass-warning">
            Remember to arrive 15 minutes early
          </p>
          <p className="text-pass-muted">Driver will depart on schedule</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-pass-border text-pass-foreground font-semibold rounded-lg hover:bg-pass-bg transition-colors">
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-3 bg-pass-error/10 text-pass-error font-semibold rounded-lg hover:bg-pass-error/20 transition-colors"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
}
