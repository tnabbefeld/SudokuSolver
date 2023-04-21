def find_empty_location(grid, l):
    for row in range(9):
        for col in range(9):
            if(grid[row][col] == 0):
                l[0] = row
                l[1] = col
                return True
    return False

def used_in_row(grid, row, num):
    for col in range(9):
        if(grid[row][col] == num):
            return True
    return False

def used_in_col(grid, col, num):
    for row in range(9):
        if(grid[row][col] == num):
            return True
    return False

def used_in_box(grid, row, col, num):
    for i in range(3):
        for j in range(3):
            if(grid[i + (row - row % 3)][j + (col - col % 3)] == num):
                return True
    return False
               
def location_is_safe(grid, row, col, num):
    return (not used_in_row(grid, row, num) and
            not used_in_col(grid, col, num) and
            not used_in_box(grid, row, col, num))

def solve_sudoku(grid):
    l = [0, 0]

    if(not find_empty_location(grid, l)):
        return True
    
    row = l[0]
    col = l[1]
    
    for num in range(1, 10):
        if(location_is_safe(grid, row, col, num)):
            
            grid[row][col] = num
            
            if(solve_sudoku(grid)):
                return True
            
            grid[row][col] = 0
            
    return False