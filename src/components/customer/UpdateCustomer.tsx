import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useFetch } from "../hooks";
import { OrbitProgress } from "react-loading-indicators";
import { Error } from "../ui";
import { InputForm } from "../ui/inputs/InputForm"
import { usePut } from "../hooks/usePut";
import { Button } from "../ui/inputs/Button";

interface PropsCustomerInfo {
    idCustomer: number;
    name: string;
    lastName: string;
    email: string;
    ci: string;
    age: number;
}

type Response = {
    success: boolean;
    message: string;
    data: PropsCustomerInfo;
}


export const UpdateCustomer = () => {
    const { id } = useParams();

    const API_PUT_URL = `https://localhost:7234/api/Customer/UpdateCustomer/${id}`;
    const API_GET_URL = `https://localhost:7234/api/Customer/GetCustomerById/${id}`;
    
    const [customer, setCustomer] = useState<PropsCustomerInfo>({
        idCustomer: 0, name: "", lastName: "", email: "", ci: "", age: 0
    });

    const { loading, data, error, getData } = useFetch<Response>();
    const { putData } = usePut<PropsCustomerInfo>();

    const navigate = useNavigate();

    useEffect(() => {
        getData(API_GET_URL);
    }, [API_GET_URL, getData])

    useEffect(() => {
        if (data?.data) {
            setCustomer(data.data);
        }
    }, [data])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await putData(API_PUT_URL, customer);
        if (!error) {
            navigate("/customer");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        })
    }


    if (loading) {
        return <OrbitProgress variant="split-disc" dense color="#22c560" size="medium" text="" textColor="" />;
    }

    if (error) {
        return <Error message="Error" description={error.stack} ></Error>;
    }

    if (data?.success === false) {
        return <Error message="Error" description={data?.message} ></Error>;
    }

    return (
        <>
            <>
                <h2 className="text-2xl text-principal-700 mb-4 font-medium">Update customer, {data?.data.name} {data?.data.lastName}</h2>
                {error && <p className="text-red-500 text-sm">Error: An error has ocurred</p>}
                <form onSubmit={handleSubmit} method="POST" className="w-2/4 flex flex-col gap-4">
                    <div>
                        <InputForm value={customer.name} labelName="Name" inputName="name" type="text" placeholder="Insert your name here" linkImage="/icons/user.svg" onChange={handleChange} />
                    </div>
                    <div>
                        <InputForm value={customer.lastName} labelName="Last Name" inputName="lastName" type="text" placeholder="Insert your last name here" linkImage="/icons/user.svg" onChange={handleChange} />
                    </div>
                    <div className="flex gap-2 justify-stretch items-center">
                        <InputForm value={customer.ci} labelName="CI" inputName="ci" type="number" placeholder="Insert your CI here" linkImage="/icons/ci.svg" onChange={handleChange} />
                        <InputForm value={customer.age.toString()} labelName="age" inputName="age" placeholder="Insert your age here" type="number" linkImage="/icons/age.svg" onChange={handleChange}></InputForm>
                    </div>
                    <div>
                        <InputForm value={customer.email} labelName="E-mail" inputName="email" type="email" placeholder="Insert your email here" linkImage="/icons/email.svg" onChange={handleChange} />
                    </div>
                    <div className="flex justify-center">
                        <Button text="Enviar"></Button>
                    </div>
                </form>
            </>
        </>
    )
}