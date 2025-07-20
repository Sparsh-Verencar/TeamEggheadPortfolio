"use client"
import { useState, useEffect } from 'react'
import RetroProgressBar from "@/components/RetroProgressBar";
import ShinyText from '@/components/react_bits/ShinyText/ShinyText';


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
            <div className="mb-10 text-white text-5xl">
                <ShinyText
                    text="Team EggHead"
                    disabled={false}
                    speed={3}
                    className="custom-class"
                />
            </div>
            <RetroProgressBar value={progress} className="min-w-[90vw] mx-auto" />
        </div>
    )
}

export default Loading
