import { useQuery } from "@apollo/client";
import { useState, useEffect, useCallback } from "react";
import { GET_QUESTION } from '../utils/queries';

import { useSocketContext } from "../context/SocketContext";

export default function Question({ room }) {

    const socket = useSocketContext();
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.on("set_question", ({ question }) => {
            setCurrentQuestion(question);
        });

        return () => {
            socket.off("set_question");
        };
    }, [socket]);

    useEffect(() => {
        // timeout to wait for user to connect to server
        setTimeout(() => {
            socket.emit('get_question', {
                room
            })
            setLoading(false)
        }, 500)
    }, [socket])

    return (
        <div className="flex justify-center items-start h-screen mt-20">
            <h1>
                {loading ? 'loading...' : currentQuestion ? currentQuestion : 'error'}
            </h1>
        </div>
    );
};
