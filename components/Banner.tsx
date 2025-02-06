'use client';

import { useState } from 'react';
import Image from "next/image";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./Sidebar";

export default function Banner(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const handleMenuClick = () => {
        setIsSidebarOpen(true);
    }

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
      };
    

    
    return (
        <div className="w-full h-20 bg-gradient-to-tr from-[#12999f] to-[#47b2b7] flex items-center px-6 py-4 gap-4 shadow-lg">
            <button onClick={handleMenuClick}>
                <MenuIcon sx={{ fontSize: 30, color: 'white' }} />
            </button>

            <Sidebar open={isSidebarOpen} onClose={handleSidebarClose}/>

            <Image
                src="/favicon_white.png"
                alt="ShelterConnect Logo"
                width={60}
                height={60}
                className="w-[60px] h-auto max-w-[80px] object-contain"
                priority
            />

            <h1 className="text-white text-2xl font-semibold">ShelterConnect</h1>
        </div>
    );
}
