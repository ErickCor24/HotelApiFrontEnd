import { InputForm } from "../ui/inputs/InputForm"
import { Button } from "../ui/inputs/Button"
import { usePost } from "../hooks/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PropsCustomer {
    idCustomer: number;
    name: string;
    lastName: string;
    email: string;
    ci: string;
    age: number;
}

export const FormCustomer = () => {
    const API_URL = "https://localhost:7234/api/Customer/InsertCustomer";
    const navigate = useNavigate();
    const { postData, error } = usePost<PropsCustomer>();


    const [customer, setCustomer] = useState<PropsCustomer>({
        idCustomer: 0,
        name: "",
        lastName: "",
        email: "",
        ci: "",
        age: 0
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postData(API_URL, customer);
        if (!error){
            navigate("/customer");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <h2 className="text-2xl text-principal-700 mb-4 font-medium">Register new customer</h2>
            {error && <p className="text-red-500 text-sm">Error: An error has ocurred</p>}
            <form onSubmit={handleSubmit} method="POST" className="w-2/4 flex flex-col gap-4">
                <div>
                    <InputForm labelName="Name" inputName="name" type="text" placeholder="Insert your name here" linkImage="/icons/user.svg" onChange={handleChange} />
                </div>
                <div>
                    <InputForm labelName="Last Name" inputName="lastName" type="text" placeholder="Insert your last name here" linkImage="/icons/user.svg" onChange={handleChange} />
                </div>
                <div className="flex gap-2 justify-stretch items-center">
                    <InputForm labelName="CI" inputName="ci" type="number" placeholder="Insert your CI here" linkImage="/icons/ci.svg" onChange={handleChange} />
                    <InputForm labelName="age" inputName="age" placeholder="Insert your age here" type="number" linkImage="/icons/age.svg" onChange={handleChange}></InputForm>
                </div>
                <div>
                    <InputForm labelName="E-mail" inputName="email" type="email" placeholder="Insert your email here" linkImage="/icons/email.svg" onChange={handleChange} />
                </div>
                <div className="flex justify-center">
                    <Button text="Enviar"></Button>
                </div>
            </form>
        </>
    )
}