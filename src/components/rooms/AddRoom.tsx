import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFetch, usePost } from "../hooks";
import { Button, Error } from "../ui"
import { useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";

interface TypeRoomProps {
    idRoomType: number,
    description: string,
    price: number
}

type RoomsProps = {
    idRoom: number,
    roomTypeId: number,
    status: number
}

type TypeRoomResponse = {
    success: boolean;
    message: string;
    data: TypeRoomProps[];
}

export const AddRoom = () => {
    const GET_API_URL = "https://localhost:7234/api/RoomType/GetAllRoomTypes";
    const POST_API_URL = "https://localhost:7234/api/Room/InsertRoom";
    const selectRef = useRef<HTMLSelectElement>(null);

    const { data, loading, error, getData } = useFetch<TypeRoomResponse>();
    const { postData } = usePost<RoomsProps>();

    const [room, setRoom] = useState<RoomsProps>({
        idRoom: 0,
        roomTypeId: 0,
        status: 0
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(room);
        await postData(POST_API_URL, room);
        if (!error) {
            navigate("/rooms");
        }
    }

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedRoomTypeId = parseInt(e.target.value, 10);
        setRoom({
            ...room,
            roomTypeId: selectedRoomTypeId
        });
    }

    useEffect(() => {
        getData(GET_API_URL);
    }, [getData])

    if (loading) {
        return <OrbitProgress variant="disc" dense color="#22c560" size="medium" text="" textColor="" />;
    }

    if (error) {
        return <Error message="Error" description={error.stack} ></Error>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="type-room" id="type-room-select" ref={selectRef} value={room.roomTypeId} onChange={handleChange}>
                    <option value="0">Select a option</option>
                    {data?.data.map((type) => (
                        <option key={type.idRoomType} value={type.idRoomType}>{type.description}: ${type.price}</option>
                    ))}
                </select>
                <Button text="Enviar"></Button>
            </form>
        </div>
    )
}