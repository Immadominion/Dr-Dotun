import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { AboutMe } from "@/components/sections/AboutMe";
import { LatestPodcasts } from "@/components/sections/LatestPodcasts";
import { Essays } from "@/components/sections/Essays";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <AboutMe />
        <LatestPodcasts />
        <Essays />
      </main>
      <Footer />
    </>
  );
}
