import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-8 md:px-12 lg:px-16 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="HackerRank" 
            className="w-[43px] h-[25.481px]"
            style={{ aspectRatio: '27/16' }}
          />
        </div>

        {/* Center - Navigation Tabs */}
        <nav className="hidden sm:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
          <button className="bg-green-100 text-[#18A149] px-4 py-2 rounded-md text-lg font-bold leading-8 font-satoshi" style={{ fontFeatureSettings: "'ss03' on" }}>
            Tickets
          </button>
          <button className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100">
            Analytics
          </button>
          <button className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100">
            Accounts
          </button>
        </nav>

        {/* Right side - Actions and User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Settings Icon */}
          <button className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Notifications Icon */}
          <button className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 relative">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>

          {/* User Profile */}
          <div className="flex items-center justify-center">
            <div
              className="w-10 h-10 rounded-full border border-[#ECEFF2] overflow-hidden bg-gray-200 bg-center bg-cover hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer"
              style={{ 
                backgroundImage: "url(/profile.png)",
                backgroundPosition: "50%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
              aria-label="User profile"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
