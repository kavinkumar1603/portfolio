import HeroSection from "./components/HeroSection";
import TechStack from "./components/TechStack";
import ProjectsSection from "./components/ProjectsSection";
import InternshipsSection from "./components/InternshipsSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <TechStack />
        <ProjectsSection />
        <InternshipsSection />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} Kavin Kumar. Crafted with ❤️ & Next.js
          </p>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </footer>
    </>
  );
}
