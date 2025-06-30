import { motion } from "framer-motion";
import React from "react";
import { Experience } from "../typings";
import ExperienceCard from "./ExperienceCard";

type Props = { experiences: Experience[] };

export default function WorkExperience({ experiences }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen  flex relative  overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-20 md:top-24  uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl">
        Experience
      </h3>

      {/* Experience cards */}
      <div className="w-screen md:w-full h-3/4 md:h-2/3 text-left pb-5 md:pb-10 flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80">
        {experiences
          ?.slice() // make a shallow copy so we don't mutate the original array
          .sort((a, b) => {
            // Static sorting order to avoid hydration issues
            // Define the chronological order of your experiences (most recent first)
            const order = [
              'salik-labs-ai-engineer', // Current - Jun 2025
              'ai-data-house-junior-ai-developer', // Feb 2025 - Apr 2025
              'romi-lab-research-assistant', // Feb 2024 - May 2025 
              'ncai-deep-learning-intern', // Jun 2023 - Feb 2024
            ];
            
            const indexA = order.indexOf(a._id);
            const indexB = order.indexOf(b._id);
            
            // If both experiences are in our defined order, sort by index
            if (indexA !== -1 && indexB !== -1) {
              return indexA - indexB;
            }
            
            // If only one is in the order, prioritize it
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            
            // If neither is in the order, maintain original order
            return 0;
          })
          .map((experience) => (
            <ExperienceCard key={experience._id} experience={experience} />
          ))}
      </div>
    </motion.div>
  );
}
