import React from 'react';

const ThemeShowcase = () => {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-bold text-theme-primary mb-8">Theme Showcase</h2>
      
      {/* Rounded Box Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-box rounded-box-hover">
          <h3 className="text-xl font-semibold text-theme-primary mb-2">Rounded Box</h3>
          <p className="text-theme-muted">
            A simple rounded box with hover effects. Perfect for cards and content containers.
          </p>
        </div>
        
        <div className="rounded-box-lg rounded-box-hover">
          <h3 className="text-xl font-semibold text-theme-primary mb-2">Large Rounded Box</h3>
          <p className="text-theme-muted">
            A larger rounded box with more padding and smooth transitions.
          </p>
        </div>
        
        <div className="rounded-box-xl rounded-box-hover">
          <h3 className="text-xl font-semibold text-theme-primary mb-2">Extra Large Box</h3>
          <p className="text-theme-muted">
            An extra large rounded box with generous padding for important content.
          </p>
        </div>
      </div>
      
      {/* Card Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-elevated rounded-lg p-6">
          <h3 className="text-xl font-semibold text-theme-primary mb-3">Elevated Card</h3>
          <p className="text-theme-muted mb-4">
            This card has subtle shadows and hover effects for a modern look.
          </p>
          <button className="btn-theme-primary px-4 py-2 rounded-md font-medium">
            Primary Action
          </button>
        </div>
        
        <div className="card-elevated rounded-lg p-6">
          <h3 className="text-xl font-semibold text-theme-primary mb-3">Another Card</h3>
          <p className="text-theme-muted mb-4">
            All cards automatically adapt to the selected theme colors.
          </p>
          <button className="btn-theme-secondary px-4 py-2 rounded-md font-medium">
            Secondary Action
          </button>
        </div>
      </div>
      
      {/* Background Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-theme-primary rounded-lg p-4">
          <h4 className="font-semibold text-theme-primary mb-2">Primary Background</h4>
          <p className="text-theme-muted text-sm">Using --background variable</p>
        </div>
        
        <div className="bg-theme-secondary rounded-lg p-4">
          <h4 className="font-semibold text-theme-primary mb-2">Secondary Background</h4>
          <p className="text-theme-muted text-sm">Using --background-1 variable</p>
        </div>
        
        <div className="bg-theme-tertiary rounded-lg p-4">
          <h4 className="font-semibold text-theme-primary mb-2">Tertiary Background</h4>
          <p className="text-theme-muted text-sm">Using --background-2 variable</p>
        </div>
      </div>
      
      {/* Text Examples */}
      <div className="rounded-box">
        <h3 className="text-xl font-semibold text-theme-primary mb-4">Typography Examples</h3>
        <p className="text-theme-primary mb-2">Primary text using --text variable</p>
        <p className="text-theme-muted mb-2">Muted text using --text-muted variable</p>
        <p className="text-theme-accent mb-2">Accent text using --primary variable</p>
        <div className="mt-4 p-4 bg-theme-card rounded-md border-theme-card border">
          <p className="text-theme-primary">This is a themed card with border using CSS variables</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeShowcase;
