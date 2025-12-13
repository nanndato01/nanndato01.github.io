import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


import type { Navitem } from "../types/navitem";
import HamburgerNormal from "./HamburgerLines/HamburgerNormal";

interface HamburgerProps {
    NavLists: Navitem[];
}

export default function HamburgerMenu({ NavLists }: HamburgerProps) {
    const menuRef = useRef<HTMLButtonElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if(!menuRef.current)return;
        const rect = menuRef.current.getBoundingClientRect();
        setSize({ width: rect.width, height: rect.height });
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <div className="px-2">
            <button
            ref={menuRef}
            className="relative md:hidden flex flex-col justify-between w-8 h-6 z-50"
            onClick={() => setOpen(!open)}
            >
                <HamburgerNormal open={open} size={size}/>
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40 md:hidden"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.3}}
                            onClick={() => setOpen(false)}
                        />
                        <motion.nav className="fixed top-0 right-0 h-screen w-64 bg-white border-l border-gray-400 p-6 pt-[70px] z-45 md:hidden"
                            initial={{x: 300, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            exit={{x: 300, opacity: 0}}
                            transition={{duration: 0.3, ease: "easeOut"}}
                        >
                            <ul className="list-none p-0 m-0">
                                {NavLists.map(item => (
                                    <li key={item.title} className="text-xl capitalize border-b border-s-gray-400 mb-3 last:mb-0">
                                        <Link to={item.link} className="no-underline text-inherit">{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}