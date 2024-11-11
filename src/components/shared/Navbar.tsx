import React from 'react';
import useAuthorizationCheck from './CheckAuthorization';

interface NavbarProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
  toggleDarkMode: () => void; // modo escuro
  isDarkMode: boolean; // adiciona o estado do modo escuro
}

const Navbar: React.FC<NavbarProps> = ({
  toggleMenu,
  isMenuOpen,
  toggleDarkMode,
  isDarkMode,
}) => {
  const authorizationChecked = useAuthorizationCheck();

  return (
    <nav className="w-full bg-[#3e5875] h-16 text-white fixed top-0 left-0 z-[1001] shadow-lg">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center">
        {/* Menu Icon e Links de Navegação */}
        <div className="flex items-center">
          <button
            className="relative group mr-4"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div
              className={`relative flex overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 ${
                isMenuOpen ? 'ring-4' : ''
              } ring-opacity-30 duration-200 shadow-md`}
            >
              <div className="flex flex-col justify-between w-[15px] h-[15px] transform transition-all duration-300 origin-center overflow-hidden">
                <div
                  className={`bg-white h-[1.5px] w-6 transform transition-all duration-300 origin-left ${
                    isMenuOpen ? 'rotate-[42deg]' : ''
                  }`}
                ></div>
                <div
                  className={`bg-white h-[1.5px] w-1/2 rounded transform transition-all duration-300 ${
                    isMenuOpen ? '-translate-x-10' : ''
                  }`}
                ></div>
                <div
                  className={`bg-white h-[1.5px] w-6 transform transition-all duration-300 origin-left ${
                    isMenuOpen ? '-rotate-[42deg]' : ''
                  }`}
                ></div>
              </div>
            </div>
          </button>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => authorizationChecked('/home')}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-[#34495e] transition-all duration-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-medium">Home</span>
            </button>

            <button
              onClick={() => authorizationChecked('/register')}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-[#34495e] transition-all duration-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <span className="font-medium">Cadastrar</span>
            </button>

            <button
              onClick={() => authorizationChecked('/UsersList')}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-[#34495e] transition-all duration-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="font-medium">Lista de usuários</span>
            </button>
          </div>
        </div>

        {/* Botão de Modo Escuro */}
        <button
          className={`ml-auto w-12 h-6 flex items-center rounded-full transition duration-300 ${
            isDarkMode ? 'bg-[#111827]' : 'bg-gray-400'
          }`}
          onClick={toggleDarkMode}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ${
              isDarkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
