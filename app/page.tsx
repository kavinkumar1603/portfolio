import HeroSection from "./components/HeroSection";
import TechStack from "./components/TechStack";
import ProjectsSection from "./components/ProjectsSection";
import EducationSection from "./components/EducationSection";
import CodingProfilesSection from "./components/CodingProfilesSection";
import ContactSection from "./components/ContactSection";
import InternshipsSection from "./components/InternshipsSection";
import CertificationsSection from "./components/CertificationsSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <TechStack />
        <CertificationsSection />
        <InternshipsSection />
        <ProjectsSection />
        <EducationSection />
        <CodingProfilesSection />
        <ContactSection />
      </main>

      <footer className="footer">
        <div className="footer-glow"></div>
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="footer-copy">
              © {new Date().getFullYear()} Kavin Kumar. All rights reserved.
            </p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/kavinkumar1603" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/ckavinkumar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://x.com/KavinKumar_16" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
