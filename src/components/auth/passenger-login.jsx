import { useState } from "react";
import { LogIn, Phone } from "lucide-react";

export default function LoginForm({ onLogin, onShowSignup }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!phone) {
      setError("Please enter your phone number");
      return;
    }

    if (!/^\+233|0/.test(phone)) {
      setError("Please enter a valid Ghana phone number");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setStep("otp");
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (otp.length < 4) {
      setError("Please enter the 4-digit OTP");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        name: "Ama Boateng",
        phone,
        id: Math.random().toString(),
        wallet: 125.5,
        savedLocations: ["Home", "Work"],
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pass-bg via-pass-surface to-pass-bg px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-pass-primary to-pass-accent mb-4 shadow-lg">
          <span className="text-2xl font-bold text-white">T</span>
        </div>
        <h1 className="text-3xl font-bold text-pass-foreground mb-2">
          TSTS Rider
        </h1>
        <p className="text-pass-muted text-sm">
          Book your ride. Track in real-time.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-pass-surface border border-pass-border rounded-2xl p-6 shadow-2xl">
        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-pass-foreground mb-1">
                Welcome
              </h2>
              <p className="text-sm text-pass-muted">
                Enter your phone number to get started
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-pass-error/10 border border-pass-error/30 text-pass-error text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select className="px-3 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground font-semibold focus:outline-none focus:border-pass-primary w-16">
                  <option>+233</option>
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="24 123 4567"
                  className="flex-1 px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pass-primary hover:bg-pass-primary-dark disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  Continue
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-pass-foreground mb-1">
                Verify Code
              </h2>
              <p className="text-sm text-pass-muted">
                Enter the 4-digit code sent to +233{phone.slice(-9)}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-pass-error/10 border border-pass-error/30 text-pass-error text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20 text-center text-lg tracking-widest font-bold transition-all"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setOtp("");
              }}
              className="w-full text-pass-primary text-sm font-semibold hover:underline"
            >
              Use a different number
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pass-primary hover:bg-pass-primary-dark disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="text-center mt-6 space-y-2">
        <button
          onClick={() => onShowSignup && onShowSignup()}
          className="text-pass-primary hover:text-pass-accent text-sm font-semibold hover:underline transition-colors"
        >
          Don't have an account? Sign up here
        </button>
        <p className="text-pass-muted text-xs max-w-sm">
         Register with phone number, OTP: 4 digits Pin
        </p>
      </div>
    </div>
  );
}
