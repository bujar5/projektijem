import { motion } from "framer-motion";
import React from "react"; // Explicitly import React

interface Props {
    icon: React.ElementType; // Better type for icon components
    title: string;
    description: string;
    className?: string; // Added className prop for external styling
}

const Card = (props: Props) => {
    const { icon: Icon, title, description, className } = props;

    return (
        <motion.div
            // Applied passed className, along with default dark theme styles
            className={`bg-[#2c2c2c] p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 border border-[#FFD700]/10 ${className || ''}`}
            whileHover={{ scale: 1.05 }}
            // Initial/Animate/Transition could be added here if this card has its own entry animation
        >
            {/* Icon styling matching the theme */}
            {Icon && <Icon className="w-14 h-14 text-[#FFD700] mb-5 animate-pulse" />}
            <div className="p-0"> {/* Adjusted padding if outer div has it */}
                {/* Text styling matching the theme */}
                <h3 className="text-2xl font-bold mb-3 text-white tracking-wide">{title}</h3>
                <p className="text-gray-300 leading-relaxed text-base">{description}</p>
            </div>
        </motion.div>
    );
};

export default Card;