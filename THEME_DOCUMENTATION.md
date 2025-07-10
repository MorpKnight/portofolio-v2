# Theme System Documentation

## Overview
This portfolio uses a comprehensive theme system with 8 different themes (4 dark, 4 light) that provide consistent styling across all components.

## Available Themes

### Dark Themes
- `dark-slate` - Vibrant violet accent with deep slate blue backgrounds
- `dark-ocean` - Bright sky blue accent with deep ocean blue backgrounds  
- `dark-forest` - Vibrant lime green accent with deep forest green backgrounds
- `dark-sunset` - Vibrant rose accent with warm dark red-brown backgrounds

### Light Themes
- `light-stone` - Strong blue accent with cool gray backgrounds
- `light-daybreak` - Vibrant sky blue accent with alice blue backgrounds
- `light-blossom` - Vibrant pink/rose accent with light rose backgrounds
- `light-meadow` - Vibrant green accent with light green backgrounds

## CSS Variables

Each theme provides the following CSS variables:

### Background Variables
- `--background` - Primary background color
- `--background-1` - Secondary background color (slightly lighter/darker)
- `--background-2` - Tertiary background color (more contrast)
- `--card-bg` - Card/container background color
- `--hover-bg` - Background color for hover states

### Text Variables
- `--text` - Primary text color
- `--text-muted` - Muted/secondary text color

### Accent Variables
- `--primary` - Primary accent color
- `--secondary` - Secondary accent color
- `--accent` - Tertiary accent color

### Border Variables
- `--card-border` - Border color for cards and containers

### Effect Variables
- `--shadow` - Shadow color with appropriate opacity

## Utility Classes

### Background Classes
```css
.bg-theme-primary    /* Uses --background */
.bg-theme-secondary  /* Uses --background-1 */
.bg-theme-tertiary   /* Uses --background-2 */
.bg-theme-card       /* Uses --card-bg */
```

### Text Classes
```css
.text-theme-primary  /* Uses --text */
.text-theme-muted    /* Uses --text-muted */
.text-theme-accent   /* Uses --primary */
```

### Border Classes
```css
.border-theme-card   /* Uses --card-border */
```

### Rounded Box Classes
```css
.rounded-box         /* Small rounded container */
.rounded-box-lg      /* Large rounded container */
.rounded-box-xl      /* Extra large rounded container */
.rounded-box-hover   /* Add hover effects */
```

### Card Classes
```css
.card-elevated       /* Elevated card with shadow */
```

### Button Classes
```css
.btn-theme-primary   /* Primary button style */
.btn-theme-secondary /* Secondary button style */
```

## Usage Examples

### Basic Rounded Box
```jsx
<div className="rounded-box rounded-box-hover">
  <h3 className="text-theme-primary">Title</h3>
  <p className="text-theme-muted">Content</p>
</div>
```

### Elevated Card
```jsx
<div className="card-elevated rounded-lg p-6">
  <h3 className="text-theme-primary">Card Title</h3>
  <p className="text-theme-muted">Card content</p>
  <button className="btn-theme-primary px-4 py-2 rounded-md">
    Action
  </button>
</div>
```

### Using CSS Variables Directly
```jsx
<div className="bg-[color:var(--card-bg)] border-[color:var(--card-border)] border rounded-lg p-4">
  <p className="text-[color:var(--text)]">Direct variable usage</p>
</div>
```

### Background Combinations
```jsx
<div className="bg-theme-primary">
  <div className="bg-theme-secondary p-4">
    <div className="bg-theme-card rounded-lg p-4">
      <p className="text-theme-primary">Layered backgrounds</p>
    </div>
  </div>
</div>
```

## Best Practices

1. **Use Utility Classes**: Prefer utility classes over direct CSS variable usage for consistency
2. **Combine Classes**: Mix rounded box classes with hover effects for interactive elements
3. **Consistent Spacing**: Use consistent padding and margins across similar elements
4. **Accessibility**: Ensure sufficient color contrast in all themes
5. **Performance**: CSS variables enable efficient theme switching without re-rendering

## Theme Switching

The theme system automatically handles:
- Smooth transitions between themes
- Consistent color application across all components
- Proper contrast ratios for accessibility
- Shadow and hover effect adaptation

## Custom Styling

For custom components, always use CSS variables to ensure theme compatibility:

```css
.custom-component {
  background-color: var(--card-bg);
  color: var(--text);
  border: 1px solid var(--card-border);
  box-shadow: 0 2px 4px var(--shadow);
}

.custom-component:hover {
  background-color: var(--hover-bg);
}
```
