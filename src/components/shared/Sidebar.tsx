import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoutButton from './LogoutButton';

interface SidebarProps {
  isMenuOpen: boolean;
  isHomeSubMenuOpen: boolean;
  toggleHomeSubMenu: () => void;
  toggleMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMenuOpen,
  isHomeSubMenuOpen,
  toggleHomeSubMenu,
  toggleMenu,
}) => {
  const [subMenusOpen, setSubMenusOpen] = useState<{ [key: string]: boolean }>({
    home1: false,
    home2: false,
    home3: false,
  });

  const toggleSubMenu = (menuKey: string) => {
    setSubMenusOpen((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };


  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMenu} // Fecha o menu ao clicar fora
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#4b6584] to-[#3e5875] w-[250px] text-white shadow-xl transform transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0 z-50' : '-translate-x-full'
          }`}
      >
        {/* Top Header */}
        <div className="h-16 bg-blue-950/50 backdrop-blur-sm flex items-center px-6 border-b border-blue-700/30 shadow-md">
          <div className="flex items-center space-x-6">
            <span className="text-lg font-semibold tracking-wide text-gray-200">.</span>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
          <ul className="py-4 px-2 space-y-2">
            {/* Home Menu */}
            <li>
              <button
                onClick={toggleHomeSubMenu}
                className="w-full px-4 py-3 flex justify-between items-center rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
              >
                <span className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-blue-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <span className="font-medium">Home</span>
                </span>
                <svg
                  className={`h-4 w-4 transform transition-transform duration-300 ${isHomeSubMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <ul
                className={`mt-1 rounded-lg overflow-hidden transition-all duration-300 ${isHomeSubMenuOpen ? 'max-h-96' : 'max-h-0'}`}
              >
                {['Home 1', 'Home 2', 'Home 3'].map((text, index) => (
                  <li key={index} className="ml-2 mt-2">
                    <button
                      onClick={() => toggleSubMenu(`home${index + 1}`)}
                      className="w-full px-4 py-2.5 flex justify-between items-center rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
                    >
                      <span className="text-sm font-medium text-blue-100">{text}</span>
                      <svg
                        className={`h-4 w-4 transform transition-transform duration-300 ${subMenusOpen[`home${index + 1}`] ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <ul
                      className={`ml-4 mt-1 overflow-hidden transition-all duration-300 ${subMenusOpen[`home${index + 1}`] ? 'max-h-48' : 'max-h-0'}`}
                    >
                      <li>
                        <Link
                          to={`/${text.toLowerCase()}-a`}
                          className="block px-6 py-2 text-sm text-blue-100 bg-[#34495e] rounded-lg hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
                        >
                          {text} - Opção A
                        </Link>
                      </li>
                      <li className="mt-1">
                        <Link
                          to={`/${text.toLowerCase()}-b`}
                          className="block px-6 py-2 text-sm text-blue-100 bg-[#34495e] rounded-lg hover:bg-[#3e5875] transition-all duration-300 shadow-sm"
                        >
                          {text} - Opção B
                        </Link>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </li>

            {/* About */}
            <li>
              <Link
                to="/about"
                className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm group"
              >
                <svg
                  className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">About</span>
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                to="/contact"
                className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg bg-[#34495e] hover:bg-[#3e5875] transition-all duration-300 shadow-sm group"
              >
                <svg
                  className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Contact</span>
              </Link>
            </li>

            {/* Logout */}
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
