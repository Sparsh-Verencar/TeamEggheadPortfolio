"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import TargetCursor from "./react_bits/Animations/TargetCursor/TargetCursor";

const Gmail = () => {
    return (
        <Tooltip>
            <TargetCursor
                spinDuration={2}
                hideDefaultCursor={true}
            />
            <TooltipTrigger>
                <motion.div
                    className="relative  w-26 h-20 bg-white rounded-2xl overflow-hidden cursor-target"
                    whileHover={{ scale: 1.05 }}
                    onClick={() =>
                        window.open(
                            "https://mail.google.com/mail/?view=cm&fs=1&to=teamegghead007@gmail.com&su=Enquiry&body=Message",
                            "_blank"
                        )
                    }
                >
                    <motion.div
                        className="absolute  w-26 h-20 border-8 border-amber-900"
                    />
                    <motion.div
                        className="-left-9 -top-15 absolute  w-26 h-20 border-[12px] border-amber-900 origin-bottom rotate-45"
                        whileHover={{ y: -4, x: -2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                </motion.div>
                <h6 className="text-white">Gmail</h6>
            </TooltipTrigger>
            <TooltipContent>
                <p>Send us an email</p>
            </TooltipContent>
        </Tooltip>

    );
};

export default Gmail;
