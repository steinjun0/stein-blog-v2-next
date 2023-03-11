import { TextField } from "@mui/material";
import { SocketRefContext } from "pages/village/square";
import { useState, useRef, useContext, useEffect } from "react";
import { IMessage } from "./types";

export default function ChatBlock() {
    const [messageInput, setMessageInput] = useState<string>('');
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
    const chatDivRef = useRef<HTMLDivElement>(null);
    const socketRef = useContext(SocketRefContext);

    useEffect(() => {
        if (socketRef) {
            socketRef.current?.on("message", (message: IMessage) => {
                setMessages((prev) => [...prev, message]);
            });
        }

        return () => {
            socketRef && socketRef!.current && socketRef!.current.close();
        };
    }, [socketRef]);

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
                    if (e.keyCode === 13 && messageInput.replace(/ /g, '') !== '') {
                        e.preventDefault();
                        socketRef?.current!.emit('message', messageInput);
                        setMessageInput('');
                    }
                }}
                value={messageInput}
            >
            </TextField>
        </>
    );
}