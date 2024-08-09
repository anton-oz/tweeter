import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_QUESTION } from "../utils/queries";

export default function Question() {
  const { loading, data } = useQuery(GET_QUESTION);
  const [questions, setQuestions] = useState([]);

  function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  // Only attempt to access `data.question` when loading is false
  const pageQuestion =
    !loading && data?.question
      ? data.question[getRandomIndex(data.question.length)].question
      : null;

  return (
    <div className="flex justify-center items-start h-screen mt-20">
      <h1>{loading ? "Loading..." : pageQuestion}</h1>
    </div>
  );
}
