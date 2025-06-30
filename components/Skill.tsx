import React from "react";
import { motion } from "framer-motion";
import { Skill as mySkill } from "../typings";

type Props = {
  skill: mySkill;
  directionLeft?: boolean;
};

export default function Skill({ skill, directionLeft }: Props) {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        initial={{ x: directionLeft ? -80 : 80, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="rounded-full border-2 border-darkGreen object-cover w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-20 xl:h-20 2xl:w-28 2xl:h-28 filter group-hover:grayscale transition duration-300 ease-in-out"
        src={skill?.image?.asset?._ref || "/placeholder-skill.png"}
        alt={skill?.title || "Skill"}
      />
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white dark:group-hover:bg-gray-800 w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-20 xl:h-20 2xl:w-28 2xl:h-28 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-xs md:text-sm font-bold text-black dark:text-white opacity-100 text-center px-1">
            {skill?.title || "Skill"}
          </p>
        </div>
      </div>
    </div>
  );
}
