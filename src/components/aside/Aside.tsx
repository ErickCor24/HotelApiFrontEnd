import { Link } from "react-router-dom"
import { AsideDropDown } from "../ui";

const optionsCustomer = [
    {
        value: 'View customers',
        link: '/customer'
    },
    {
        value: 'Add new',
        link: '/customer/new-customer'
    }
]

const optionsRooms = [
    {
        value: 'View Rooms',
        link: '/rooms'
    },
    {
        value: 'Add Rooms',
        link: '/rooms/new-room'
    }
]

export const Aside = () => {


    return (
        <aside className="box-border w-80 h-dvh flex flex-col py-15 items-center justify-center bg-principal-800 border-r border-secondary-100">
            <div>
                <Link to={"/about"}>
                    <h1 className="text-3xl font-bold mb-2 text-principal-50">GREEN RIVER</h1>
                </Link>
                <div className="border-t w-full mb-8 border-principal-700"></div>
            </div>
            <div className="flex flex-col h-full text-[1.1rem] w-full justify-center gap-2">
                <AsideDropDown label="Customer" options={optionsCustomer}></AsideDropDown>
                <AsideDropDown label="Rooms" options={optionsRooms}></AsideDropDown>
            </div>
        </aside>
    )
}