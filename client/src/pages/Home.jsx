import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TweeterChat from "../components/TweeterChat";
// import { GET_QUESTION } from "../utils/queries";

import { useSocketContext } from "../context/SocketContext";

function Home() {
  // socket context
  const socket = useSocketContext();

  // State for storing questions
  // const [question, setQuestions] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // // Fetch questions when the component mounts
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       // Fetch the questions
  //       const fetchedQuestions = await GET_QUESTION();
  //       setQuestions(fetchedQuestions);
  //     } catch (err) {
  //       setError(err.message || 'Failed to fetch questions');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchQuestions();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Sidebar />
      <TweeterChat socket={socket} />
    </>
  );
}

export default Home;
