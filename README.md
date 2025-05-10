# Design Decisions for Component Library:

## Component Architecture:
Modular design with clear separation of concerns
TypeScript interfaces for type safety and better DX
CSS-in-CSS for better maintainability
## Design System:
Consistent spacing (8px increments)
Neutral color palette with semantic status colors
Simple transitions for interactive elements
Responsiveness:
## Mobile-first approach
Horizontal scroll for data tables (preserves data readability)
Flexible widths with max-width constraints
## Accessibility:
ARIA attributes for screen readers
Keyboard navigation support
Sufficient color contrast
Performance:
Memoized callbacks
Debounced search input
Minimal re-renders

## How to run: 
1. Download source
2. Inside the directory, run:  npm run dev 

## Testing
1. Run "npm test" in the project directory
