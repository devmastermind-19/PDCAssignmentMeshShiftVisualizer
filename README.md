# Mesh Circular Shift Visualizer

A vanilla JavaScript application simulating circular q-shifts on a 2D mesh layout. Built without external frameworks utilizing ES Modules for a clean React-like component structure.

## Features
- **Mesh Grid**: Interactive rendering of √p x √p mesh grids with shifting animations.
- **Stage 1 (Row Shift)**: Visualizes data shifting row by row given `q mod √p`.
- **Stage 2 (Column Shift)**: Visualizes vertical data moving given `floor(q / √p)`.
- **Complexity Comparison**: Dynamically displays differences in shift steps mapped to a simpler 1D ring architecture, utilizing Chart.js.
