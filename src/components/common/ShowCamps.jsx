import axios from "axios";
import { useEffect, useState } from "react";
import ShowCampsDetails from "./ShowCampsDetails";
import Header from "./Header";
import Footer from "./Footer";
import PathologyChatbotPage from '../user/PathologyChatbotPage'
import { BASE_URL } from "../../config";


function ShowCamps() {

  const APIURL = `${BASE_URL}/showCamps`; // hitting camps API

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
      <Header />
            <PathologyChatbotPage />
  
      {/* HERO SECTION */}
      <section className="bg-primary bg-gradient text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Health Camps</h1>
          <p className="lead">
            Explore upcoming health camps near you. Get free checkups, expert consultations, and better care with MediGo.
          </p>
        </div>
      </section>

      {/* CAMPS LIST */}
      <div className="container py-5">
        <h3
          className="text-center fw-bold mb-5"
          style={{ fontFamily: "Poppins" }}
        >
        </h3>

        <ShowCampsDetails campArray={campData} />
      </div>

      <Footer />
    </>
  );
}
export default ShowCamps;