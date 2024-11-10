"use client";
import GameBoard from '@/components/InteractiveGrid';
import './globals.css'
import { diceRoll } from '@/utils/ao'


export default function Home() {


  return (
    <main className="flex items-center justify-center">

      <GameBoard />
      <button onClick={diceRoll}>
        Roll
      </button>

    </main >
  );
}
