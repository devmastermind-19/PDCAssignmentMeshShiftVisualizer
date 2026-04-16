# 🌐 Mesh Circular Shift Visualizer

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

An interactive, interactive vanilla JavaScript application simulating **circular q-shifts on a 2D mesh layout**. Built without external web frameworks to demonstrate fundamental concepts and utilize modern ES Modules, creating a clean React-like component structure for ultimate maintainability.

---

## ✨ Features

- **Dynamic Mesh Grid**: Interactive rendering of `√p x √p` mesh grids equipped with smooth cascading transition animations.
- **Stage 1 (Row Shift)**: Visually demonstrate data shifting row by row, where elements are offset by `q mod √p`.
- **Stage 2 (Column Shift)**: Watch the columns adjust their data vertically by `floor(q / √p)`, handling wrap-around logic seamlessly.
- **Compensation Stage**: Automatically compensates nodes that loop around a row by shifting them into the subsequent lower row.
- **Complexity Comparison**: Dynamically displays differences in shift steps mapped to a simpler 1D ring architecture, utilizing **Chart.js**.
- **Responsive Layout**: Designed for screens of all sizes, featuring a slick dark mode inspired UI.

## 📂 Project Structure

```
├── public/                 # Static assets and images
├── src/
│   ├── components/         # Modular UI Components
│   │   ├── MeshGrid.js 
│   │   ├── ControlPanel.js
│   │   └── ComplexityPanel.js
│   ├── utils/              # Helper functions & shift logic
│   │   └── shiftLogic.js 
│   ├── index.js            # Main application entry point
│   └── App.js              # Application logic wrapper
├── python/
│   └── shift_logic.py      # Python script validating the algorithm
├── index.html              # Main HTML Document
├── package.json            # Deployment & scripts configuration
├── README.md               # You're reading this!
└── report.md               # Technical report & complexity analysis
```

## 🚀 Getting Started

### Prerequisites

All you need is a modern web browser to run the static application, or a lightweight web server like `Live Server` (VS Code extension) to utilize ES modules locally. Node.js is only used for deployment to cloud platforms.

### Local Installation

1. **Clone the repository** (if hosted via Git):
   ```bash
   git clone <your-repository-url>
   cd mesh-shift-visualizer
   ```
2. **Start a local development server** (ES Modules require your files to be served running over HTTP/HTTPS, not `file://`):
   ```bash
   npx serve .
   ```
   Or use the VS Code extension **Live Server** and open `index.html`.

3. Ensure to open your browser at the provided `http://localhost:<port>` to view the application.

## 📈 The Algorithm Explained

A circular q-shift is notoriously expensive in basic computational forms, taking `O(q)` steps in a 1D Ring Topology.
When mapping elements into a 2D mesh, we decompose the shifts into independent row and column operations:

1. **Horizontal Shift**: By `q mod √p` slots along rows.
2. **Vertical Shift**: By `floor(q / √p)` slots along columns.
3. **Vertical Correction**: Any node that "wrapped around" its row boundary during step 1 falls logically into the _next_ row. A correction `+1` vertical shift acts on these nodes seamlessly!

Resulting theoretical speed-up bounds time complexity to `O(√p)`.

## 📜 Deployment Guide

This app is natively ready to be hosted statically straight from its root via services like Netlify or GitHub Pages.

**Live Demo:** [https://endearing-panda-e6d8b3.netlify.app/](https://endearing-panda-e6d8b3.netlify.app/)

**Option A (Netlify)**
1. Push your code to your GitHub Account.
2. Sign in to your Netlify Dashboard.
3. Click "Add new site" and "Import an existing project".
4. Select the repository and leave settings at defaults to deploy.

**Option B (GitHub Pages)**
1. Go to repository **Settings**.
2. Navigate to **Pages** down the sidemenu.
3. Under **Build and deployment**, select **Source: Deploy from a branch**.
4. Set the branch to `main` and folder to `/ (root)`.
5. Click **Save** and wait for the workflow to generate your URL!

---

*This project was developed for advanced architectural simulation concepts without UI framework overhead.*
