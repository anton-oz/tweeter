import { createContext, useContext, useReducer } from 'react';
import io from "socket.io-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const socket = process.env.NODE_ENV === 'production' ? 'https://tweeter-4z96.onrender.com/' : io.connect("http://localhost:3001");

const client = new ApolloClient({
    uri: process.env.NODE_ENV ==='production' ? 'https://tweeter-4z96.onrender.com/graphql' : 'http://localhost:3001/graphql',
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