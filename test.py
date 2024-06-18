import numpy as np

def create_non_overlapping_paths():
    # Initialize the grid with zeros
    grid = np.zeros((4, 5), dtype=int)

    # Define the coordinates for each pair
    pairs = {
        1: [(2, 4), (3, 1)],
        2: [(2, 2), (3, 0)],
        3: [(0, 4), (2, 3)],
        4: [(0, 0), (1, 2)]
    }

    # Manually place the numbers
    for num, coords in pairs.items():
        for x, y in coords:
            grid[x][y] = num

    # Define the paths
    paths = {
        1: [(2, 4), (2, 3), (3, 2), (3, 1)],
        2: [(2, 2), (2, 1), (2, 0), (3, 0)],
        3: [(0, 4), (1, 4), (2, 4), (2, 3)],
        4: [(0, 0), (0, 1), (1, 1), (1, 2)]
    }

    # Draw the paths on the grid
    for num, path in paths.items():
        for x, y in path:
            grid[x][y] = num

    return grid

grid = create_non_overlapping_paths()
print(grid)