function solveSudoku(board) {
    if (solve(board)) {
        return board;
    } else {
        return "No solution exists";
    }
}

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