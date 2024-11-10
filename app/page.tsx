"use client";
import GameBoard from "@/components/InteractiveGrid";
import Image from "next/image";
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
