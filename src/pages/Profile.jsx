import React, { useState } from "react";
import { useUserData } from "../hooks/useUserData";
import {
  RiEyeLine,
  RiEyeOffLine,
  RiUserLine,
  RiLockLine,
  RiSettings4Line,
  RiEditLine,
  RiCheckLine,
  RiCloseLine,
  RiCamera2Line,
  RiMailLine,
  RiShieldLine,
  RiMoonLine,
  RiInformationLine,
} from "react-icons/ri";

function Profile() {
  const { userData, updateUserData } = useUserData();
  const [formData, setFormData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(formData);
    setIsEditing(false);
    if (passwordData.newPassword) {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("New passwords don't match!");
        return;
      }
      console.log("Password change requested");
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowChangePassword(false);
  };

  // Add function to check if there are any changes
  const hasChanges = () => {
    const dataChanged = Object.keys(formData).some(
      (key) => formData[key] !== userData[key]
    );
    const passwordChanged =
      showChangePassword &&
      (passwordData.currentPassword ||
        passwordData.newPassword ||
        passwordData.confirmPassword);
    return dataChanged || passwordChanged;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="relative mb-12">
          <div className="h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] shadow-lg"></div>
          <div className="absolute -bottom-8 inset-x-0 flex justify-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white bg-white shadow-xl">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <RiCamera2Line className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
          <p className="text-gray-500 mt-1">{userData.role}</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50">
                    <RiUserLine className="text-blue-600" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Profile Details
                  </h2>
                </div>
                {!isEditing && (
                  <button
                    onClick={handleStartEditing}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors duration-200"
                  >
                    <span className="flex items-center gap-1.5">
                      <RiEditLine size={16} />
                      Edit
                    </span>
                  </button>
                )}
              </div>
              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                    <RiUserLine size={15} />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                  ) : (
                    <p className="text-gray-900 px-4 py-2.5 bg-gray-50/50 rounded-xl">
                      {formData.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                    <RiMailLine size={15} />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                  ) : (
                    <p className="text-gray-900 px-4 py-2.5 bg-gray-50/50 rounded-xl">
                      {formData.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Security Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-50">
                    <RiShieldLine className="text-purple-600" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Security
                  </h2>
                </div>
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors duration-200"
                >
                  <span className="flex items-center gap-1.5">
                    <RiEditLine size={16} />
                    {showChangePassword ? "Cancel" : "Change Password"}
                  </span>
                </button>
              </div>
              {showChangePassword && (
                <div className="space-y-4">
                  {["current", "new", "confirm"].map((field) => (
                    <div key={field}>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <RiLockLine size={15} />
                        {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords[field] ? "text" : "password"}
                          name={`${field}Password`}
                          value={passwordData[`${field}Password`]}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl pr-10 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(field)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        >
                          {showPasswords[field] ? (
                            <RiEyeOffLine size={16} />
                          ) : (
                            <RiEyeLine size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Preferences Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50">
                  <RiSettings4Line className="text-emerald-600" size={20} />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Preferences
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
                      <RiMoonLine className="text-gray-600" size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Dark Mode</h4>
                      <p className="text-sm text-gray-500">
                        Adjust the appearance
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="darkMode"
                      checked={formData.darkMode}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-emerald-500/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:shadow-sm after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
