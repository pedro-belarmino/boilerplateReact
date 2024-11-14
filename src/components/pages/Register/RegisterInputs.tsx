import { FC, useState } from "react";
import Inputs from "../../shared/Inputs";
import '../../../index.css';
import axios from "axios";
import { baseUrl } from "../../../../shareUrl";

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

const formatLandLine = (value: string) => {
    const numericPhoneValue = value.replace(/\D/g, '').slice(0, 10);
    return numericPhoneValue
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{4})/, '$1-$2');
};

const ValidadeCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanCPF.charAt(i - 1)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanCPF.charAt(i - 1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
};


const validateEmail = (email: string): boolean => { 
    const validEmailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const emailParts = email.split('@')

    if (emailParts.length !== 2) return false;

    const account = emailParts[0];
    const domain = emailParts[1];

    if (account.length > 64) return false;
    else if (domain.length > 255) return false;

    const domainParts = domain.split('.');

    if (domainParts.some((part) => part.length > 63)) return false;

    return validEmailRegex.test(email)
}

const RegisterInputs: FC = () => {
    const url = `${baseUrl}api-demo/v1/user?companyId=1`;

    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
    const [userLandLine, setUserLandLine] = useState<string>(''); //telefone fixo
    const [userCPF, setUserCPF] = useState<string>('');

    const [errors, setErrors] = useState<{ [key: string]: string }>({}); //erro campo obrigatorio
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
        setErrors((prev) => ({ ...prev, userName: '' }));
    };

    const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value);
        setErrors((prev) => ({ ...prev, userEmail: '' }));
    };

    const handleUserPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setUserPhoneNumber(formattedPhone);
        setErrors((prev) => ({ ...prev, userPhoneNumber: '' }));
    };

    const handleUserLandLine = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserLandLine(e.target.value);
        setUserLandLine(formatLandLine);
        setErrors((prev) => ({ ...prev, userLandLine: '' }));
    };

    const handleUserCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCPF = formatCPF(e.target.value);
        setUserCPF(formattedCPF);
        setErrors((prev) => ({ ...prev, userCPF: '' }));
    };

    const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors: { [key: string]: string } = {};

        if (!userName) validationErrors.userName = 'O campo Nome é obrigatório.';
        if (!userEmail) validationErrors.userEmail = 'O campo E-mail é obrigatório.';
        if (!userPhoneNumber) validationErrors.userPhoneNumber = 'O campo Celular é obrigatório.';
        if (!userCPF) validationErrors.userCPF = 'O campo CPF é obrigatório.';

        if (userCPF && !ValidadeCPF(userCPF)) {
            validationErrors.userCPF = 'O CPF informado não é válido.';
        }

        if (userEmail && !validateEmail(userEmail)) {
            validationErrors.userEmail = 'Insira um email válido';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post(url, {
                data: {
                    name: userName,
                    email: userEmail,
                    telephone: userPhoneNumber.replace(/\D/g, ''),
                    landline: userLandLine.replace(/\D/g, ''),
                    cpf: userCPF.replace(/\D/g, '')
                }
            });
            console.log('Código de status:', response.status);

            setUserName('');
            setUserEmail('');
            setUserPhoneNumber('');
            setUserLandLine('');
            setUserCPF('');
            setErrors({});
            setSuccessMessage('Usuário criado com sucesso!')

            if (response.status === 200) {
                console.log('Cadastro Enviado!\n', response.data);
            }

            setTimeout(() => setSuccessMessage(null), 3000);

        } catch (error: any) {
            if (error.response) {
                console.log('Erro no envio das informações do usuário', error.response.status);
                console.error('Mensagem de erro:', error.response.data);
            } else {
                console.error('Erro na requisição, não enviado:', error.message);
            }
        }
    };

    return (
        <div className="rounded-lg p-2 m-6 bg-gray-100 dark:bg-[#1F2937] ">
           
                    <form onSubmit={handleRegisterSubmit} className="m-6 ">
                        {successMessage && (
                            <div className="text-green-500 text-center">{successMessage}</div>
                        )}
                       <div>
                    
                                <label htmlFor="name" className="text-gray-700 font-semibold dark:text-white">*Nome</label>
                                <Inputs
                                    type="text"
                                    name="name"
                                    value={userName}
                                    placeholder="Nome"
                                    onChange={handleUserNameChange}
                                    className="my-2  w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:text-black'"
                                />
                                {errors.userName && <span className="text-red-500 text-sm">{errors.userName}</span>}
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label htmlFor="email" className="text-gray-700 font-semibold dark:text-white">*E-mail</label>
                                <Inputs
                                    type="text"
                                    name="email"
                                    value={userEmail}
                                    placeholder="E-mail"
                                    onChange={handleUserEmailChange}
                                    className="my-2  w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:text-black'"
                                />
                                {errors.userEmail && <span className="text-red-500 text-sm">{errors.userEmail}</span>}
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label htmlFor="phoneNumber" className="text-gray-700 font-semibold dark:text-white">*Celular</label>
                                <Inputs
                                    type="text"
                                    name="phoneNumber"
                                    value={userPhoneNumber}
                                    inputMode="numeric"
                                    placeholder="Celular"
                                    onChange={handleUserPhoneNumberChange}
                                    className="my-2  w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:text-black'"
                                />
                                {errors.userPhoneNumber && <span className="text-red-500 text-sm">{errors.userPhoneNumber}</span>}
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label htmlFor="phoneNumberFixo" className="text-gray-700 font-semibold dark:text-white">Telefone</label>
                                <Inputs
                                    type="text"
                                    name="phoneNumberFixo"
                                    value={userLandLine}
                                    inputMode="numeric"
                                    placeholder="Telefone"
                                    onChange={handleUserLandLine}
                                    className="my-2  w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:text-black'"
                                />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label htmlFor="CPF" className="text-gray-700 font-semibold dark:text-white">*CPF</label>
                                <Inputs
                                    type="text"
                                    name="CPF"
                                    value={userCPF}
                                    inputMode="numeric"
                                    placeholder="CPF"
                                    onChange={handleUserCPFChange}
                                    className="my-2  w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:text-black"
                                />
                                {errors.userCPF && <span className="text-red-500 text-sm">{errors.userCPF}</span>}
                            </div>

                            <button
                                type="submit"
                                name="submit"
                                className="w-full py-3 bg-[#3e5875] text-white rounded-md hover:bg-[#3e5875]transition duration-500 mt-5"
                            >
                                Criar cadastro 
                            </button>
                    </form>
                    
        </div>
    );
};

export default RegisterInputs;
