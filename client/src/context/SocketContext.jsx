import { createContext, useContext, useReducer } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");
const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}