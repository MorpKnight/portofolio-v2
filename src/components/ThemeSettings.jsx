import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx'
import { Palette, X } from 'lucide-react';

export default function ThemeSettings() {
  const { changeTheme, setAutoRotate } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  
  const darkThemes = [
    { key: 'dark-slate', name: 'Slate' },
    { key: 'dark-ocean', name: 'Ocean' },
    { key: 'dark-forest', name: 'Forest' },
    { key: 'dark-sunset', name: 'Sunset' }
  ];
  
  const lightThemes = [
    { key: 'light-stone', name: 'Stone' },
    { key: 'light-daybreak', name: 'Daybreak' },
    { key: 'light-blossom', name: 'Blossom' },
    { key: 'light-meadow', name: 'Meadow' }
  ];
  
  const rotationOptions = [
    { label: 'Off', value: null },
    { label: '5s', value: 5000 },
    { label: '5m', value: 300000 },
    { label: '1h', value: 3600000 },
    { label: '1d', value: 86400000 },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Minimized state - just the icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[color:var(--card-bg)] hover:bg-[color:var(--hover-bg)] text-[color:var(--text)] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 border border-[color:var(--card-border)]"
          aria-label="Open theme settings"
        >
          <Palette size={20} />
        </button>
      )}
      
      {/* Expanded state - full menu */}
      {isOpen && (
        <div className="bg-[color:var(--card-bg)] p-4 rounded-lg shadow-xl w-64 border border-[color:var(--card-border)]">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-[color:var(--text)] font-bold text-sm flex items-center">
              <Palette size={16} className="mr-2"/>Theme Settings
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[color:var(--text-muted)] hover:text-[color:var(--text)] transition-colors"
              aria-label="Close theme settings"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Dark Themes Section */}
          <div className="mb-4">
            <h5 className="text-[color:var(--text-muted)] text-xs font-semibold mb-2">DARK THEMES</h5>
            <div className="grid grid-cols-2 gap-2">
              {darkThemes.map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => changeTheme(theme.key)}
                  className="text-[color:var(--text)] hover:text-[color:var(--primary)] text-xs py-2 px-2 rounded bg-[color:var(--background-1)] hover:bg-[color:var(--background-2)] transition-colors"
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Light Themes Section */}
          <div className="mb-4">
            <h5 className="text-[color:var(--text-muted)] text-xs font-semibold mb-2">LIGHT THEMES</h5>
            <div className="grid grid-cols-2 gap-2">
              {lightThemes.map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => changeTheme(theme.key)}
                  className="text-[color:var(--text)] hover:text-[color:var(--primary)] text-xs py-2 px-2 rounded bg-[color:var(--background-1)] hover:bg-[color:var(--background-2)] transition-colors"
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-3 border-t border-[color:var(--card-border)]">
            <label htmlFor="auto-rotate" className="text-[color:var(--text)] text-xs block mb-1">Auto-rotate</label>
            <select
              id="auto-rotate"
              onChange={(e) => setAutoRotate(e.target.value ? parseInt(e.target.value) : null)}
              className="bg-[color:var(--background-1)] text-[color:var(--text)] px-2 py-1 rounded-md text-xs w-full border border-[color:var(--card-border)]"
              defaultValue=""
            >
              {rotationOptions.map(option => (
                <option key={option.label} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}