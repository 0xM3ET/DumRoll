"use client";
import React, { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"


const GRID_SIZE = 15

type CellState = {
    color: 'empty' | 'selected' | 'red' | 'green' | 'yellow' | 'blue' | 'orange';
    piece: 'none' | 'redPiece' | 'greenPiece' | 'yellowPiece' | 'bluePiece';
};



// Define initial grid state with all cells as 'empty'
const initializeGridState = (): CellState[][] => {
    // Initialize grid with empty cells
    const grid: CellState[][] = Array(GRID_SIZE)
        .fill(null)
        .map(() =>
            Array(GRID_SIZE).fill({ color: 'empty', piece: 'none' })
        );

    for (let i = 0; i < 6; i++) {
        grid[0][i].color = 'red';
        grid[5][i].color = 'red';
        grid[i][0].color = 'red';
        grid[i][5].color = 'red';
    }
    for (let i = 9; i < 15; i++) {
        grid[0][i].color = 'green';
        grid[5][i].color = 'green';
        grid[i][5].color = 'yellow';
        grid[i][0].color = 'yellow';
    }
    for (let i = 0; i < 6; i++) {
        grid[9][i].color = 'yellow';
        grid[14][i].color = 'yellow';
        grid[i][9].color = 'green';
        grid[i][14].color = 'green';
    }
    for (let i = 9; i < 15; i++) {
        grid[9][i].color = 'blue';
        grid[14][i].color = 'blue';
        grid[i][14].color = 'blue';
        grid[i][9].color = 'blue';
    }
    for (let i = 1; i < 7; i++) {
        grid[i][7].color = 'green';
        grid[7][i].color = 'red';
    }
    for (let i = 8; i < 14; i++) {
        grid[i][7].color = 'yellow';
        grid[7][i].color = 'blue';
    }
    grid[13][6].color = 'yellow';
    grid[6][1].color = 'red';
    grid[1][8].color = 'green';
    grid[8][13].color = 'blue';
    // Set central safe zone
    grid[7][7].color = 'orange';
    return grid;
};


export default function GameBoard() {
    const [gridState, setGridState] = useState<CellState[][]>(initializeGridState);
    // Initialize pieces (can be customized based on game start)
    useEffect(() => {
        const initialGrid = initializeGridState();
        // Set red pieces in their starting positions
        initialGrid[2][2].piece = 'redPiece';
        initialGrid[3][2].piece = 'redPiece';
        initialGrid[2][3].piece = 'redPiece';
        initialGrid[3][3].piece = 'redPiece';
        // Green pieces
        initialGrid[2][11].piece = 'greenPiece';
        initialGrid[3][11].piece = 'greenPiece';
        initialGrid[2][12].piece = 'greenPiece';
        initialGrid[3][12].piece = 'greenPiece';
        // Yellow pieces
        initialGrid[11][2].piece = 'yellowPiece';
        initialGrid[12][2].piece = 'yellowPiece';
        initialGrid[11][3].piece = 'yellowPiece';
        initialGrid[12][3].piece = 'yellowPiece';
        // Blue pieces
        initialGrid[11][11].piece = 'bluePiece';
        initialGrid[12][11].piece = 'bluePiece';
        initialGrid[11][12].piece = 'bluePiece';
        initialGrid[12][12].piece = 'bluePiece';
        setGridState(initialGrid);
    }, []);


    // Helper function for styling cell colors
    const getCellColorClass = (color: CellState['color']) => {
        switch (color) {
            case 'red': return 'bg-red-700';
            case 'green': return 'bg-green-600';
            case 'yellow': return 'bg-yellow-400';
            case 'blue': return 'bg-blue-600';
            case 'orange': return 'bg-orange-400';
            default: return '';
        }
    };



    // Get piece image source
    const getPieceImageSrc = (pieceType: CellState['piece']): string => {
        switch (pieceType) {
            case 'redPiece': return '/redDum.png';
            case 'greenPiece': return '/greendum.png';
            case 'yellowPiece': return '/yellowDum.png';
            case 'bluePiece': return '/blueDum.png';
            default: return ''; // for 'none'
        }
    };

    // // Update piece positions (can be called after each round)
    // const updatePiecePosition = (index: number, newRow: number, newCol: number) => {
    //     setPieces(prevPieces => {
    //         const updatedPieces = [...prevPieces];
    //         updatedPieces[index] = { ...updatedPieces[index], row: newRow, col: newCol };
    //         return updatedPieces;
    //     });
    // };

    // // Example of modifying piece positions (you can replace this with your own logic)
    // const handleNextRound = () => {
    //     // Move each piece one step forward (example logic)
    //     setPieces(prevPieces => prevPieces.map(piece => {
    //         const newRow = (piece.row + 1) % GRID_SIZE;
    //         const newCol = (piece.col + 1) % GRID_SIZE;
    //         return { ...piece, row: newRow, col: newCol };
    //     }));
    // };


    // const handleCellClick = (row: number, col: number) => {
    //     const newGridState = gridState.map(r => [...r])
    //     newGridState[row][col] = newGridState[row][col] === 'selected' ? 'empty' : 'selected'
    //     setGridState(newGridState)
    //     updateCell(row, col, newGridState[row][col] === 'selected' ? 'blue' : 'transparent')
    //     console.log(`Clicked cell at row ${row}, column ${col}`)
    // }
    // Helper function to place an image piece in a cell
    const placePiece = (row: number, col: number, imageUrl: string) => {
        if (typeof window !== 'undefined') { // Ensure this runs on the client side
            const cellId = `cell-${row}-${col}`
            const cell = document.getElementById(cellId)
            if (cell) {
                cell.style.backgroundImage = `url(${imageUrl})`
                cell.style.backgroundSize = 'cover'  // Adjust this for image size handling
                cell.style.backgroundPosition = 'center'
                cell.style.backgroundRepeat = 'no-repeat'
            }
        }
    }
    // // change it once starting building the logic
    // // Initial red Position
    // placePiece(2, 2, '/redDum.png');
    // placePiece(3, 2, '/redDum.png');
    // placePiece(2, 3, '/redDum.png');
    // placePiece(3, 3, '/redDum.png');
    // placePiece(2, 11, '/greendum.png');
    // placePiece(3, 11, '/greendum.png');
    // placePiece(2, 12, '/greendum.png');
    // placePiece(3, 12, '/greendum.png');
    // placePiece(11, 2, 'yellowDum.png');
    // placePiece(12, 2, 'yellowDum.png');
    // placePiece(11, 3, 'yellowDum.png');
    // placePiece(12, 3, 'yellowDum.png');
    // placePiece(11, 11, 'blueDum.png');
    // placePiece(12, 11, 'blueDum.png');
    // placePiece(11, 12, 'blueDum.png');
    // placePiece(12, 12, 'blueDum.png');


    return (
        <Card className="w-full max-w-2xl aspect-square p-4 ">
            <div
                className="w-full h-full grid"
                style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                }}
            >
                {gridState.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`cell-${rowIndex}-${colIndex}`}
                            className={`relative border border-gray-700 w-full h-full ${getCellColorClass(cell.color)}`}
                        >
                            {cell.piece !== 'none' && (
                                <img
                                    src={`/${cell.piece}.png`}
                                    alt={cell.piece}
                                    className="absolute w-full h-full object-cover"
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
}