import axios from "axios";
import { useEffect, useState } from "react";
import ShowCampsDetails from "./ShowCampsDetails";
import Header from "./Header";
import Footer from "./Footer";

function ShowCamps() {

  const APIURL = "http://localhost:9090/showCamps"; // hitting camps API

  const [campData, setCampData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIURL);
        console.log(response.data);
        setCampData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Header/>
    <div className="container mt-5">
      <h3
        className="text-center fw-bold mb-4"
        style={{ fontFamily: "Poppins" }}
      >
        🏥 Upcoming Health Camps 🏥
      </h3>

      <ShowCampsDetails campArray={campData} />
    </div>
    <Footer/>
    </>
  );
}

export default ShowCamps;