import React, { useEffect, useState } from "react";
import usePrivateHttp from "../../usePrivateHttp";
import { Message } from "../../../models/Message";

const useGetMessage = (roomId: string | undefined) => {
    const privateHttp = usePrivateHttp();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await privateHttp.get("/api/chat/getMessage", {
                    params: {
                        roomId,
                    },
                });
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        const call = setTimeout(() => {
            getMessage();
        }, 500);

        return () => {
            clearTimeout(call);
        };
    }, [roomId]);

    return messages;
};

export default useGetMessage;
