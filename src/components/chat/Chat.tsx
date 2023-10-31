import React, { useCallback, useState } from "react";
import styles from "./Chat.module.css";
import ChatBox from "./ChatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import useGetRoomChat from "../../hooks/api/Chat/useGetRoomChat";
import { useAppSelector } from "../../hooks/store-hooks";
const Chat = () => {
    const currentUser = useAppSelector((state) => state.currentUser);
    const [openChatBox, setOpenChatBox] = useState(false);
    const room = useGetRoomChat(currentUser._id);
    const onOpenChatBox = useCallback(() => {
        setOpenChatBox((pre) => !pre);
    }, []);
    // get room and message:

    return (
        <div className={styles["chat"]}>
            <div className={styles["icon"]} onClick={onOpenChatBox}>
                <FontAwesomeIcon icon={faMessage} />
            </div>
            {openChatBox && <ChatBox room={room} />}
        </div>
    );
};

export default Chat;
