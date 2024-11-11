///// NADA DESENVOLVIDO AQUI DEVE SER LEVADO EM CONSIDERAÇÃO PARA A EXECUÇÃO DO SISTEMA /////

import axios from "axios";
import { useState } from "react";
import Inputs from "../components/shared/Inputs";

function Test() {
    const [userLogin, setUserLogin] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [, setError] = useState<string | null>(null);

    const handleUserLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserLogin(e.target.value);
    };

    const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://192.168.0.105:6060/api-demo/v1/bola', {
                username: userLogin,
                password: userPassword
            });
            console.log(response.data);


            
        } catch (error) {
            setError('Erro :(');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Inputs type="text" placeholder='Login' name="login" value={userLogin} onChange={handleUserLoginChange} />
                <br />
                <Inputs type="password" placeholder='Senha' name="password" value={userPassword} onChange={handleUserPasswordChange} />
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Test;


///// NADA DESENVOLVIDO AQUI DEVE SER LEVADO EM CONSIDERAÇÃO PARA A EXECUÇÃO DO SISTEMA /////