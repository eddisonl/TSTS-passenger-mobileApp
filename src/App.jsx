import { useState } from "react";
import LoginForm from "./components/auth/passenger-login";
import PassengerSignup from "./components/auth/passenger-signup";
import PassengerHome from "./components/dashboard/passenger-home";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passengerUser, setPassengerUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginSuccess = (userData) => {
    setPassengerUser(userData);
    setIsLoggedIn(true);
  };

  const handleSignupSuccess = (userData) => {
    setPassengerUser(userData);
    setIsLoggedIn(true);
    setShowSignup(false);
  };

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  const handleBackToLogin = () => {
    setShowSignup(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassengerUser(null);
    setShowSignup(false);
  };

  if (isLoggedIn) {
    return <PassengerHome passenger={passengerUser} onLogout={handleLogout} />;
  }

  if (showSignup) {
    return <PassengerSignup onSignup={handleSignupSuccess} onBackToLogin={handleBackToLogin} />;
  }

  return <LoginForm onLogin={handleLoginSuccess} onShowSignup={handleShowSignup} />;
}
