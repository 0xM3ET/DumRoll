'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

type Player = {
    id: string
    color: string
    pieces: number[]
    position: number[]
}

type GameState = {
    players: Player[]
    currentPlayer: number
    diceValue: number
    isRolling: boolean
    winner: string | null
}

type GameAction =
    | { type: 'ROLL_DICE'; payload: number }
    | { type: 'MOVE_PIECE'; payload: { playerIndex: number; pieceIndex: number; newPosition: number } }
    | { type: 'NEXT_TURN' }
    | { type: 'SET_WINNER'; payload: string }

const initialState: GameState = {
    players: [
        { id: '1', color: 'red', pieces: [0, 1, 2, 3], position: [0, 0, 0, 0] },
        { id: '2', color: 'green', pieces: [0, 1, 2, 3], position: [0, 0, 0, 0] },
        { id: '3', color: 'yellow', pieces: [0, 1, 2, 3], position: [0, 0, 0, 0] },
        { id: '4', color: 'blue', pieces: [0, 1, 2, 3], position: [0, 0, 0, 0] }
    ],
    currentPlayer: 0,
    diceValue: 0,
    isRolling: false,
    winner: null
}

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'ROLL_DICE':
            return {
                ...state,
                diceValue: action.payload,
                isRolling: false
            }
        case 'MOVE_PIECE':
            const newPlayers = [...state.players]
            newPlayers[action.payload.playerIndex].position[action.payload.pieceIndex] = action.payload.newPosition
            return {
                ...state,
                players: newPlayers
            }
        case 'NEXT_TURN':
            return {
                ...state,
                currentPlayer: (state.currentPlayer + 1) % 4,
                diceValue: 0
            }
        case 'SET_WINNER':
            return {
                ...state,
                winner: action.payload
            }
        default:
            return state
    }
}

const GameContext = createContext<{
    state: GameState
    dispatch: React.Dispatch<GameAction>
} | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialState)

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    const context = useContext(GameContext)
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context
}