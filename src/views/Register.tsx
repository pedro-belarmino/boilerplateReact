import RegisterInputs from "../components/pages/Register/RegisterInputs";
import Background from "../components/shared/Background";
import '../index.css';

const Register: React.FC = () => {
    return (
        <div className="h-full dark:bg-[#111827] w-screen ">
            <div className="fixed top-24 left- bg-[#3e5875] text-white font-bold italic text-lg p-4 shadow-lg  hover:opacity-90">
                CADASTRAR USUARIO
            </div>
            <Background>
                <RegisterInputs />
            </Background>
        </div>
    );
}

export default Register;
