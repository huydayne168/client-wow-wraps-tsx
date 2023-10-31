import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./ChatBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import openSocket from "socket.io-client";
import { useAppSelector } from "../../hooks/store-hooks";
import useGetMessage from "../../hooks/api/Chat/useGetMessage";
import { Message } from "../../models/Message";
import useSendMessage from "../../hooks/api/Chat/useSendMessage";
import { RoomChat } from "../../models/RoomChat";
const socket = openSocket("https://wow-wraps-backend.onrender.com");
const ChatBox: React.FC<{ room: RoomChat | undefined }> = ({ room }) => {
    const currentUser = useAppSelector((state) => state.currentUser);
    const [inputValue, setInputValue] = useState("");
    const roomMessages = useGetMessage(room?._id);
    console.log(roomMessages);
    const [messages, setMessages] = useState<Message[]>(roomMessages);
    const sendMessage = useSendMessage();
    const chatAreaBodyRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        setMessages(roomMessages);
    }, [roomMessages]);

    useEffect(() => {
        socket.once("receiveMess", (data) => {
            setMessages((pre) => [...pre, data.message]);
        });

        if (chatAreaBodyRef.current) {
            chatAreaBodyRef.current.scrollIntoView({ behavior: "smooth" });
        }

        return () => {
            socket.removeAllListeners();
        };
    }, [messages]);

    const handleInputValue = useCallback((value: string) => {
        console.log(value);
        setInputValue(value);
    }, []);

    const submitHandler = useCallback(async () => {
        console.log(inputValue);
        if (room && inputValue !== "") {
            const messageData = await sendMessage(
                currentUser._id,
                inputValue,
                room?._id
            );
            setMessages((pre) => [
                ...pre,
                {
                    content: inputValue,
                    user: currentUser._id,
                },
            ]);
            socket.emit("sendMess", {
                message: {
                    user: currentUser._id,
                    content: inputValue,
                },
            });
        }
    }, [inputValue]);

    return (
        <div className={styles["chat-box"]}>
            <div className={styles["chat-box__heading"]}>Customer Support</div>

            <div className={styles["chat-box__body"]}>
                <ul>
                    {messages &&
                        messages.map((m, index) => {
                            return (
                                <li
                                    key={m.content + index}
                                    className={`${
                                        m.user === currentUser._id
                                            ? styles["my-mess"]
                                            : styles["other-mess"]
                                    }`}
                                >
                                    {m.content}
                                </li>
                            );
                        })}
                    <li ref={chatAreaBodyRef}></li>
                </ul>
            </div>

            <div className={styles["chat-box__bottom"]}>
                <input
                    type="text"
                    name="chat"
                    id="chat"
                    value={inputValue}
                    onChange={(e) => {
                        handleInputValue(e.target.value);
                    }}
                />
                <FontAwesomeIcon icon={faPaperclip} />
                <FontAwesomeIcon icon={faFaceSmile} />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}
                >
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
