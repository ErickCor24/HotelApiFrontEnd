interface InputProps {
    type: "text" | "password" | "email" | "number";
    inputName: string;
    labelName: string;
    placeholder: string;
    linkImage?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputForm = (props: InputProps) => {

    const { type, inputName, labelName, placeholder, linkImage, onChange } = props;

    return (
        <>
            <label htmlFor={`${inputName}_input`} className="text-[1.1rem] text-green-custom-950">{labelName}</label>
            <div className="flex items-center border py-2 px-3 rounded-md border-secondary-200 bg-white">
                {linkImage ? <img src={linkImage} className="h-5 w-5 text-gray-400"></img> : null }
                <input type={type} name={`${inputName}`} id={`${inputName}_id`} placeholder={placeholder} className="pl-2 w-full outline-none text-[1.1rem] border-none" onChange={onChange} required/>
            </div>
        </>
    )
}