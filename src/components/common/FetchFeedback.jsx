import axios from "axios";
import { useEffect, useState } from "react";
import FetchFeedbackDetails from "./FetchFeedbackDetails";
import { BASE_URL } from "../../config";

function FetchFeedback() {

  const APIURL = `${BASE_URL}/fetchFeedback`;

  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIURL);
        console.log(response.data);
        setFeedbackData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center fw-bold mb-4">⭐ What Our Happy Users Say!!! ⭐</h3>

      <FetchFeedbackDetails feedbackArray={feedbackData} />
    </div>
  );
}

export default FetchFeedback;