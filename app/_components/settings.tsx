import React, { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  editorSettings: EditorSettings;
  updateSettings: (settings: EditorSettings) => void;
}

interface EditorSettings {
  lineNumbers: boolean;
  highlightActiveLine: boolean;
  theme: string;
}

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
];

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  editorSettings,
  updateSettings,
}) => {
  const [settings, setSettings] = useState<EditorSettings>(editorSettings);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    updateSettings(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Editor Settings</h2>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="lineNumbers"
              checked={settings.lineNumbers}
              onChange={handleChange}
              className="mr-2"
            />
            Show Line Numbers
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="highlightActiveLine"
              checked={settings.highlightActiveLine}
              onChange={handleChange}
              className="mr-2"
            />
            Highlight Active Line
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Select Theme</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            {themes.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
