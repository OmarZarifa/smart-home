import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";

const deviceTypes = [
  { value: "tv", label: "TV" },
  { value: "camera", label: "Camera" },
  { value: "air_purifier", label: "Air Purifier" },
  { value: "refrigerator", label: "Refrigerator" },
  { value: "ac", label: "Air Conditioner" },
  { value: "speaker", label: "Speaker" },
  { value: "vacuum", label: "Vacuum" },
  { value: "door", label: "Door Lock" },
];

function DeviceFormModal({ isOpen, onClose, device, onSubmit, rooms = [] }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "tv",
    status: "off",
    room: "",
    brand: "",
    model: "",
  });

  useEffect(() => {
    if (device) {
      setFormData(device);
    } else {
      setFormData({
        name: "",
        type: "tv",
        status: "off",
        room: "",
        brand: "",
        model: "",
      });
    }
  }, [device]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const submittedData = {
      ...formData,
      id: device?.id || Date.now(),
      connectedAt: device?.connectedAt || currentDate,
    };
    onSubmit(submittedData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {device ? "Edit Device" : "Add New Device"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RiCloseLine size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter device name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {deviceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room
            </label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter brand name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter model name"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {device ? "Save Changes" : "Add Device"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeviceFormModal;
