"use client";

import React, { useState, useEffect } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { PageInfo } from "../typings";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";

type Props = { pageInfo: PageInfo };

export default function Hero({ pageInfo }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (!isClient || typeof document === 'undefined') return;
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [text, count] = useTypewriter({
    words: [
      `Hi, the name's ${pageInfo?.name}`,
      "AI Engineer & Developer",
      "I_like_to_code.py",
      "And I'm passionate about tech 🚀",
    ],
    loop: true,
    delaySpeed: 1000,
  });

  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />

      <Image
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        src="/Me-pic.png"
        alt="Muhammad Mustafa"
        width={128}
        height={128}
        priority
      />

      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 dark:text-gray-400 pb-2 tracking-[10px] md:tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-semibold px-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#68B2A0" />
        </h1>

        <div className="pt-5">
          <button className="heroButton" onClick={() => scrollToSection('about')}>
            About
          </button>
          <button className="heroButton" onClick={() => scrollToSection('experience')}>
            Experience
          </button>
          <button className="heroButton" onClick={() => scrollToSection('skills')}>
            Skills
          </button>
          <button className="heroButton" onClick={() => scrollToSection('projects')}>
            Projects
          </button>
        </div>
      </div>
    </div>
  );
}
