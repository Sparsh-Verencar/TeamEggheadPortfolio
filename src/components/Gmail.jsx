"use client";
import React from "react";
import { motion } from "framer-motion";

const Gmail = () => {
    return (
        <motion.div
            className="relative w-[7vw] h-[11vh] bg-white rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            onClick={() =>
                window.open(
                    "https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com&su=Hello&body=This%20is%20a%20test",
                    "_blank"
                )
            }
        >
            <motion.div
                className="absolute w-[7vw] h-[11vh] border-8 border-amber-900"
            />
            <motion.div
                className="-left-9 -top-15 absolute w-[7vw] h-[11vh] border-[12px] border-amber-900 origin-bottom rotate-45"
                whileHover={{ y: -4, x: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </motion.div>
    );
};

export default Gmail;
