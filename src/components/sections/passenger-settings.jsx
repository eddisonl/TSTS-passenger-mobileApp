import { useState } from "react";
import { User, MapPin, Phone, Mail, CreditCard, Trash2, Edit, Save, X } from "lucide-react";

export default function PassengerSettings({ passenger, onUpdateProfile, onDeleteAccount, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: passenger?.name || "",
    phone: passenger?.phone || "",
    email: passenger?.email || "",
    address: passenger?.address || "",
    emergencyContact: passenger?.emergencyContact || "",
    emergencyPhone: passenger?.emergencyPhone || "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: passenger?.name || "",
      phone: passenger?.phone || "",
      email: passenger?.email || "",
      address: passenger?.address || "",
      emergencyContact: passenger?.emergencyContact || "",
      emergencyPhone: passenger?.emergencyPhone || "",
    });
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      onDeleteAccount();
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-pass-surface border border-pass-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-pass-foreground">Profile Settings</h2>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="p-2 hover:bg-pass-bg rounded-lg transition-colors text-pass-primary"
            >
              <Edit className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="p-2 hover:bg-pass-bg rounded-lg transition-colors text-green-600"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-pass-bg rounded-lg transition-colors text-pass-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-pass-primary to-pass-accent rounded-full flex items-center justify-center text-white text-xl font-bold">
            {passenger?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h3 className="text-lg font-bold text-pass-foreground">{passenger?.name}</h3>
            <p className="text-sm text-pass-muted">Member since {passenger?.createdAt ? new Date(passenger.createdAt).toLocaleDateString() : "Recently"}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-pass-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Information
              </h4>

              <div>
                <label className="block text-xs font-semibold text-pass-foreground mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-pass-bg border border-pass-border rounded-lg text-pass-foreground focus:outline-none focus:border-pass-primary"
                  />
                ) : (
                  <p className="text-sm text-pass-muted bg-pass-bg px-3 py-2 rounded-lg">{passenger?.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-pass-foreground mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 bg-pass-bg border border-pass-border rounded-lg text-pass-foreground focus:outline-none focus:border-pass-primary"
                  />
                ) : (
                  <p className="text-sm text-pass-muted bg-pass-bg px-3 py-2 rounded-lg">{passenger?.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-pass-foreground mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 bg-pass-bg border border-pass-border rounded-lg text-pass-foreground focus:outline-none focus:border-pass-primary"
                  />
                ) : (
                  <p className="text-sm text-pass-muted bg-pass-bg px-3 py-2 rounded-lg">{passenger?.email}</p>
                )}
              </div>
            </div>

            {/* Address & Emergency */}
            <div className="space-y-3">
              <h4 className="font-semibold text-pass-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address & Emergency
              </h4>

              <div>
                <label className="block text-xs font-semibold text-pass-foreground mb-1">Home Address</label>
                {isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) => setEditData(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-pass-bg border border-pass-border rounded-lg text-pass-foreground focus:outline-none focus:border-pass-primary resize-none"
                  />
                ) : (
                  <p className="text-sm text-pass-muted bg-pass-bg px-3 py-2 rounded-lg min-h-[60px]">{passenger?.address}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-pass-foreground mb-1">Emergency Contact</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.emergencyContact}
                    onChange={(e) => setEditData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    className="w-full px-3 py-2 bg-pass-bg border border-pass-border rounded-lg text-pass-foreground focus:outline-none focus:border-pass-primary"
                  />
                ) : (
                  <p className="text-sm text-pass-muted bg-pass-bg px-3 py-2 rounded-lg">{passenger?.emergencyContact}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-pass-foreground mb-1">Emergency Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.emergencyPhone}
                    onChange={(e) => setEditData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                    className="w-full px-3 py-2 bg-pass-bg border border-pass-border rounded-lg text-pass-foreground focus:outline-none focus:border-pass-primary"
                  />
                ) : (
                  <p className="text-sm text-pass-muted bg-pass-bg px-3 py-2 rounded-lg">{passenger?.emergencyPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Identity Verification */}
          <div className="border-t border-pass-border pt-4">
            <h4 className="font-semibold text-pass-foreground flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4" />
              Identity Verification
            </h4>
            <div className="bg-pass-bg rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-pass-foreground">Ghana Card Verified</p>
                  <p className="text-xs text-pass-muted">ID: {passenger?.ghanaCardNumber}</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-pass-surface border border-pass-border rounded-2xl p-6">
        <h3 className="text-lg font-bold text-pass-foreground mb-4">Account Actions</h3>

        <div className="space-y-3">
          <button
            onClick={() => alert("Password change functionality would be implemented here")}
            className="w-full p-3 border border-pass-border rounded-lg text-left hover:bg-pass-bg transition-colors"
          >
            <div className="font-semibold text-pass-foreground">Change Password</div>
            <div className="text-sm text-pass-muted">Update your account password</div>
          </button>

          <button
            onClick={() => alert("Notification preferences would be implemented here")}
            className="w-full p-3 border border-pass-border rounded-lg text-left hover:bg-pass-bg transition-colors"
          >
            <div className="font-semibold text-pass-foreground">Notification Settings</div>
            <div className="text-sm text-pass-muted">Manage your notification preferences</div>
          </button>

          <button
            onClick={() => alert("Privacy settings would be implemented here")}
            className="w-full p-3 border border-pass-border rounded-lg text-left hover:bg-pass-bg transition-colors"
          >
            <div className="font-semibold text-pass-foreground">Privacy Settings</div>
            <div className="text-sm text-pass-muted">Control your data and privacy</div>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-red-700 mb-4">Danger Zone</h3>

        {!showDeleteConfirm ? (
          <button
            onClick={handleDeleteAccount}
            className="w-full p-3 border border-red-300 rounded-lg text-left hover:bg-red-100 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-red-700 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </div>
              <div className="text-sm text-red-600">Permanently delete your account and all data</div>
            </div>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-sm text-red-700 font-semibold mb-2">Are you sure you want to delete your account?</p>
              <p className="text-xs text-red-600">This action cannot be undone. All your data, bookings, and wallet balance will be permanently removed.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 border border-pass-border text-pass-foreground font-semibold py-2 rounded-lg hover:bg-pass-bg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-all"
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
