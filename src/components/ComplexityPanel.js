let chartInstance = null;

export function renderComplexity(container, p, q) {
  const n = Math.sqrt(p);
  const rowShift = q % n;
  const colShift = Math.floor(q / n);
  const meshSteps = rowShift + colShift;
  const ringSteps = Math.min(q, p - q);

  container.innerHTML = `
    <div class="panel">
      <h2>Routing Complexity</h2>
      <div class="chart-container">
        <canvas id="complexity-chart"></canvas>
      </div>
      <div class="stats-grid">
        <div class="stat-box">
          <span class="stat-label">Mesh Steps</span>
          <span class="stat-value">${meshSteps}</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Ring Steps</span>
          <span class="stat-value">${ringSteps}</span>
        </div>
      </div>
    </div>
  `;

  // Provide time for the canvas to be inserted in the DOM
  setTimeout(() => {
      const canvas = document.getElementById('complexity-chart');
      if (!canvas) return; // Guard clause in case it was unmounted quickly
      const ctx = canvas.getContext('2d');

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mesh', '1D Ring'],
          datasets: [{
            label: 'Routing Steps',
            data: [meshSteps, ringSteps],
            backgroundColor: [
              'rgba(139, 92, 246, 0.8)',
              'rgba(59, 130, 246, 0.8)'
            ],
            borderColor: [
              'rgba(139, 92, 246, 1)',
              'rgba(59, 130, 246, 1)'
            ],
            borderWidth: 1,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#94a3b8',
                stepSize: 1
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                display: false,
                drawBorder: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#fff',
                bodyColor: '#cbd5e1',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1
            }
          }
        }
      });
  }, 0);
}
