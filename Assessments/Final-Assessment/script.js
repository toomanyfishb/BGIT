/* This is the main function that is used to solve the Sudoku puzzle.
 It takes a 9x9 Sudoku board represented as a 2D array (board). It calls the solve(board) function,
  which attempts to solve the puzzle. 
If the puzzle is solvable, it returns the solved board. Otherwise, it returns "No solution exists". */

function solveSudoku(board) {
    if (solve(board)) {
        return board;
    } else {
        return "No solution exists";
    }
}
/* solve(board) is a recursive function that attempts to solve the Sudoku puzzle using backtracking. 
It starts by finding an empty cell using the findEmptyCell(board) function. 
If no empty cell is found, it means the puzzle is solved, and it returns true. */

function solve(board) {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        return true; // Puzzle solved
    }
    
    const [row, col] = emptyCell;
    
    for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) {
                return true;
            }
            // If the number doesn't lead to a solution, backtrack
            board[row][col] = 0;
        }
    }
    
    return false; // No valid number found, backtrack
}

/* findEmptyCell(board): This iterates through the Sudoku board to find an empty cell (0).
 If an empty cell is found, it returns the row and column indices of that cell. 
 If no empty cell is found, it returns null. */

function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null; // No empty cell found
}

/* isValidMove(board, row, col, num): This function checks whether placing a number (num)
 in a specific cell (row, col) of the Sudoku board (board) is valid. 
 It checks if the number is already present in the same row, column, or 3x3 subgrid. 
 If placing the number is valid, it returns true; otherwise, it returns false. */

function isValidMove(board, row, col, num) {
    // Check if the number is already in the row or column
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    // Check if the number is already in the 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true; // If the number is not found in the row, column, or subgrid
}
// Sample Sudoku puzzle (0 represents empty cells)
const board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

console.log("Solving Sudoku puzzle...");
console.log(solveSudoku(board));

if (typeof board === "string") {
    console.log(board); // "No solution exists"
} else {
    console.log("Sudoku puzzle solved:");
    console.log(board);
}

