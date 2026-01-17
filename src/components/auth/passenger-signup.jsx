import { useState } from "react";
import { User, MapPin, CreditCard, Phone, CheckCircle2, ChevronRight, ChevronLeft, Camera, Upload, Eye, EyeOff, Shield, FileText, AlertCircle } from "lucide-react";

const steps = [
  { id: "personal", title: "Personal Info", icon: User },
  { id: "address", title: "Address", icon: MapPin },
  { id: "id_verification", title: "ID Verification", icon: Shield },
  { id: "face_scan", title: "Face Scan", icon: Camera },
  { id: "emergency", title: "Emergency Contact", icon: Phone },
  { id: "review", title: "Review & Submit", icon: CheckCircle2 }
];

const ghanaIdTypes = [
  { value: "ghana_card", label: "Ghana Card", description: "National ID Card" },
  { value: "passport", label: "Passport", description: "Ghanaian Passport" },
  { value: "drivers_license", label: "Driver's License", description: "Ghana Driver's License" },
  { value: "voters_id", label: "Voter's ID", description: "Ghana Voter's ID Card" }
];

export default function PassengerSignup({ onSignup, onBackToLogin }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Address
    address: "",
    city: "",
    region: "",
    postalCode: "",

    // ID Verification
    idType: "",
    idNumber: "",
    idFrontImage: null,
    idBackImage: null,

    // Face Scan
    faceImage: null,

    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelationship: "",

    // Terms
    acceptTerms: false,
    acceptPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (stepIndex) => {
    const newErrors = {};

    switch (stepIndex) {
      case 0: // Personal Info
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        break;

      case 1: // Address
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.region) newErrors.region = "Region is required";
        break;

      case 2: // ID Verification
        if (!formData.idType) newErrors.idType = "ID type is required";
        if (!formData.idNumber.trim()) newErrors.idNumber = "ID number is required";
        if (!formData.idFrontImage) newErrors.idFrontImage = "Front ID image is required";
        if (formData.idType !== "ghana_card" && !formData.idBackImage) newErrors.idBackImage = "Back ID image is required";
        break;

      case 3: // Face Scan
        if (!formData.faceImage) newErrors.faceImage = "Face scan is required";
        break;

      case 4: // Emergency Contact
        if (!formData.emergencyName.trim()) newErrors.emergencyName = "Emergency contact name is required";
        if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency contact phone is required";
        if (!formData.emergencyRelationship) newErrors.emergencyRelationship = "Relationship is required";
        break;

      case 5: // Review
        if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms";
        if (!formData.acceptPrivacy) newErrors.acceptPrivacy = "You must accept the privacy policy";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleFileUpload = (field, file) => {
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors(prev => ({ ...prev, [field]: "File size must be less than 5MB" }));
      return;
    }
    updateFormData(field, file);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        id: Math.random().toString(),
        wallet: 0,
        profileComplete: true,
        verified: true
      };

      onSignup(userData);
    } catch (error) {
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-pass-foreground mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-pass-foreground mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                Phone Number *
              </label>
              <div className="flex gap-2">
                <select className="px-3 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground font-semibold focus:outline-none focus:border-pass-primary w-20">
                  <option>+233</option>
                </select>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className="flex-1 px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                  placeholder="24 123 4567"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-pass-foreground mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                  className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-pass-foreground mb-2">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateFormData("gender", e.target.value)}
                  className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>
            </div>
          </div>
        );

      case 1: // Address
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                Street Address *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                placeholder="Enter street address"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-pass-foreground mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                  placeholder="Enter city"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-pass-foreground mb-2">
                  Region *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => updateFormData("region", e.target.value)}
                  className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                >
                  <option value="">Select region</option>
                  <option value="greater_accra">Greater Accra</option>
                  <option value="ashanti">Ashanti</option>
                  <option value="central">Central</option>
                  <option value="eastern">Eastern</option>
                  <option value="volta">Volta</option>
                  <option value="western">Western</option>
                  <option value="northern">Northern</option>
                  <option value="upper_east">Upper East</option>
                  <option value="upper_west">Upper West</option>
                  <option value="oti">Oti</option>
                  <option value="north_east">North East</option>
                  <option value="savannah">Savannah</option>
                  <option value="bono">Bono</option>
                  <option value="bono_east">Bono East</option>
                  <option value="ahafo">Ahafo</option>
                </select>
                {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => updateFormData("postalCode", e.target.value)}
                className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                placeholder="Enter postal code (optional)"
              />
            </div>
          </div>
        );

      case 2: // ID Verification
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="w-16 h-16 text-pass-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-pass-foreground mb-2">
                Government ID Verification
              </h3>
              <p className="text-pass-muted text-sm">
                Upload a government-issued ID for verification. Only Ghana Card, Passport, Driver's License, or Voter's ID are accepted.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                ID Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ghanaIdTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => updateFormData("idType", type.value)}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      formData.idType === type.value
                        ? "border-pass-primary bg-pass-primary/5"
                        : "border-pass-border hover:border-pass-primary/50"
                    }`}
                  >
                    <div className="font-semibold text-pass-foreground">{type.label}</div>
                    <div className="text-xs text-pass-muted">{type.description}</div>
                  </button>
                ))}
              </div>
              {errors.idType && <p className="text-red-500 text-xs mt-1">{errors.idType}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                ID Number *
              </label>
              <input
                type="text"
                value={formData.idNumber}
                onChange={(e) => updateFormData("idNumber", e.target.value)}
                className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                placeholder="Enter ID number"
              />
              {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-pass-foreground mb-2">
                  Front of ID *
                </label>
                <div className="border-2 border-dashed border-pass-border rounded-xl p-6 text-center hover:border-pass-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload("idFrontImage", e.target.files[0])}
                    className="hidden"
                    id="id-front"
                  />
                  <label htmlFor="id-front" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-pass-muted mx-auto mb-2" />
                    <p className="text-sm text-pass-muted">
                      {formData.idFrontImage ? formData.idFrontImage.name : "Click to upload front"}
                    </p>
                  </label>
                </div>
                {errors.idFrontImage && <p className="text-red-500 text-xs mt-1">{errors.idFrontImage}</p>}
              </div>

              {formData.idType !== "ghana_card" && (
                <div>
                  <label className="block text-sm font-semibold text-pass-foreground mb-2">
                    Back of ID *
                  </label>
                  <div className="border-2 border-dashed border-pass-border rounded-xl p-6 text-center hover:border-pass-primary transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("idBackImage", e.target.files[0])}
                      className="hidden"
                      id="id-back"
                    />
                    <label htmlFor="id-back" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-pass-muted mx-auto mb-2" />
                      <p className="text-sm text-pass-muted">
                        {formData.idBackImage ? formData.idBackImage.name : "Click to upload back"}
                      </p>
                    </label>
                  </div>
                  {errors.idBackImage && <p className="text-red-500 text-xs mt-1">{errors.idBackImage}</p>}
                </div>
              )}
            </div>
          </div>
        );

      case 3: // Face Scan
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Camera className="w-16 h-16 text-pass-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-pass-foreground mb-2" >
                Face Verification
              </h3>
              <p className="text-pass-muted text-sm">
                Take a clear photo of your face for identity verification. Ensure good lighting and remove any accessories.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="border-2 border-dashed border-pass-border rounded-xl p-8 text-center hover:border-pass-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={(e) => handleFileUpload("faceImage", e.target.files[0])}
                  className="hidden"
                  id="face-scan"
                />
                <label htmlFor="face-scan" className="cursor-pointer">
                  <Camera className="w-12 h-12 text-pass-muted mx-auto mb-4" />
                  <p className="text-lg font-semibold text-pass-foreground mb-2">
                    {formData.faceImage ? "Photo Captured" : "Take Selfie"}
                  </p>
                  <p className="text-sm text-pass-muted">
                    {formData.faceImage
                      ? "Face photo uploaded successfully"
                      : "Click to capture or upload a clear photo of your face"
                    }
                  </p>
                </label>
              </div>
              {errors.faceImage && <p className="text-red-500 text-xs mt-2">{errors.faceImage}</p>}
            </div>
          </div>
        );

      case 4: // Emergency Contact
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Phone className="w-16 h-16 text-pass-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-pass-foreground mb-2">
                Emergency Contact
              </h3>
              <p className="text-pass-muted text-sm">
                Provide contact information for someone we can reach in case of emergency.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.emergencyName}
                onChange={(e) => updateFormData("emergencyName", e.target.value)}
                className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                placeholder="Enter emergency contact name"
              />
              {errors.emergencyName && <p className="text-red-500 text-xs mt-1">{errors.emergencyName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                Phone Number *
              </label>
              <div className="flex gap-2">
                <select className="px-3 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground font-semibold focus:outline-none focus:border-pass-primary w-20">
                  <option>+233</option>
                </select>
                <input
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                  className="flex-1 px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground placeholder-pass-muted focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
                  placeholder="24 123 4567"
                />
              </div>
              {errors.emergencyPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-pass-foreground mb-2">
                Relationship *
              </label>
              <select
                value={formData.emergencyRelationship}
                onChange={(e) => updateFormData("emergencyRelationship", e.target.value)}
                className="w-full px-4 py-3 bg-pass-bg border border-pass-border rounded-xl text-pass-foreground focus:outline-none focus:border-pass-primary focus:ring-2 focus:ring-pass-primary/20"
              >
                <option value="">Select relationship</option>
                <option value="parent">Parent</option>
                <option value="spouse">Spouse</option>
                <option value="sibling">Sibling</option>
                <option value="child">Child</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
              {errors.emergencyRelationship && <p className="text-red-500 text-xs mt-1">{errors.emergencyRelationship}</p>}
            </div>
          </div>
        );

      case 5: // Review & Submit
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-pass-foreground mb-2">
                Review Your Information
              </h3>
              <p className="text-pass-muted text-sm">
                Please review all information before submitting your registration.
              </p>
            </div>

            {/* Review Sections */}
            <div className="space-y-4">
              <div className="bg-pass-bg rounded-xl p-4">
                <h4 className="font-semibold text-pass-foreground mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-pass-muted">Name:</span>
                    <p className="font-semibold">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <span className="text-pass-muted">Email:</span>
                    <p className="font-semibold">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-pass-muted">Phone:</span>
                    <p className="font-semibold">+233 {formData.phone}</p>
                  </div>
                  <div>
                    <span className="text-pass-muted">Date of Birth:</span>
                    <p className="font-semibold">{formData.dateOfBirth}</p>
                  </div>
                </div>
              </div>

              <div className="bg-pass-bg rounded-xl p-4">
                <h4 className="font-semibold text-pass-foreground mb-3 flex items-center gap-2" >
                  <MapPin className="w-4 h-4" />
                  Address
                </h4>
                <div className="text-sm">
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.region}</p>
                  {formData.postalCode && <p>Postal Code: {formData.postalCode}</p>}
                </div>
              </div>

              <div className="bg-pass-bg rounded-xl p-4">
                <h4 className="font-semibold text-pass-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  ID Verification
                </h4>
                <div className="text-sm">
                  <p><span className="text-pass-muted">Type:</span> {ghanaIdTypes.find(t => t.value === formData.idType)?.label}</p>
                  <p><span className="text-pass-muted">Number:</span> {formData.idNumber}</p>
                </div>
              </div>

              <div className="bg-pass-bg rounded-xl p-4">
                <h4 className="font-semibold text-pass-foreground mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Emergency Contact
                </h4>
                <div className="text-sm">
                  <p><span className="text-pass-muted">Name:</span> {formData.emergencyName}</p>
                  <p><span className="text-pass-muted">Phone:</span> +233 {formData.emergencyPhone}</p>
                  <p><span className="text-pass-muted">Relationship:</span> {formData.emergencyRelationship}</p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptTerms}
                  onChange={(e) => updateFormData("acceptTerms", e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-pass-muted">
                  I agree to the <span className="text-pass-primary underline cursor-pointer">Terms of Service</span> and understand the conditions for using TSTS services.
                </label>
              </div>
              {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={formData.acceptPrivacy}
                  onChange={(e) => updateFormData("acceptPrivacy", e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="privacy" className="text-sm text-pass-muted">
                  I agree to the <span className="text-pass-primary underline cursor-pointer">Privacy Policy</span> and consent to the collection and use of my personal data.
                </label>
              </div>
              {errors.acceptPrivacy && <p className="text-red-500 text-xs">{errors.acceptPrivacy}</p>}
            </div>

            {errors.submit && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {errors.submit}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pass-bg via-pass-surface to-pass-bg px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-pass-primary to-pass-accent mb-4 shadow-lg">
          <span className="text-2xl font-bold text-white">T</span>
        </div>
        <h1 className="text-3xl font-bold text-pass-foreground mb-2">
          Join TSTS Rider
        </h1>
        <p className="text-pass-muted text-sm">
          Complete your registration to start riding
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-pass-primary text-white"
                    : "bg-pass-bg text-pass-muted"
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span style={{fontSize:'10px'}} className={`text-xs text-center ${
                  isCurrent ? "text-pass-primary font-semibold" : "text-pass-muted"
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mt-2 ${
                    index < currentStep ? "bg-green-500" : "bg-pass-border"
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-pass-surface border border-pass-border rounded-2xl p-6 shadow-2xl">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={currentStep === 0 ? onBackToLogin : prevStep}
              className="px-6 py-3 border border-pass-border text-pass-foreground font-semibold rounded-xl hover:bg-pass-bg transition-all"
            >
              {currentStep === 0 ? "Back to Login" : "Previous"}
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-pass-primary hover:bg-pass-primary-dark text-white font-semibold rounded-xl transition-all flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-pass-primary to-pass-accent hover:shadow-lg disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Complete Registration
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
