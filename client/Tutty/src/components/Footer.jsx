import React from "react";

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-footer-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
        {/* Logo + Tagline */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-8 rounded-md object-contain"
              src="https://res.cloudinary.com/dcpz5001o/image/upload/v1750935602/Tuty_pffuhw.png"
              alt="Tuty Logo"
            />
            <span className="font-display text-xl font-bold text-white">
              TUTTY
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed opacity-70">
            Empowering learners with expert-led courses for a brighter future.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="/" className="opacity-70 transition hover:text-white hover:opacity-100">
                Home
              </a>
            </li>
            <li>
              <a href="/courses" className="opacity-70 transition hover:text-white hover:opacity-100">
                Courses
              </a>
            </li>
            <li>
              <a href="/creator/authentication" className="opacity-70 transition hover:text-white hover:opacity-100">
                Educators
              </a>
            </li>
            <li>
              <a href="/Aboutus" className="opacity-70 transition hover:text-white hover:opacity-100">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Support
          </h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="/faqs" className="opacity-70 transition hover:text-white hover:opacity-100">
                FAQs
              </a>
            </li>
            <li>
              <a href="/contact" className="opacity-70 transition hover:text-white hover:opacity-100">
                Contact
              </a>
            </li>
            <li>
              <a href="/terms" className="opacity-70 transition hover:text-white hover:opacity-100">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="opacity-70 transition hover:text-white hover:opacity-100">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social / Connect */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Connect
          </h2>
          <div className="flex space-x-3">
            <a
              href="https://github.com/TajinderS22"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 transition hover:bg-white/20"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g data-name="Layer 2">
                  <rect width="24" height="24" opacity="0" />
                  <path d="M16.24 22a1 1 0 0 1-1-1v-2.6a2.15 2.15 0 0 0-.54-1.66 1 1 0 0 1 .61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 0 0-.67-2.22 2.75 2.75 0 0 1-.41-2.06 3.71 3.71 0 0 0 0-1.41 7.65 7.65 0 0 0-2.09 1.09 1 1 0 0 1-.84.15 10.15 10.15 0 0 0-5.52 0 1 1 0 0 1-.84-.15 7.4 7.4 0 0 0-2.11-1.09 3.52 3.52 0 0 0 0 1.41 2.84 2.84 0 0 1-.43 2.08 4.07 4.07 0 0 0-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 0 1 .82.66 1 1 0 0 1-.21 1 2.06 2.06 0 0 0-.55 1.56V21a1 1 0 0 1-2 0v-.57a6 6 0 0 1-5.27-2.09 3.9 3.9 0 0 0-1.16-.88 1 1 0 1 1 .5-1.94 4.93 4.93 0 0 1 2 1.36c1 1 2 1.88 3.9 1.52a3.89 3.89 0 0 1 .23-1.58c-2.06-.52-5-2-5-7a6 6 0 0 1 1-3.33.85.85 0 0 0 .13-.62 5.69 5.69 0 0 1 .33-3.21 1 1 0 0 1 .63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 0 1 5.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 0 1 .63.57 5.71 5.71 0 0 1 .33 3.22.75.75 0 0 0 .11.57 6 6 0 0 1 1 3.34c0 5.07-2.92 6.54-5 7a4.28 4.28 0 0 1 .22 1.67V21a1 1 0 0 1-.94 1z" />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 text-center text-sm opacity-60">
        © {new Date().getFullYear()} TUTTY. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
