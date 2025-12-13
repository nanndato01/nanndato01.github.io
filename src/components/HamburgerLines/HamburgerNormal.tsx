import { motion, AnimatePresence } from "framer-motion";

interface Props {
    open: boolean;
    size: {width: number, height: number};
}

export default function HamburgerNormal({open, size}: Props) {
    const centerDiff = 30;
    const centerY = size.height / 2;

    return (
        <div className="relative">
            <motion.span
                style={{top: -2}}
                animate={open ? {opacity: 0} : {opacity: 1}}
                transition={{duration: 0.3}}
                className="absolute w-full block h-1 bg-gray-500"
            />
            <motion.span
                style={{top: centerY - 2}}
                animate={open ? {opacity: 0} : {opacity: 1}}
                transition={{duration: 0.3}}
                className="absolute w-full block h-1 bg-gray-500"
            />
            <motion.span
                style={{top: size.height - 2}}
                animate={open ? {opacity: 0} : {opacity: 1}}
                transition={{duration: 0.3}}
                className="absolute w-full block h-1 bg-gray-500"
            />
            <AnimatePresence>
                {open && <motion.span
                    style={{top: -(centerDiff - centerY + 2), left: -centerDiff}}
                    initial={{rotate: 45, opacity: 0, x: 0, y: 0}}
                    animate={{rotate: 45, opacity: 1, x: centerDiff, y: centerDiff}}
                    exit={{rotate: 45, opacity: 0, x: 0, y: 0}}
                    transition={{duration: 0.3}}
                    className="absolute w-full block h-1 bg-gray-500"
                />}
                {open && <motion.span
                    style={{top: -(centerDiff - centerY + 2), left: centerDiff}}
                    initial={{rotate: -45, opacity: 0, x: 0, y: 0}}
                    animate={{rotate: -45, opacity: 1, x: -centerDiff, y: centerDiff}}
                    exit={{rotate: -45, opacity: 0, x: 0, y: 0}}
                    transition={{duration: 0.3}}
                    className="absolute w-full block h-1 bg-gray-500"
                />}
                {open && <motion.span
                    style={{top: centerDiff + centerY - 2, left: centerDiff}}
                    initial={{rotate: 45, opacity: 0, x: 0, y: 0}}
                    animate={{rotate: 45, opacity: 1, x: -centerDiff, y: -centerDiff}}
                    exit={{rotate: 45, opacity: 0, x: 0, y: 0}}
                    transition={{duration: 0.3}}
                    className="absolute w-full block h-1 bg-gray-500"
                />}
                {open && <motion.span
                    style={{top: centerDiff + centerY - 2, left: -centerDiff}}
                    initial={{rotate: -45, opacity: 0, x: 0, y: 0}}
                    animate={{rotate: -45, opacity: 1, x: centerDiff, y: -centerDiff}}
                    exit={{rotate: -45, opacity: 0, x: 0, y: 0}}
                    transition={{duration: 0.3}}
                    className="absolute w-full block h-1 bg-gray-500"
                />}
            </AnimatePresence>
        </div>
    );
}