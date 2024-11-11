import { FC, useState, useEffect } from "react";
import '../../../index.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../../../../shareUrl";

interface ShowUser {
    userId: number;
    name: string;
    email: string;
    cpf: string;
    telephone: string;
    landline: string;
    status: boolean;
}

const TableUsersList: FC = () => {

    const url = `${baseUrl}api-demo/v1/user/list?companyId=1`;

    const [users, setUsers] = useState<ShowUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(url);
            setUsers(response.data.data);
            setLoading(false);

        } catch (error) {
            setError('Erro ao buscar usuários.');
            setLoading(false);
        }
    };

    const formatCpf = (cpf: string): string => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatPhoneNumber = (phone: string): string => {
        return phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    };


    // if (landline != null || landline != "") {

    const formatLandline = (landline: string): string => {
        return landline.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    };

    // landline = formatLandline
    //     } else {
    //         landline = "-----"
    //     }


    useEffect(() => {
        fetchUsers();
    }, []);




    if (loading) {

        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <h1 className="font-semibold text-center mb-4">Carregando usuários...</h1>
                <img src="src/assets/images/loadingGif.gif" alt="loading" className="h-24 w-24" />
            </div>
        );

    }

    if (error) {
        return (

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
        );
    }


    const editingHandleButton = (id: number) => {
        navigate('/editing', { state: { userId: id } });
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-8">
            <div className="container mx-auto px-4 max-w-6xl ">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-[#3e5875] text-white">
                                    <th className="w-[9%] px-4 py-3 border-b border-r border-white font-semibold dark:border-slate-700">ID</th>
                                    <th className="w-[18%] px-4 py-3 border-b border-r border-white font-semibold dark:border-slate-700">Nome</th>
                                    <th className="w-[18%] px-4 py-3 border-b border-r border-white font-semibold dark:border-slate-700">E-mail</th>
                                    <th className="w-[18%] px-4 py-3 border-b border-r border-white font-semibold dark:border-slate-700">CPF</th>
                                    <th className="w-[18%] px-4 py-3 border-b border-r border-white font-semibold dark:border-slate-700">Celular</th>
                                    <th className="w-[18%] px-4 py-3 border-b border-r border-white font-semibold dark:border-slate-700">Telefone</th>
                                    <th className="w-[9%] px-4 py-3 border-b border-r border-white font-semibold dark:border-slate-700">Status</th>
                                    <th className="w-[10%] px-4 py-3 border-b border-r border-white font-semibold dark:border-slate-700">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-white">
                                {users.map((user) => (
                                    <tr key={user.userId} className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-100">
                                        <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-center">{user.userId}</td>
                                        <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700">{user.name}</td>
                                        <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700">{user.email}</td>
                                        <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-center">{formatCpf(user.cpf)}</td>
                                        <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-center">{formatPhoneNumber(user.telephone)}</td>
                                        <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-center flex justify-center">{user.landline ? formatLandline(user.landline) :
                                            <svg
                                                className="h-8 w-8 text-slate-600 dark:text-slate-50"
                                                viewBox="0 0 24 12"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                stroke-Linejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        }
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200 dark:border-gray-700 text-center">
                                            <button
                                                className={`h-4 w-4 rounded-full transition-colors ${user.status ? 'bg-green-500' : 'bg-red-500'}`}
                                                aria-label={user.status ? 'Ativo' : 'Inativo'}
                                            />
                                        </td>
                                        <td className="px-4 py-3 border-gray-200 dark:border-gray-700">
                                            <div className="flex justify-center items-center gap-4">
                                                <button onClick={() => editingHandleButton(user.userId)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-5 w-5">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m16.862 4.487 
                                                            1.687-1.688a1.875 
                                                            1.875 0 1 1 2.652 
                                                            2.652L10.582 
                                                            16.07a4.5 4.5 
                                                            0 0 1-1.897 
                                                            1.13L6 
                                                            18l.8-2.685a4.5 
                                                            4.5 0 0 1 
                                                            1.13-1.897l8.932-8.931Zm0 
                                                            0L19.5 7.125M18 
                                                            14v4.75A2.25 
                                                            2.25 0 0 1 15.75 
                                                            21H5.25A2.25 2.25 
                                                            0 0 1 3 
                                                            18.75V8.25A2.25 
                                                            2.25 0 0 1 5.25 
                                                            6H10"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default TableUsersList;
