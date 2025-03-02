import React, { useState, useMemo } from "react";
import {
  RiDeviceLine,
  RiAddLine,
  RiEditLine,
  RiDeleteBin6Line,
  RiSettings4Line,
  RiMoreLine,
  RiSearchLine,
  RiCloseLine,
  RiTvLine,
  RiCameraLine,
  RiLeafLine,
} from "react-icons/ri";
import devicesData from "../data/devices.json";
import { rooms as roomsData } from "../data/rooms.json";
import DeviceFormModal from "../components/DeviceFormModal";

const deviceIcons = {
  tv: RiTvLine,
  camera: RiCameraLine,
  air_purifier: RiLeafLine,
  default: RiDeviceLine,
};

const statusColors = {
  on: {
    bg: "bg-green-50",
    text: "text-green-600",
    dot: "bg-green-500",
  },
  off: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    dot: "bg-gray-400",
  },
};

function DeviceCard({ device, onEdit, onDelete, onConfigure }) {
  const [showActions, setShowActions] = useState(false);
  const Icon = deviceIcons[device.type] || deviceIcons.default;
  const status = statusColors[device.status] || statusColors.off;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 ${status.bg} rounded-xl transform transition-transform group-hover:scale-110`}
            >
              <Icon size={24} className={status.text} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {device.name}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${status.dot}`}
                ></span>
                <span
                  className={`text-sm ${status.text} font-medium capitalize`}
                >
                  {device.status}
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <RiMoreLine size={20} className="text-gray-500" />
            </button>
            {showActions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                <button
                  onClick={() => {
                    onConfigure(device);
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <RiSettings4Line size={18} />
                  Configure
                </button>
                <button
                  onClick={() => {
                    onEdit(device);
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <RiEditLine size={18} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(device.id);
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <RiDeleteBin6Line size={18} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Device Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Room</span>
            <span className="font-medium text-gray-900">{device.room}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Brand</span>
            <span className="font-medium text-gray-900">{device.brand}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Model</span>
            <span className="font-medium text-gray-900">{device.model}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Connected at</span>
          <span className="font-medium text-gray-900">
            {device.connectedAt}
          </span>
        </div>
      </div>
    </div>
  );
}

function ConfigureDeviceModal({ isOpen, onClose, device, onConfigure }) {
  const [settings, setSettings] = useState({
    status: device?.status || "off",
  });

  if (!isOpen || !device) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfigure({ ...device, ...settings });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Configure Device
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
              Status
            </label>
            <select
              value={settings.status}
              onChange={(e) =>
                setSettings({ ...settings, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Devices({
  devices: initialDevices = devicesData.devices,
  rooms = roomsData.map((room) => room.name),
}) {
  const [devices, setDevices] = useState(initialDevices);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [isDeviceFormOpen, setIsDeviceFormOpen] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter devices based on search query and filters
  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesSearch =
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.room.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRoom =
        selectedRoom === "all" || device.room === selectedRoom;
      const matchesStatus =
        selectedStatus === "all" || device.status === selectedStatus;
      return matchesSearch && matchesRoom && matchesStatus;
    });
  }, [devices, searchQuery, selectedRoom, selectedStatus]);

  const handleConfigureDevice = (updatedDevice) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === updatedDevice.id ? updatedDevice : device
      )
    );
  };

  const handleDeleteDevice = (deviceId) => {
    setDeviceToDelete(deviceId);
    setShowDeleteConfirm(true);
  };

  const handleAddOrEditDevice = (deviceData) => {
    setDevices((prev) => {
      const existingDeviceIndex = prev.findIndex((d) => d.id === deviceData.id);
      if (existingDeviceIndex >= 0) {
        // Edit existing device
        const newDevices = [...prev];
        newDevices[existingDeviceIndex] = deviceData;
        return newDevices;
      } else {
        // Add new device
        return [...prev, deviceData];
      }
    });
  };

  const handleEditClick = (device) => {
    setDeviceToEdit(device);
    setIsDeviceFormOpen(true);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <RiDeviceLine className="text-3xl text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Devices</h1>
                <p className="text-gray-500">Manage your connected devices</p>
              </div>
            </div>
            <button
              onClick={() => {
                setDeviceToEdit(null);
                setIsDeviceFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RiAddLine size={20} />
              Add Device
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Rooms</option>
              {roomsData.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
          </div>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevices.length > 0 ? (
            filteredDevices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onEdit={handleEditClick}
                onDelete={handleDeleteDevice}
                onConfigure={(device) => {
                  setSelectedDevice(device);
                  setIsConfigureModalOpen(true);
                }}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <RiDeviceLine className="text-5xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No devices found
              </h3>
              <p className="text-gray-500">
                {searchQuery ||
                selectedRoom !== "all" ||
                selectedStatus !== "all"
                  ? "Try adjusting your search or filters"
                  : "No devices available"}
              </p>
            </div>
          )}
        </div>

        {/* Device Form Modal */}
        <DeviceFormModal
          isOpen={isDeviceFormOpen}
          onClose={() => {
            setIsDeviceFormOpen(false);
            setDeviceToEdit(null);
          }}
          device={deviceToEdit}
          onSubmit={handleAddOrEditDevice}
          rooms={roomsData.map((room) => room.name)}
        />

        {/* Configure Device Modal */}
        <ConfigureDeviceModal
          isOpen={isConfigureModalOpen}
          onClose={() => {
            setIsConfigureModalOpen(false);
            setSelectedDevice(null);
          }}
          onConfigure={handleConfigureDevice}
          device={selectedDevice}
        />

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Delete Device
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this device? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeviceToDelete(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setDevices((prev) =>
                      prev.filter((device) => device.id !== deviceToDelete)
                    );
                    setShowDeleteConfirm(false);
                    setDeviceToDelete(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Devices;
