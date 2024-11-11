import { useUserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../../shareUrl';
import Inputs from '../../shared/Inputs';
import { useState, useEffect, useCallback } from 'react';
import '../../../index.css';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm: React.FC = () => {
  const url = `${baseUrl}api-demo/v1/token`;

  const [userPassword, setUserPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { userLogin, setUserLogin, setMessage } = useUserContext();
  const navigate = useNavigate();
  const [capVal, setCapVal] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [captchaError, setCaptchaError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if the user's login is stored in localStorage
    const storedLogin = localStorage.getItem('username');
    if (storedLogin) {
      setUserLogin(storedLogin);
      setRememberMe(true);
    }
  }, [setUserLogin]);

  const handleUserLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleUserPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleRememberMeChange = () => {
    setRememberMe((prevState) => !prevState);
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Validate the captcha
      if (!capVal) {
        setCaptchaError('Por favor, confirme que você não é um robô.');
        return;
      }

      setIsLoading(true);
      setError('');
      setCaptchaError('');
      setSuccess('');

      try {
        const response = await axios.post(url, {
          username: userLogin,
          password: userPassword,
        });

        if (response.status === 200) {
          setSuccess('Login realizado com sucesso!');
          setMessage(response.data.token || 'Token não encontrado');

          // Save the user's login in localStorage if "Remember Me" is checked
          if (rememberMe) {
            localStorage.setItem('username', userLogin);
          } else {
            localStorage.removeItem('username');
          }

          localStorage.setItem('token', response.data.token);
          setTimeout(() => {
            navigate('/home');
          }, 1000);
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 403) {
            setError('E-mail ou senha incorretos. Por favor, tente novamente.');
          } else {
            setError('Erro no servidor. Por favor, tente novamente mais tarde.');
          }
        } else {
          setError('Erro de conexão. Verifique sua internet e tente novamente.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [url, userLogin, userPassword, capVal, rememberMe, setMessage, navigate]
  );

  const onChange = (value: string | null) => {
    setCapVal(value);
    setCaptchaError(''); // Clear the captcha error when validated
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleFirstAccess = () => {
    navigate('/first-access');
  };

  return (
    <div className='my-10 p-4 rounded-lg w-100 space-y-4 bg-slate-100 shadow-2xl max-w-md mx-auto dark:bg-[#3E5875]'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label htmlFor="email" className="text-gray-700 font-semibold dark:text-white">
          Faça seu Login!
        </label>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 dark:bg-red-200">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 dark:bg-green-200">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <Inputs
          type="text"
          placeholder='Digite seu e-mail'
          name="login"
          value={userLogin}
          onChange={handleUserLoginChange}
          className='my-2 w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:text-black'
        />
        <Inputs
          type="password"
          placeholder='Senha'
          name="password"
          value={userPassword}
          onChange={handleUserPasswordChange}
          className='my-2 w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:text-black'
        />

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            className="mr-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label htmlFor="remember-me" className="text-gray-700 dark:text-white">
            Lembrar-me
          </label>
        </div>

        <div className="mb-4">
          <ReCAPTCHA
            sitekey='6Lc--XUqAAAAAH3TGk5kR8kZZaqMlts_BqBeJVbY'
            onChange={onChange}
          />
          {captchaError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-2 text-sm dark:bg-red-200">
              <span className="block sm:inline">{captchaError}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            name="submit"
            className={`submitButton md:space-x-4 hover:bg-[#2a3b4e] bg-[#3e5875] text-white rounded p-2 dark:bg-[#111827] 
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              className="text-[#3e5875] hover:underline dark:text-white"
              onClick={handleForgotPassword}
            >
              Esqueci a senha
            </button>
            <button
              type="button"
              className="text-[#3e5875] hover:underline dark:text-white"
              onClick={handleFirstAccess}
            >
              Primeiro acesso
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;