export function renderControls(container, onSubmit) {
  container.innerHTML = `
    <div class="panel">
      <h2>Configuration</h2>
      <div class="control-form">
        <div class="input-group">
          <label for="input-p">Number of nodes (p)</label>
          <input type="number" id="input-p" value="16" min="4" max="64" />
          <div id="error-p" class="error-message"></div>
        </div>
        <div class="input-group">
          <label for="input-q">Shift amount (q)</label>
          <input type="number" id="input-q" value="5" min="1" />
          <div id="error-q" class="error-message"></div>
        </div>
        <button id="btn-run" class="btn-primary">
          ▶ Run Simulation
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-run').addEventListener('click', () => {
    const { p, q, valid } = getInputValues();
    if (valid) {
      onSubmit(p, q);
    }
  });
}

export function getInputValues() {
  const pInput = document.getElementById('input-p');
  const qInput = document.getElementById('input-q');
  const errorP = document.getElementById('error-p');
  const errorQ = document.getElementById('error-q');

  errorP.textContent = '';
  errorQ.textContent = '';

  const p = parseInt(pInput.value, 10);
  const q = parseInt(qInput.value, 10);

  let valid = true;

  if (isNaN(p) || p < 4 || p > 64) {
    errorP.textContent = 'p must be between 4 and 64.';
    valid = false;
  } else if (Math.sqrt(p) % 1 !== 0) {
    errorP.textContent = 'p must be a perfect square.';
    valid = false;
  }

  if (isNaN(q) || q < 1 || q >= p) {
    errorQ.textContent = 'q must be between 1 and p-1.';
    valid = false;
  }

  return { p, q, valid };
}
