import { renderControls } from './components/ControlPanel.js';
import { renderGrid, animateRowShift, animateColumnShift } from './components/MeshGrid.js';
import { renderComplexity } from './components/ComplexityPanel.js';
import { meshShift } from './utils/shiftLogic.js';

export function init() {
  const appEl = document.getElementById('app');
  appEl.innerHTML = `
    <div class="header">
      <h1>Mesh Circular Shift Visualizer</h1>
      <p>Visualizing q-shift on a 2D mesh layout using a 2-stage algorithm.</p>
    </div>
    <div class="layout-grid">
      <div class="sidebar">
        <div id="control-panel-container"></div>
        <div id="complexity-panel-container" style="margin-top: 2rem; display: none;"></div>
      </div>
      <div class="main-content">
        <div id="mesh-grid-container"></div>
      </div>
    </div>
  `;

  const controlContainer = document.getElementById('control-panel-container');
  const meshContainer = document.getElementById('mesh-grid-container');
  const complexityContainer = document.getElementById('complexity-panel-container');

  renderControls(controlContainer, (p, q) => runSimulation(p, q, meshContainer, complexityContainer));
  
  // Initialize with default demo configuration
  runSimulation(16, 5, meshContainer, complexityContainer);
}

function runSimulation(p, q, meshContainer, complexityContainer) {
  const shiftData = meshShift(p, q);
  const btn = document.getElementById('btn-run');
  if (btn) {
      btn.disabled = true;
      btn.innerText = 'Running...';
  }
  
  // Render initial generic grid mapping
  renderGrid(meshContainer, shiftData.initialGrid);
  
  // Inject and render analysis components 
  complexityContainer.style.display = 'block';
  renderComplexity(complexityContainer, p, q);

  // Animation Queue Pipeline
  setTimeout(() => {
    animateRowShift(shiftData.initialGrid, shiftData.stage1Grid, shiftData.qRow, () => {
      setTimeout(() => {
        animateColumnShift(shiftData.stage1Grid, shiftData.stage2Grid, shiftData.qCol, () => {
          if (btn) {
              btn.disabled = false;
              btn.innerHTML = '▶ Run Simulation';
          }
        });
      }, 600); // Buffer before stage 2
    });
  }, 600); // Buffer before stage 1
}
