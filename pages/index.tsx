import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";
import { Experience, PageInfo, Skill, Project, Social } from "../typings";
import { fetchPageInfo } from "../utils/fetchPageInfo";
import { fetchExperiences } from "../utils/fetchExperience";
import { fetchProjects } from "../utils/fetchProjects";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchSocials } from "../utils/fetchSocials";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import Script from "next/script";
import { ThemeProvider } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ pageInfo, experiences, projects, skills, socials }: Props) => {
  return (
    <ThemeProvider>
      <div
        className="bg-lightBackground dark:bg-darkBackground text-darkBlack dark:text-white h-screen
      overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80 dark:scrollbar-track-gray-800/20 dark:scrollbar-thumb-darkerGreen/80 transition-colors duration-300"
      >
        <ThemeToggle />
      <Head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>{"Mustafa's Portfolio"}</title>
      </Head>

      {/* Google Analytics
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-LV1LN9VBT0"
        strategy="afterInteractive"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-LV1LN9VBT0')`}
        ;
      </Script> */}

      {/* Header */}
      <Header socials={socials} />

      {/* Hero */}
      <section id="hero">
        <Hero pageInfo={pageInfo} />
      </section>

      {/* About */}
      <section id="about">
        <About pageInfo={pageInfo} />
      </section>

      {/* Experiences */}
      <section id="experience">
        <WorkExperience experiences={experiences} />
      </section>

      {/* Skills */}
      <section id="skills">
        <Skills skills={skills} />
      </section>

      {/* Projects */}
      <section id="projects">
        <Projects projects={projects} />
      </section>

      {/* Contact */}
      <section id="contact">
        <ContactMe />
      </section>

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer z-50">
          <div className="flex items-center justify-center">
            <div className="h-10 w-10 bg-gray-600/80 dark:bg-gray-700/80 rounded-full flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg">
              <HomeIcon className="h-7 w-17 pb-0.5 hover:grayscale-100 text-white animate-pulse" />
            </div>
          </div>
        </footer>
      </Link>
      </div>
    </ThemeProvider>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo = fetchPageInfo();
  const experiences = fetchExperiences();
  const skills = fetchSkills();
  const projects = fetchProjects();
  const socials = fetchSocials();

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },
    revalidate: 10,
  };
};
