import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#d0f2e6] text-gray-800 dark:bg-slate-800/90 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 grid-cols-2 gap-8">
        
        {/* Logo + Tagline */}
        <div className="col-span-2 md:col-span-1">
          <h1 className="text-xl font-bold">TUTTY</h1>
          <p className="text-sm mt-2">Empowering learners with expert-led courses for a brighter future.</p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Explore</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/courses" className="hover:underline">Courses</a></li>
            <li><a href="/admin/authentication" className="hover:underline">Educators</a></li>
            <li><a href="/Aboutus" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Support</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">FAQs</a></li>
            <li><a href="/" className="hover:underline">Contact</a></li>
            <li><a href="/" className="hover:underline">Terms of Service</a></li>
            <li><a href="/" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Connect</h2>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/TajinderS22"
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <svg 
                fill="#000000" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                className="h-6 w-6 dark:fill-amber-200/50" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <g data-name="Layer 2">
                  <rect width="24" height="24" opacity="0"/>
                  <path d="M16.24 22a1 1 0 0 1-1-1v-2.6a2.15 2.15 0 0 0-.54-1.66 1 1 0 0 1 .61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 0 0-.67-2.22 2.75 2.75 0 0 1-.41-2.06 3.71 3.71 0 0 0 0-1.41 7.65 7.65 0 0 0-2.09 1.09 1 1 0 0 1-.84.15 10.15 10.15 0 0 0-5.52 0 1 1 0 0 1-.84-.15 7.4 7.4 0 0 0-2.11-1.09 3.52 3.52 0 0 0 0 1.41 2.84 2.84 0 0 1-.43 2.08 4.07 4.07 0 0 0-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 0 1 .82.66 1 1 0 0 1-.21 1 2.06 2.06 0 0 0-.55 1.56V21a1 1 0 0 1-2 0v-.57a6 6 0 0 1-5.27-2.09 3.9 3.9 0 0 0-1.16-.88 1 1 0 1 1 .5-1.94 4.93 4.93 0 0 1 2 1.36c1 1 2 1.88 3.9 1.52a3.89 3.89 0 0 1 .23-1.58c-2.06-.52-5-2-5-7a6 6 0 0 1 1-3.33.85.85 0 0 0 .13-.62 5.69 5.69 0 0 1 .33-3.21 1 1 0 0 1 .63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 0 1 5.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 0 1 .63.57 5.71 5.71 0 0 1 .33 3.22.75.75 0 0 0 .11.57 6 6 0 0 1 1 3.34c0 5.07-2.92 6.54-5 7a4.28 4.28 0 0 1 .22 1.67V21a1 1 0 0 1-.94 1z"/>
                </g>
              </svg>
            </a>            
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm py-4 border-t dark:border-slate-600 border-slate-300">
        © {new Date().getFullYear()} TUTTY. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;