"use client"
import { useState, useEffect } from 'react'
import FadingSquare from "@/components/FadingSquare";
import RetroProgressBar from "@/components/RetroProgressBar";


const Loading = () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 80) {
                    return prev + 1;
                } else if (prev < 100) {
                    return prev + 0.3; // 🐌 Super slo-mo
                } else {
                    return 100;
                }
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className='w-screen h-screen bg-gray-950 flex flex-col items-center justify-center'>
            <h1 className='text-white text-6xl'>Team Egghead</h1>
            <RetroProgressBar value={progress} className="w-[90vw]" />
        </div>
    )
}

export default Loading
