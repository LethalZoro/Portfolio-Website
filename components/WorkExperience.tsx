"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Experience } from "../typings";
import ExperienceCard from "./ExperienceCard";

type Props = { experiences: Experience[] };

export default function WorkExperience({ experiences }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  // Sort experiences
  const sortedExperiences = experiences?.slice().sort((a, b) => {
    const order = [
      'salik-labs-ai-engineer',
      'ai-data-house-junior-ai-developer',
      'romi-lab-research-assistant',
      'ncai-deep-learning-intern',
    ];
    
    const indexA = order.indexOf(a._id);
    const indexB = order.indexOf(b._id);
    
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  }) || [];

  // Auto-slide effect - move one card at a time
  useEffect(() => {
    if (sortedExperiences.length > 0 && !isAutoScrollPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          // Stop at the last card instead of looping
          if (prev >= sortedExperiences.length - 1) {
            return 0; // Reset to beginning
          }
          return prev + 1;
        });
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval);
    }
  }, [sortedExperiences.length, isAutoScrollPaused]);

  // Resume auto-scroll after user interaction timeout
  useEffect(() => {
    if (isAutoScrollPaused) {
      const timeout = setTimeout(() => {
        setIsAutoScrollPaused(false);
      }, 5000); // Resume after 5 seconds of no interaction

      return () => clearTimeout(timeout);
    }
  }, [isAutoScrollPaused]);

  const nextSlide = () => {
    setIsAutoScrollPaused(true);
    setCurrentIndex((prev) => {
      if (prev >= sortedExperiences.length - 1) {
        return 0; // Reset to beginning
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setIsAutoScrollPaused(true);
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return sortedExperiences.length - 1; // Go to last card
      }
      return prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setIsAutoScrollPaused(true);
    setCurrentIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen h-auto flex relative overflow-hidden flex-col text-left md:flex-row w-full justify-evenly mx-auto items-center py-20 px-4"
    >
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-gray-500 dark:text-gray-400 text-xl md:text-2xl z-20">
        Experience
      </h3>

      {/* Carousel Container */}
      <div className="relative w-full mx-auto my-16">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous experience"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Cards Container */}
        <div className="overflow-visible px-16 py-8">
          <div 
            className="flex transition-transform duration-700 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * 30}%)` }}
          >
            {sortedExperiences.map((experience, index) => (
              <div key={`${experience._id}-${index}`} className="flex-shrink-0 w-full md:w-[600px] xl:w-[700px] flex justify-center">
                <ExperienceCard experience={experience} />
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next experience"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {sortedExperiences.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-lightGreen dark:bg-darkerGreen'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to experience ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
