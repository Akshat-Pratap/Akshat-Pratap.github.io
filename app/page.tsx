import LoaderProvider from "@/components/LoaderProvider";
import SmoothScroll from "@/components/SmoothScroll";
import BatCursor from "@/components/BatCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <LoaderProvider>
      <SmoothScroll>
        <BatCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Contact />
        </main>
        <div className="noise-overlay" aria-hidden="true" />
      </SmoothScroll>
    </LoaderProvider>
  );
}
