import { useEffect } from "react";
import { useFetch } from "../hooks";
import { OrbitProgress } from "react-loading-indicators";
import { Error } from "../ui";
import { Link } from "react-router-dom";

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
    data: PropsCustomerInfo[];
}

export const CustomerList = () => {

    const { loading, data, error, getData } = useFetch<Response>();


    useEffect(() => {
        const API_URL = "https://localhost:7234/api/Customer/GetAllCustomers";
        getData(API_URL);
    }, [getData])

    if (loading) {
        return <OrbitProgress variant="disc" dense color="#22c560" size="medium" text="" textColor="" />;
    }

    if (error) {
        return <Error message="Error" description={error.stack} ></Error>;
    }

    if (!data?.data) {
        return <p>No customers available</p>;
    }

    return (
        <div className="overflow-y-auto w-full h-dvh flex justify-center">
            <table>
                <thead className="uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">Id</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Lastname</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">CI</th>
                        <th scope="col" className="px-6 py-3">Age</th>
                        <th scope="col" className="px-6 py-3 text-principal-700">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data.map((customer) => (
                        <tr key={customer.idCustomer} className=" border-b border-secondary-200">
                            <td className="px-6 py-2">{customer.idCustomer}</td>
                            <td className="px-6 py-2">{customer.name}</td>
                            <td className="px-6 py-2">{customer.lastName}</td>
                            <td className="px-6 py-2">{customer.email}</td>
                            <td className="px-6 py-2">{customer.ci || "N/A"}</td>
                            <td className="px-6 py-2">{customer.age || "Unknown"}</td>
                            <td className="px-6 py-2"> <Link className="py-2 px-4 bg-principal-600 text-principal-50 rounded" to={`./update-customer/${customer.idCustomer}`}>Edit</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}