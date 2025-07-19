import React from 'react';

const Capacitor = () => {
    return (
        <div className="flex flex-col items-center gap-5">
            {/* Body of the capacitor */}
            <div className="absolute w-[2vw] h-[7vh] bg-gray-700 rounded-t-full rounded-b-full shadow-md">
                <div className="relative top-0 w-[2vw] h-[4vh] bg-gray-400 rounded-full  shadow-md" />
                <div className="relative -top-5 w-[2vw] h-[4vh] border-2 border-gray-400 rounded-full  shadow-md" />
                <div className="relative -top-10 w-[2vw] h-[4vh] border-2 border-gray-400 rounded-full  shadow-md" />
            </div>

            {/* Pins (legs) */}
            <div className="flex gap-[0.5vw] mt-1">
                <div className="w-[0.2vw] h-[1vh] bg-gray-600 rounded" />
                <div className="w-[0.2vw] h-[1vh] bg-gray-600 rounded" />
            </div>
        </div>
    );
};

export default Capacitor;
