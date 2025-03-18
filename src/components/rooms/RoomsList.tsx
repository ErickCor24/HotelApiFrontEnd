import { useEffect } from "react"
import { useFetch } from "../hooks"
import { Error } from "../ui"
import { OrbitProgress } from "react-loading-indicators"

interface RoomTypeProps {
    idRoomType: number,
    description: string,
    price: number
}

interface RoomsProps {
    idRoom: number,
    roomTypeId: number,
    roomType: RoomTypeProps,
    status: number
}

type Response = {
    success: boolean;
    message: string;
    data: RoomsProps[];
}


export const RoomsList = () => {

    const API_URL = 'https://localhost:7234/api/Room/GetAllRooms'
    const { data, loading, error, getData } = useFetch<Response>();

    useEffect(() => {
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
        <>
            <h2 className="text-2xl text-principal-700 mb-4 font-medium">Rooms List</h2>
            <div className="grid lg:grid-cols-3 gap-5 overflow-y-auto">
                {
                    data.data.map((room) => {
                        return (
                            <div key={room.idRoom} className="flex flex-col justify-center items-start gap-5 bg-secondary-100 py-5 px-2 rounded border-y border-principal-700 shadow shadow-secondary-200">
                                <p className="text-xl text-principal-900">{room.roomType.description.toUpperCase()}</p>
                                <p className="text-lg bg-green-700 text-secondary-50 rounded py-2 px-1">$ {room.roomType.price}</p>
                                {room.status == 0 ?
                                    <p className="text-xl font-medium text-principal-500">Free</p> :
                                    <p className="text-lg font-medium text-red-500">Occupied</p>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}