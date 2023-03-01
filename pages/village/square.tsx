import { TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
interface IMessage { owner: string, value: string }

interface ServerToClientEvents {
    message: ({ owner, value }: IMessage) => void;
}

interface ClientToServerEvents {
    message: (value: string) => void;
}



export default function Square() {
    const [messageInput, setMessageInput] = useState<string>('')
    const [messages, setMessages] = useState<IMessage[]>([])
    const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>()

    const chatDivRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        socketRef.current = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string)
        socketRef.current.on("message", (message: IMessage) => {
            setMessages((prev) => [...prev, message])
        })
        return () => {
            socketRef.current && socketRef.current.close()
        }
    }, [])

    useEffect(() => {
        chatDivRef.current && chatDivRef.current.scrollTo(0, chatDivRef.current.scrollHeight)
    }, [messages])


    return <div>
        <div
            className="h-72 max-h-72 overflow-auto"
            ref={chatDivRef}
        >
            {messages.map((e, i) => <div key={i}>{e.owner}: {e.value}</div>)}
        </div>

        <TextField
            onChange={(e) => {
                setMessageInput(e.target.value)
            }}
            onKeyDown={(e) => {
                if (e.keyCode === 13 && messageInput.replace(/ /g, '') !== '' && socketRef.current) {
                    e.preventDefault()
                    console.log(e, messageInput)
                    socketRef.current!.emit('message', messageInput)
                    setMessageInput('')
                }
            }}
            value={messageInput}
        >
        </TextField>
    </div>
}