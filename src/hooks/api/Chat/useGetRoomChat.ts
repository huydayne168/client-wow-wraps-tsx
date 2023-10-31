import React, { useEffect, useState } from "react";
import usePrivateHttp from "../../usePrivateHttp";
import useCreateRoomChat from "./useCreateRoomChat";
import { AxiosError } from "axios";
import { RoomChat } from "../../../models/RoomChat";

const useGetRoomChat = (userId: string | undefined) => {
    const privateHttp = usePrivateHttp();
    const createRoomChat = useCreateRoomChat();
    const [room, setRoom] = useState<RoomChat>();

    useEffect(() => {
        const getRoomChat = async () => {
            try {
                const res = await privateHttp.get("/api/chat/getRoom", {
                    params: {
                        userId,
                    },
                });
                setRoom(res.data);
            } catch (error) {
                console.log(error);
                if (error instanceof AxiosError) {
                    if (error.response?.status === 404) {
                        console.log("heelllo");
                        const newRoom = await createRoomChat(userId);
                        setRoom(newRoom);
                    }
                }
            }
        };

        const call = setTimeout(() => {
            getRoomChat();
        }, 500);

        return () => {
            clearTimeout(call);
        };
    }, [userId]);

    return room;
};

export default useGetRoomChat;
