export function renderGrid(container, gridState) {
  const n = gridState.length;

  let html = `
    <div class="panel mesh-container">
      <h2>Routing Visualization</h2>
      <div id="mesh-status" class="mesh-status">Ready</div>
      <div id="mesh-grid" class="mesh" style="grid-template-columns: repeat(${n}, auto);">
  `;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const node = gridState[r][c];
      html += `
        <div class="mesh-node" id="node-${node.id}">
          <span class="node-id">${node.id}</span>
          <span class="node-data" id="data-${node.id}">${node.data}</span>
        </div>
      `;
    }
  }

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

export function animateRowShift(currentGrid, newGrid, shift, onComplete) {
  const statusEl = document.getElementById('mesh-status');
  statusEl.innerHTML = `Stage 1: Row Shift by ${shift}`;
  
  if (shift === 0) {
    statusEl.innerHTML = `Stage 1: Row Shift by 0 (Skipping)`;
    setTimeout(() => { if (onComplete) onComplete(); }, 800);
    return;
  }

  const n = currentGrid.length;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      document.getElementById(`node-${currentGrid[r][c].id}`).classList.add('node-active-row');
    }
  }

  setTimeout(() => {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const node = newGrid[r][c];
        const nodeEl = document.getElementById(`node-${node.id}`);
        nodeEl.classList.remove('node-active-row');

        const dataEl = document.getElementById(`data-${node.id}`);
        dataEl.innerText = node.data;
      }
    }
    if (onComplete) onComplete();
  }, 1200);
}

export function animateColumnShift(currentGrid, newGrid, shift, onComplete) {
  const statusEl = document.getElementById('mesh-status');
  statusEl.innerHTML = `Stage 2: Column Shift by ${shift}`;
  
  if (shift === 0) {
    statusEl.innerHTML = `Stage 2: Column Shift by 0 (Skipping)<br />Routing Complete!`;
    setTimeout(() => { if (onComplete) onComplete(); }, 800);
    return;
  }

  const n = currentGrid.length;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      document.getElementById(`node-${currentGrid[r][c].id}`).classList.add('node-active-col');
    }
  }

  setTimeout(() => {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const node = newGrid[r][c];
        const nodeEl = document.getElementById(`node-${node.id}`);
        nodeEl.classList.remove('node-active-col');

        const dataEl = document.getElementById(`data-${node.id}`);
        dataEl.innerText = node.data;
      }
    }
    statusEl.innerHTML = `Routing Complete!`;
    if (onComplete) onComplete();
  }, 1200);
}
