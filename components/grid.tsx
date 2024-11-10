'use client'

import React, { useState } from 'react'
import { Card } from "@/components/ui/card"

const GRID_SIZE = 15

type CellState = 'empty' | 'selected' | 'highlighted'

export default function InteractiveGrid() {
    const [gridState, setGridState] = useState<CellState[][]>(
        Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('empty'))
    )

    // Helper function to update cell color
    const updateCell = (row: number, col: number, color: string) => {
        if (typeof window !== 'undefined') { // Check if running on the client
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);
            if (cell) {
                cell.style.backgroundColor = color;
            }
        }
    }

    const handleCellClick = (row: number, col: number) => {
        const newGridState = gridState.map(r => [...r])
        newGridState[row][col] = newGridState[row][col] === 'selected' ? 'empty' : 'selected'
        setGridState(newGridState)
        updateCell(row, col, newGridState[row][col] === 'selected' ? 'blue' : 'transparent')
        console.log(`Clicked cell at row ${row}, column ${col}`)
    }

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

    // change it once starting building the logic
    // Initial red Position
    placePiece(2, 2, '/redDum.png');
    placePiece(3, 2, '/redDum.png');
    placePiece(2, 3, '/redDum.png');
    placePiece(3, 3, '/redDum.png');

    placePiece(2, 11, '/greendum.png');
    placePiece(3, 11, '/greendum.png');
    placePiece(2, 12, '/greendum.png');
    placePiece(3, 12, '/greendum.png');

    placePiece(11, 2, 'yellowDum.png');
    placePiece(12, 2, 'yellowDum.png');
    placePiece(11, 3, 'yellowDum.png');
    placePiece(12, 3, 'yellowDum.png');

    placePiece(11, 11, 'blueDum.png');
    placePiece(12, 11, 'blueDum.png');
    placePiece(11, 12, 'blueDum.png');
    placePiece(12, 12, 'blueDum.png');

    // red box
    for (let i = 0; i < 6; i++) {
        updateCell(0, i, 'red');
        updateCell(5, i, 'red');
        updateCell(i, 0, 'red');
        updateCell(i, 5, 'red');
    }

    //Green box
    for (let i = 9; i < 15; i++) {
        updateCell(0, i, 'green');
        updateCell(5, i, 'green');
        updateCell(i, 0, 'yellow');
        updateCell(i, 5, 'yellow');
    }

    //yellow box
    for (let i = 0; i < 6; i++) {
        updateCell(9, i, 'yellow');
        updateCell(14, i, 'yellow');
        updateCell(i, 9, 'green');
        updateCell(i, 14, 'green');
    }

    updateCell(7, 7, 'orange');

    for (let i = 1; i < 7; i++) {
        updateCell(i, 7, 'green');
        updateCell(7, i, 'red');
    }

    for (let i = 8; i < 14; i++) {
        updateCell(i, 7, 'yellow');
        updateCell(7, i, 'blue');
    }

    updateCell(13, 6, 'yellow');
    updateCell(6, 1, 'red');
    updateCell(1, 8, 'green');
    updateCell(8, 13, 'blue');


    //Blue Box
    for (let i = 9; i < 15; i++) {
        updateCell(9, i, 'blue');
        updateCell(14, i, 'blue');
        updateCell(i, 9, 'blue');
        updateCell(i, 14, 'blue');
    }



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
                    row.map((cellState, colIndex) => {
                        const cellId = `cell-${rowIndex}-${colIndex}`

                        return (
                            <div
                                key={cellId}
                                id={cellId}
                                className={`border border-gray-700 w-full h-full
                                    ${cellState === 'selected' ? 'bg-blue-500' : ''}
                                    ${cellState === 'highlighted' ? 'bg-blue-200' : ''}
                                    transition-colors duration-200
                                `}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                role="button"
                                tabIndex={0}
                            />
                        );
                    })
                )}
            </div>
        </Card>
    )
}
