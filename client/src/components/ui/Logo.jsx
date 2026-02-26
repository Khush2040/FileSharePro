import React from "react";
import { motion } from "framer-motion";

export default function Logo({ size = 32, className = "" }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            {/* Back Layer - Folder/File */}
            <motion.svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <path
                    d="M20 30 C20 20, 30 10, 40 10 L60 10 C70 10, 80 20, 80 30 L80 70 C80 80, 70 90, 60 90 L40 90 C30 90, 20 80, 20 70 Z"
                    fill="url(#violet-gradient)"
                    fillOpacity="0.4"
                />
                <defs>
                    <linearGradient id="violet-gradient" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a855f7" />
                        <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </motion.svg>

            {/* Front Layer - Floating File */}
            <motion.svg
                width={size * 0.75}
                height={size * 0.75}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <path
                    d="M25 20 C25 10, 35 0, 45 0 L75 0 C85 0, 95 10, 95 20 L95 80 C95 90, 85 100, 75 100 L45 100 C35 100, 25 90, 25 80 Z"
                    fill="url(#blue-gradient)"
                />
                {/* Decorative lines inside the file */}
                <line x1="45" y1="30" x2="75" y2="30" stroke="white" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.5" />
                <line x1="45" y1="50" x2="65" y2="50" stroke="white" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.5" />
                <line x1="45" y1="70" x2="70" y2="70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.5" />

                <defs>
                    <linearGradient id="blue-gradient" x1="25" y1="0" x2="95" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3b82f6" />
                        <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
            </motion.svg>

            {/* Center glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_4px_rgba(255,255,255,0.8)] z-20"></div>
        </div>
    );
}
