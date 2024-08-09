import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_QUESTION } from '../utils/queries';

export default function Question() {

    const { loading, data, error } = useQuery(GET_QUESTION);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    function getRandomIndex(arrayLength) {
        return Math.floor(Math.random() * arrayLength);
    }

    useEffect(() => {
        if (data) {
            setQuestions(data.question)
        }

    }, [data]);

    // set time for questions to loop
    const questionLoopTime = 10 * 1000 // 10 seconds

    useEffect(() => {
        if (questions.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentQuestionIndex((prevIndex) => {
                    return (prevIndex + 1) % questions.length;
                });
            }, questionLoopTime); 

            // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [questions]);

    return (
        <div className="flex justify-center items-start h-screen mt-20">
            <h1>
                {}
                {loading ? 'Loading...' : questions.length > 0 ? questions[currentQuestionIndex].question : 'No Questions Available'}
            </h1>
        </div>
    );
}
