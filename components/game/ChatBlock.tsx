import { TextField } from "@mui/material";
import useKeyStatus from "components/hooks/useKeyStatus";
import { SocketContext } from "pages/village/square";
import { useState, useRef, useContext, useEffect } from "react";
import { IMessage } from "./types";

export default function ChatBlock() {
    const [messageInput, setMessageInput] = useState<string>('');
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
    const chatDivRef = useRef<HTMLDivElement>(null);
    const textFieldRef = useRef<HTMLInputElement>(null);
    const socket = useContext(SocketContext);

    const keyStatus = useKeyStatus();
    useEffect(() => {
        if (keyStatus.code === 'Enter') {
            textFieldRef.current?.focus();
        } else if (keyStatus.code === 'Escape') {
            textFieldRef.current?.blur();
        }
    }, [keyStatus]);

    useEffect(() => {
        if (socket) {
            socket?.on('connect', () => {
                console.log('connected!!');
            });
            socket?.on("message", (message: IMessage) => {
                console.log('message', message);
                setMessages((prev) => [...prev, message]);
            });
        }

        return () => {
            socket?.close();
        };
    }, [socket]);

    useEffect(() => {
        chatDivRef.current?.scrollTo(0, chatDivRef.current.scrollHeight);
    }, [messages]);


    return (
        <>
            <div
                className="h-72 max-h-72 overflow-scroll p-4 rounded-md"
                style={{
                    backgroundColor: isOpenChat ? '#222' : '#2224',
                }}
                ref={chatDivRef}
            >
                {messages.map((e, i) => <div key={i}>
                    <span className="text-cyan-300">{e.owner}</span>&nbsp;<span className="text-white">{e.value}</span>
                </div>)}
            </div>

            <TextField
                className="w-full"
                inputRef={textFieldRef}
                style={{
                    backgroundColor: isOpenChat ? '#ffff' : '#eee4',
                }}
                onChange={(e) => {
                    setMessageInput(e.target.value);
                }}
                onFocus={() => {
                    setIsOpenChat(true);
                }}
                onBlur={() => {
                    setIsOpenChat(false);
                }}
                onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.keyCode === 13 && messageInput.replace(/ /g, '') !== '') {
                        e.preventDefault();
                        socket?.emit('message', messageInput);
                        setMessageInput('');
                    }
                }}
                value={messageInput}
            >
            </TextField>
        </>
    );
}