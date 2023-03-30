export type TCharacterCommand = "hold" | "up" | "left" | "down" | "right";
export interface ICharacterPos { top: number, left: number; }
export interface IMessage { owner: string, value: string; }

export interface ServerToClientEvents {
    message: ({ owner, value }: IMessage) => void,
    pos: (positions: string) => void,
}

export interface ClientToServerEvents {
    message: (value: string) => void,
    pos: (value: string) => void,
}