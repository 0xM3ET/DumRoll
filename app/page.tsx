"use client";
import './globals.css'
import { diceRoll } from '@/utils/ao'
import Image from 'next/image';
import InteractiveGrid from '@/components/grid';


export default function Home() {


  return (
    <main className="flex flex-col items-center justify-center py-6">

      <InteractiveGrid />
      <div className='flex items-center py-6'>
        <Image src="/greenDum.png" alt="Green DumDum" height='40' width='40' />

        <button onClick={diceRoll} className="bg-slate-900 hover:bg-slate-700 rounded-lg text-white px-6 py-3 text-lg font-semibold transition duration-300 ease-in-out flex items-center">
          Roll
        </button>


      </div>

    </main >
  );
}
