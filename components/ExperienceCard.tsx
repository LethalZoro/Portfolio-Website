"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Experience } from "../typings";

type Props = { experience: Experience };

export default function ExperienceCard({ experience }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = () => {
    if (!isClient || typeof window === 'undefined') return;
    
    if (experience?.company === 'Salik Labs') {
      window.open('https://www.saliklabs.com/', '_blank');
    } else if (experience?.company === 'AI Data House (SMC-PVT) LTD') {
      window.open('https://aidatahouse.com/', '_blank');
    }
    else if (experience?.company === 'Robotics and Machine Intelligence (ROMI) Lab') {
      window.open('https://romi.seecs.nust.edu.pk/', '_blank');
    }
    else if (experience?.company === 'Deep Learning Lab, National Centre of Artificial Intelligence (NCAI)') {
      window.open('https://tukl.seecs.nust.edu.pk/', '_blank');
    }
  };

  // Ensure consistent rendering for clickable companies
  const isClickableCompany = experience?.company === 'Salik Labs' || experience?.company === 'AI Data House (SMC-PVT) LTD' || experience?.company === 'Robotics and Machine Intelligence (ROMI) Lab' || experience?.company === 'Deep Learning Lab, National Centre of Artificial Intelligence (NCAI)';

  return (
    <div 
      className={`flex drop-shadow-xl flex-col rounded-3xl items-center space-y-0 flex-shrink-0 w-72 md:w-[600px] xl:w-[700px] snap-center bg-white dark:bg-gray-800 bg-gradient-to-tr from-white dark:from-gray-800 to-darkGreen/20 dark:to-darkerGreen/30 p-5 md:p10 hover:opacity-100 opacity-100 transition-all duration-300 hover:scale-105 transform m-4 ${isClickableCompany ? 'cursor-pointer' : ''}`}
      onClick={isClickableCompany ? handleCardClick : undefined}
    >
      <motion.img
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="invisible h-0 w-0 rounded-full mb-0 object-cover object-center"
        src={
          experience?.companyImage?.asset?._ref || "/placeholder-company.png"
        }
        alt="Company Logo"
      />
      <div className="w-full px-2 md:px-5">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h4 className="text-lg md:text-3xl font-light text-black dark:text-white">
              {experience?.jobTitle}
            </h4>
            <div className="font-bold text-md md:text-2xl mt-1 text-lightGreen dark:text-lightGreen">
              <span>{experience?.company}</span>
            </div>
            <div className="flex space-x-2 my-2">
              {experience?.technologies?.map((technology) => (
                <img
                  key={technology._id}
                  className="h-10 w-10 rounded-full object-cover"
                  src={technology?.image?.asset?._ref || "/placeholder-tech.png"}
                  alt="Technology"
                />
              )) || []}
            </div>
          </div>
          <motion.img
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="h-20 w-20 md:h-24 md:w-24 xl:h-28 xl:w-28 rounded-full ml-4 object-cover object-center flex-shrink-0"
            src={
              experience?.companyImage?.asset?._ref || "/placeholder-company.png"
            }
            alt="Company Logo"
          />
        </div>
        <p className="uppercase py-2 md:py-5 text-gray-500 dark:text-gray-400 text-sm md:text-lg">
          {experience?.dateStarted} -{" "}
          {experience.isCurrentlyWorkingHere
            ? "Present"
            : experience?.dateEnded}
        </p>
      </div>
      <ul className="px-2 md:px-5 list-disc text-black dark:text-gray-200 space-y-2 pr-3 text-justify ml-0 text-sm md:text-lg pl-4 h-34 md:h-44 overflow-y-scroll scrollbar scrollbar-track-gray-200 dark:scrollbar-track-gray-600 scrollbar-thumb-darkGreen/80 dark:scrollbar-thumb-darkerGreen/80">
        {experience?.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
