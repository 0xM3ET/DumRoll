"use client";
import './globals.css'
import { useState } from 'react';
import Image from 'next/image';
import { diceRoll, moveYellowPiece } from '@/utils/ao'
import InteractiveGrid from '@/components/grid';

//import { useLudoGameContext } from "@/context/GameContext";
//import LandingPage from "@/components/LandingPage"; // Import your LandingPage component
//import WaitingRoom from "@/components/WaitingRoom"; // Import your WaitingRoom component

export default function Home() {

  const [dice, setDice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const [yellowPosition, setYellowPosition] = useState<{ row: number; col: number }>({ row: 13, col: 6 });

  async function diceRollClick() {
    setLoading(true);
    try {
      const diceval = (await diceRoll()) as unknown as number; // Cast the result to a number
      if (typeof diceval === 'number') {
        setDice(diceval);
        console.log(diceval, "Inside Page");
      } else {
        console.error("Invalid dice value:", diceval);
      }
    } catch (error) {
      console.error("Error rolling dice:", error);
    } finally {
      setLoading(false);
    }
  }

  // Function to handle yellow piece movement click
  async function moveYellowPieceClick() {
    setLoading(true);
    try {
      const newPosition = await moveYellowPiece();
      if (newPosition) {
        setYellowPosition(newPosition);
        console.log(`Yellow piece moved to Row: ${newPosition.row}, Col: ${newPosition.col}`);
        console.log(`yellow positon : ${yellowPosition}`)
      } else {
        console.error("Failed to get the new position of the yellow piece.");
      }
    } catch (error) {
      console.error("Error moving yellow piece:", error);
    } finally {
      setLoading(false);
    }
  }



  return (
    <main className="flex flex-col items-center justify-center py-6">
      <InteractiveGrid />
      <div className='flex items-center py-6 bg-opacity-30 bg-slate-500 mt-4 rounded-lg px-4'>
        <Image src="/yellowDum.png" alt="Green DumDum" height='40' width='40' />
        <p className='flex text-3xl px-8 py-1 font-semibold '>{dice}</p>
        <button
          onClick={diceRollClick}
          className={`bg-slate-900 hover:bg-slate-700 rounded-lg text-white px-6 py-3 text-lg font-semibold transition duration-300 ease-in-out flex items-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Rolling...' : 'Roll'} {/* Show loading text */}
        </button>
        <button
          onClick={moveYellowPieceClick}
          className={`ml-4 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-white px-6 py-3 text-lg font-semibold transition duration-300 ease-in-out flex items-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Moving...' : 'Move Yellow Piece'}
        </button>
      </div>



    </main>
  );
}
