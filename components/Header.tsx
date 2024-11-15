"use client";
import Image from "next/image";
import { Sour_Gummy } from 'next/font/google';
import { connectToArConnect, disconnectFromArConnect } from '@/utils/arconnect';
import { initializeAO, resetAOConnection } from '../utils/ao';
import { useState } from "react";


const sourGummy = Sour_Gummy({
    subsets: ['latin'],
    weight: '400', // Irish Grover typically comes in regular weight
});
export default function Home() {

    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);     // @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null);    // @typescript-eslint/no-unused-vars
    //const [gameEnded, setGameEnded] = useState<boolean>(false);
    //const [showInstructions, setShowInstructions] = useState<boolean>(false);
    console.log(loading, error);
    // Format wallet address for display
    // const formatAddress = (addr: string) => {
    //     if (!addr) return '';
    //     return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    // };

    async function handleConnect() {
        try {
            const address = await connectToArConnect();
            setWalletAddress(address);
            setLoading(true);
            try {
                console.log(address);
                await initializeAO(address);
            } catch (err) {
                console.error('Failed to Initialize AO: ', err);
                setError(`Failed to connect: ${err instanceof Error ? err.message : 'Unknown error Occured'}`);
            }

        } catch (err) {
            console.error('Failed to connect: ', err);
            setError(`Failed to connect: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
        } finally {
            setLoading(false);
        }
    }

    async function handleDisconnect() {
        try {
            await disconnectFromArConnect();
            resetAOConnection();
            setWalletAddress(null);
            setError(null);
        } catch (err) {
            console.error('Failed to Disconnect: ', err);
            setError('Failed to Disconnect. Please Try again.');
        }
    }

    return (
        <nav className="flex items-center justify-between px-28 py-2  overflow-hidden">
            <Image src={"/DumRoll.png"} alt={"ludumix_logo"} width={260} height={180} />

            <div className={sourGummy.className}>
                <h1 className="font-bold text-6xl">
                    Play Ludo On AO!
                </h1>
            </div>
            {/*Connect Disconnect button */}
            <div className="flex gap-4">
                <button
                    onClick={walletAddress ? handleDisconnect : handleConnect}
                    className={`rounded-lg text-white px-6 py-3 text-lg font-semibold transition duration-300 ease-in-out ${walletAddress ? "bg-red-700 hover:bg-red-500" : "bg-slate-900 hover:bg-slate-700"
                        }`}
                >
                    {walletAddress ? `Disconnect` : "Connect Wallet"}
                </button>
            </div>


        </nav>
    );
}
