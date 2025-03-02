import React, { useState } from "react";
import { RiMicLine, RiInformationLine, RiSettings4Line } from "react-icons/ri";
import aiData from "../data/ai.json";

function VoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [settings, setSettings] = useState({
    language: aiData.settings.language,
  });

  const handleSettingChange = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Voice Control */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Voice Recognition
                  </h2>
                  <button
                    onClick={() => setShowCommands(!showCommands)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <RiInformationLine size={18} />
                  </button>
                </div>
                <p className="text-gray-500 mt-1 text-sm">
                  {isListening
                    ? "Listening..."
                    : "Click the microphone to start"}
                </p>
              </div>
              <button
                onClick={() => setIsListening(!isListening)}
                className={`p-6 rounded-full transition-all ${
                  isListening
                    ? "bg-red-100 text-red-600 animate-pulse"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <RiMicLine size={32} />
              </button>
            </div>

            {/* Available Commands */}
            {showCommands && (
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-medium text-blue-900 mb-2">
                  Available Commands
                </h3>
                <ul className="space-y-1.5">
                  {aiData.availableCommands.map((command, index) => (
                    <li
                      key={index}
                      className="text-blue-800 text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {command}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Command History */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500 px-3">
                <span>Recent Commands</span>
                <span>Status</span>
              </div>
              {aiData.voiceCommands.map((command) => (
                <div
                  key={command.id}
                  className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
                      <RiMicLine className="text-gray-600" size={18} />
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">
                        {command.command}
                      </span>
                      <p className="text-sm text-gray-500">
                        {command.timestamp}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-sm text-gray-600">Completed</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50">
                <RiSettings4Line className="text-emerald-600" size={20} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recognition Settings
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div>
                  <p className="font-medium text-gray-900">Language</p>
                  <p className="text-sm text-gray-500">
                    Current: {settings.language}
                  </p>
                </div>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    handleSettingChange("language", e.target.value)
                  }
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceRecognition;
