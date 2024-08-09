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
        <div className="flex justify-center text-center text-2xl leading-10 items-start top-[20%] right-0 left-[20%] m-auto w-fit max-w-[30%] absolute bg-slate-400 p-4 rounded bg-opacity-50">
            <h1>
                {loading ? 'loading...' : currentQuestion ? currentQuestion : 'error'}
            </h1>
        </div>
    );
};
