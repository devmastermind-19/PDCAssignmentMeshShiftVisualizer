/**
 * Pure functions to calculate and apply shifts on a 2D mesh grid.
 */

/**
 * Generates a perfectly square grid of size sqrt(p) x sqrt(p).
 * @param {number} p - Total number of nodes (must be perfect square)
 * @returns {Array<Array<Object>>} The initialized 2D grid.
 */
export function generateGrid(p) {
  const n = Math.sqrt(p);
  const grid = [];
  
  for (let r = 0; r < n; r++) {
    const row = [];
    for (let c = 0; c < n; c++) {
      const nodeId = r * n + c;
      row.push({
        id: nodeId,
        data: nodeId // Data initially matches the node's ID
      });
    }
    grid.push(row);
  }
  
  return grid;
}

/**
 * Shifts the data in each row by 'shift' amount.
 * Node i sends data to (i + shift) mod sqrt(p).
 * @param {Array<Array<Object>>} grid - Current 2D grid
 * @param {number} shift - The q_row shift amount
 * @returns {Array<Array<Object>>} A new 2D grid after row shifting
 */
export function rowShift(grid, shift) {
  const n = grid.length;
  const newGrid = [];
  
  for (let r = 0; r < n; r++) {
    const newRow = [];
    for (let c = 0; c < n; c++) {
      // The math trick slightly differs to avoid negative modulo in JS
      const srcC = ((c - shift) % n + n) % n;
      newRow.push({
        id: grid[r][c].id,
        data: grid[r][srcC].data
      });
    }
    newGrid.push(newRow);
  }
  
  return newGrid;
}

/**
 * Shifts the data in each column by 'shift' amount.
 * Node (r,c) sends data to (r + shift mod n, c).
 * @param {Array<Array<Object>>} grid - Current 2D grid
 * @param {number} shift - The q_col shift amount
 * @returns {Array<Array<Object>>} A new 2D grid after column shifting
 */
export function columnShift(grid, shift) {
  const n = grid.length;
  const newGrid = [];
  
  for (let r = 0; r < n; r++) {
    const newRow = [];
    for (let c = 0; c < n; c++) {
      const srcR = ((r - shift) % n + n) % n;
      newRow.push({
        id: grid[r][c].id,
        data: grid[srcR][c].data
      });
    }
    newGrid.push(newRow);
  }
  
  return newGrid;
}

/**
 * Performs and returns all stages of the 2-stage shift algorithm.
 * @param {number} p - Total nodes
 * @param {number} q - Total shift amount
 * @returns {Object} Object containing intermediate and final states
 */
export function meshShift(p, q) {
  const n = Math.sqrt(p);
  const qRow = q % n;
  const qCol = Math.floor(q / n);
  
  const initialGrid = generateGrid(p);
  const stage1Grid = rowShift(initialGrid, qRow);
  const stage2Grid = columnShift(stage1Grid, qCol);
  
  return {
    qRow,
    qCol,
    initialGrid,
    stage1Grid,
    stage2Grid
  };
}
