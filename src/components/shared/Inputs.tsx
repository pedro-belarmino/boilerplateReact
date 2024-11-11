import { FC } from 'react';
// import InputMask from 'react-input-mask'
import '../../index.css'



interface InputsProps {
    type: string;
    name: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputMode?:  "search" | "email" | "tel" | "text" | "url" | "none" | "numeric" | "decimal";  //  inputMode para o RegisterInput. Garantir que o tipo seja restrito.
    pattern?: string;
    placeholder?: string;
    className?: string;
}

const Inputs: FC<InputsProps> = ({ type, name, value, onChange, inputMode, pattern, placeholder, className}) => {
    return (
        <div className='inputContainer'>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                className={className}
                placeholder={placeholder}
                onChange={onChange}
                inputMode={inputMode}
                pattern={pattern}

            />
        </div>
    )
}

export default Inputs;