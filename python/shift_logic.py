import math

def generate_grid(p):
    """Generates a perfectly square grid of size sqrt(p) x sqrt(p)."""
    n = int(math.sqrt(p))
    grid = []
    for i in range(n):
        row = []
        for j in range(n):
            node_id = i * n + j
            # Each node stores its own un-shifted node_id as data initially
            row.append({'id': node_id, 'data': node_id})
        grid.append(row)
    return grid

def row_shift(grid, shift):
    """
    Shifts the data in each row by 'shift' amount.
    Node i sends data to i + shift mod sqrt(p).
    This means the data received at pos j comes from pos (j - shift) mod sqrt(p).
    """
    n = len(grid)
    new_grid = [[None for _ in range(n)] for _ in range(n)]
    
    for r in range(n):
        for c in range(n):
            src_c = (c - shift) % n
            new_grid[r][c] = {
                'id': grid[r][c]['id'],
                'data': grid[r][src_c]['data']
            }
            
    return new_grid

def column_shift(grid, shift):
    """
    Shifts the data in each column by 'shift' amount.
    Node (r, c) sends data to (r + shift mod n, c).
    """
    n = len(grid)
    new_grid = [[None for _ in range(n)] for _ in range(n)]
    
    for r in range(n):
        for c in range(n):
            src_r = (r - shift) % n
            new_grid[r][c] = {
                'id': grid[r][c]['id'],
                'data': grid[src_r][c]['data']
            }
            
    return new_grid

def mesh_shift(p, q):
    """
    Performs the full 2-stage shift algorithm.
    Stage 1: Row shift by (q mod sqrt(p))
    Stage 2: Column shift by floor(q / sqrt(p))
    """
    n = int(math.sqrt(p))
    
    q_row = q % n
    q_col = q // n
    
    print(f"Mesh size: {n}x{n} (p={p})")
    print(f"Target shift: {q}")
    print(f"Stage 1 (Row Shift): {q_row}")
    print(f"Stage 2 (Col Shift): {q_col}\n")
    
    grid = generate_grid(p)
    print("Initial Grid:")
    for row in grid:
        print([node['data'] for node in row])
        
    grid_stage1 = row_shift(grid, q_row)
    print("\nAfter Stage 1 (Row Shift):")
    for row in grid_stage1:
        print([node['data'] for node in row])
        
    grid_stage2 = column_shift(grid_stage1, q_col)
    print("\nAfter Stage 2 (Column Shift):")
    for row in grid_stage2:
        print([node['data'] for node in row])
        
    # Verify final positions
    correct = True
    for r in range(n):
        for c in range(n):
            node_id = r * n + c
            expected_data = (node_id - q) % p
            if grid_stage2[r][c]['data'] != expected_data:
                correct = False
                print(f"Mismatch at node {node_id}: expected {expected_data}, got {grid_stage2[r][c]['data']}")
                
    if correct:
        print("\nVerification Passed! All nodes have the correct data.")
    else:
        print("\nVerification Failed.")
        
    return grid_stage2

if __name__ == "__main__":
    # Test case: p=16, q=5
    # (Row shift = 5 mod 4 = 1)
    # (Col shift = 5 // 4 = 1)
    mesh_shift(16, 5)
