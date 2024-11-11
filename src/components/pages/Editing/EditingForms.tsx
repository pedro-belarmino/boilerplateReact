import { FC, useState, useEffect, MouseEventHandler, } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import '../../../index.css';
import loadingGif from '../../../assets/images/loadingGif.gif';
import Inputs from "../../shared/Inputs";
import { baseUrl } from "../../../../shareUrl";


interface ShowUser {
    userId: number;
    name: string;
    email: string;
    cpf: string;
    telephone: string;
    status: boolean;
}

const formatCPF = (value: string) => {
    const numericCPFValue = value.replace(/\D/g, '').slice(0, 11);
    return numericCPFValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const formatPhoneNumber = (value: string) => {
    const numericPhoneValue = value.replace(/\D/g, '').slice(0, 11);
    return numericPhoneValue
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2-$3');
};



const EditingForms: FC = () => {

    const url = `${baseUrl}api-demo/v1/user`;

    const location = useLocation();
    const { userId } = location.state || {};  // Pegando o userId da rota

    const [user, setUser] = useState<ShowUser | null>(null);  // Estado para um usuário

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
    const [userCPF, setUserCPF] = useState<string>('');
    const [userStatus, setUserStatus] = useState<boolean>(true)
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const modify: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(url, {
                data: {
                    userId: userId,
                    companyId: "1",
                    name: userName,
                    email: userEmail,
                    telephone: userPhoneNumber.replace(/\D/g, ''),
                    cpf: userCPF.replace(/\D/g, ''),
                    status: userStatus
                }
            });
            console.log('Código de status:', response.status);

            setUserName('');
            setUserEmail('');
            setUserPhoneNumber('');
            setUserCPF('');
            setUserStatus(true)
            setSuccessMessage('Cadastro realizado com sucesso!');

            if (response.status === 200) {
                console.log('Cadastro Enviado!\n', response.data);
                navigate('/UsersList');
            }

        } catch (error: any) {
            if (error.response) {
                console.log('Erro no envio das informações do usuário', error.response.status);
                console.error('Mensagem de erro:', error.response.data);
            } else {
                console.error('Erro na requisição, não enviado:', error.message);
            }
        }
    };

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value);
    };
    const handleUserPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPhoneNumber(e.target.value);
        setUserPhoneNumber(formatPhoneNumber)
    };
    const handleUserCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCPF(e.target.value);
        setUserCPF(formatCPF)
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${url}?companyId=1&userId=${userId}`);
            const userData = response.data.data;

            // 1 verdadeiro - 0 falso
            setUserStatus(userData.status === 1);
            setUser(userData);
            setLoading(false);
        } catch (error) {
            setError('Erro ao buscar usuário.');
            setLoading(false);
        }
    };


    // carregar o usuário na montagem do componente
    useEffect(() => {
        fetchUser();
    }, []);

    // atualizar os estados dos inputs quando o usuário é carregado
    useEffect(() => {
        if (user) {
            setUserName(user.name);
            setUserEmail(user.email);
            setUserPhoneNumber(user.telephone);
            setUserCPF(user.cpf);
            setUserStatus(user.status);

        }
    }, [user]);

    if (loading) {

        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <h1 className="font-semibold text-center mb-4">Carregando usuários...</h1>
                <img src={loadingGif} alt="loading" className="h-24 w-24" />
            </div>
        );

    }

    if (error) {
        return (
            <div className="errorMessage">
                <p>{error}</p>
                <div className="flex flex-col">
                <p className="font-bold flex justify-center text-3xl text-slate-800">{error}</p>
                <div className="flex justify-center">
                <svg className="h-32 w-32 text-slate-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                </svg>
            </div>
            </div>
            </div>
        );
    }

    if (!user) {
        return <div>Usuário não encontrado.</div>;
    }

    return (
        <div>
            {successMessage && (
                <div className="p-4 bg-green-200 text-green-800 rounded-md mb-4">
                    {successMessage}
                </div>
            )}
            <form key={user.userId} className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto algin-bottom dark:bg-[#64748B] dark:text-black">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">NOME</label>
                    <Inputs
                        type="text"
                        name="name"
                        value={userName}
                        onChange={handleUserNameChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">EMAIL</label>
                    <Inputs
                        type="email"
                        name="email"
                        value={userEmail}
                        onChange={handleUserEmailChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="telephone" className="block text-gray-700 font-semibold mb-2">TELEFONE</label>
                    <Inputs
                        type="tel"
                        name="telephone"
                        value={userPhoneNumber}
                        onChange={handleUserPhoneNumberChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cpf" className="block text-gray-700 font-semibold mb-2">CPF</label>
                    <Inputs
                        type="text"
                        name="cpf"
                        value={userCPF}
                        onChange={handleUserCPFChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>


                <label className="flex items-center cursor-pointer text-gray-700 font-semibold mb-2">
                    Status do Usuario:
                    <div className="ml-2 relative">
                        <input
                            type="checkbox"
                            checked={userStatus}
                            onChange={() => setUserStatus(!userStatus)}
                            className="sr-only peer"
                            id="toggle"
                        />
                        <div className="w-8 h-4 bg-gray-300 rounded-full shadow-inner peer-checked:bg-[#3e5875] transition-all"></div>
                        <div
                            className="absolute top-0 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform transform peer-checked:translate-x-full"
                        ></div>
                    </div>
                </label>


                <button
                    type="submit"
                    name="submit"
                    className="w-full bg-[#3e5875] text-white py-2 px-4 rounded-md hover:bg-[#3e5875] transition duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#222049]"
                    onClick={modify}
                >
                    Submit
                </button>
            </form>

        </div>
    );
};


export default EditingForms;

