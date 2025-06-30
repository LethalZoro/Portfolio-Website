"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Project } from "../typings";

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  // Auto-slide effect - move one card at a time
  useEffect(() => {
    if (projects && projects.length > 0 && !isAutoScrollPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          // Stop at the last card instead of looping
          if (prev >= projects.length - 1) {
            return 0; // Reset to beginning
          }
          return prev + 1;
        });
      }, 4000); // Change every 4 seconds

      return () => clearInterval(interval);
    }
  }, [projects, isAutoScrollPaused]);

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
    if (projects) {
      setIsAutoScrollPaused(true);
      setCurrentIndex((prev) => {
        if (prev >= projects.length - 1) {
          return 0; // Reset to beginning
        }
        return prev + 1;
      });
    }
  };

  const prevSlide = () => {
    if (projects) {
      setIsAutoScrollPaused(true);
      setCurrentIndex((prev) => {
        if (prev <= 0) {
          return projects.length - 1; // Go to last card
        }
        return prev - 1;
      });
    }
  };

  const goToSlide = (index: number) => {
    setIsAutoScrollPaused(true);
    setCurrentIndex(index);
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen h-auto flex relative overflow-hidden flex-col text-left md:flex-row w-full justify-evenly mx-auto items-center py-20 px-4"
    >
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-gray-600 dark:text-gray-400 text-xl md:text-2xl z-20">
        Projects
      </h3>

      {/* Carousel Container */}
      <div className="relative w-full mx-auto my-16">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous project"
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
            {projects.map((project, index) => (
              <div key={`${project._id}-${index}`} className="flex-shrink-0 w-64 md:w-[500px] xl:w-[600px] flex justify-center">
                <div
                  className="flex drop-shadow-xl flex-col rounded-3xl items-center space-y-4 h-full bg-white dark:bg-gray-800 bg-gradient-to-tr from-white dark:from-gray-800 to-darkGreen/20 dark:to-darkerGreen/30 p-4 md:p-7 hover:opacity-100 opacity-100 transition-all duration-300 hover:scale-105 transform cursor-pointer m-4"
                  onClick={() => project?.linkToBuild && window.open(project.linkToBuild, '_blank')}
                >
                  <motion.img
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="w-full h-40 md:h-48 rounded-2xl object-cover object-center"
                    src={project?.image?.asset?._ref || "/placeholder-project.png"}
                    alt={project?.title || "Project"}
                  />

                  <div className="w-full px-2 md:px-5">
                    <div className="text-center mb-4">
                      <h4 className="text-lg md:text-2xl font-semibold text-black dark:text-white mb-2">
                        {project?.title}
                      </h4>
                      <div className="flex items-center space-x-2 justify-center mb-4">
                        {project?.technologies?.map((technology) => (
                          <img
                            key={technology._id}
                            className="h-8 w-8 rounded-full object-cover"
                            src={technology?.image?.asset?._ref || "/placeholder-tech.png"}
                            alt="Technology"
                          />
                        )) || []}
                      </div>
                    </div>
                    
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 text-justify leading-relaxed">
                      {project?.summary}
                    </p>
                    
                    {project?.linkToBuild && (
                      <div className="mt-4 text-center">
                        <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm font-medium transition-colors">
                          Click to view project →
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next project"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-lightGreen dark:bg-darkerGreen'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
