import { createContext, useContext, useReducer } from 'react';
import io from "socket.io-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const socket = io.connect("http://localhost:3001");

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache()
})

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        </SocketContext.Provider>
    )
}