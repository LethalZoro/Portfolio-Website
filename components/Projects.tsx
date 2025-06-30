import { motion } from "framer-motion";
import React from "react";
import { Project } from "../typings";

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-gray-600 text-xl md:text-2xl">
        Projects
      </h3>

      {/* Projects cards */}
      <div className="w-screen md:w-full text-left pb-5 md:pb-10 flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80">
        {projects?.map((project, i) => (
          <div
            key={project._id}
            className="flex drop-shadow-xl flex-col rounded-3xl items-center space-y-4 flex-shrink-0 w-64 md:w-[500px] xl:w-[600px] snap-center bg-[#FFFFFF] bg-gradient-to-tr from-white to-darkGreen/20 p-4 md:p-7 hover:opacity-100 opacity-100 transition-opacity duration-200 hover:scale-105 transform transition-transform cursor-pointer"
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
                <h4 className="text-lg md:text-2xl font-semibold text-black mb-2">
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
              
              <p className="text-sm md:text-base text-gray-700 text-justify leading-relaxed">
                {project?.summary}
              </p>
              
              {project?.linkToBuild && (
                <div className="mt-4 text-center">
                  <span className="text-darkGreen hover:text-green-600 text-sm font-medium">
                    Click to view project →
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
