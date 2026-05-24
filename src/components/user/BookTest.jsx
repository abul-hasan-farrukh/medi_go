import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserHeader from "./UserHeader";

function BookTest() {
  const [tests, setTests] = useState([]);
  const APIURL = "http://localhost:9090/user/viewTests";

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const res = await axios.get(APIURL);
      setTests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 const bookTest = async (test) => {
  const email = localStorage.getItem("userEmail"); // logged-in user email

  if (!email) {
    Swal.fire("Error", "User not logged in", "error");
    return;
  }

  const result = await Swal.fire({
    title: "Confirm Booking",
    text: `Do you want to book ${test.testName}?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Book it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const bookingData = {
        email: email,
        testId: test.testId
      };

      const res = await axios.post(
        "http://localhost:9090/user/bookTest",
        bookingData
      );

      Swal.fire("Success", res.data, "success");

    } catch (err) {
      Swal.fire("Error", err.response?.data || "Booking failed", "error");
    }
  }
};
  return (
    <>
      <UserHeader />

      <div className="container mt-4">
        <div className="text-center mb-5">
          <h3 style={{marginTop: "100px"}}>Available Tests</h3>
          <p className="text-muted">
            Book diagnostic tests at best prices with fast reports
          </p>
        </div>

        <div className="row">
          {tests.map((test) => (
            <div className="col-md-4 mb-4" key={test.testId}>
              
              <div className="card practo-card h-100 border-0">
                
                <div className="badge bg-success position-absolute m-3 px-3 py-2 rounded-pill">
                  Safe & Trusted
                </div>

                <div className="card-body d-flex flex-column">

                  <h5 className="fw-bold text-dark mb-2 mt-5">
                    {test.testName}
                  </h5>

                  <p className="text-muted small">
                    {test.testDescription}
                  </p>

                  <div className="mb-3 small text-secondary">
                    <div>✔ Home Sample Collection</div>
                    <div>✔ Fast Reports</div>
                    <div>✔ Certified Labs</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-auto">
                    <h5 className="text-primary fw-bold m-0">
                      ₹{test.testPrice}
                    </h5>

                    <button
                      className="btn btn-gradient rounded-pill px-4"
                      onClick={() => bookTest(test)}
                    >
                      Book Now
                    </button>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link
            to="/user/booked-test"
            className="btn btn-outline-primary rounded-pill px-4 mb-5"
          >
            View Booked Tests →
          </Link>
        </div>
      </div>

      {/* Styling */}
      <style>
        {`
          .practo-card {
            border-radius: 18px;
            transition: all 0.3s ease;
            box-shadow: 0 6px 18px rgba(0,0,0,0.15);
            overflow: hidden;
            position: relative;
            background: #fff;
          }

          .practo-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 18px 40px rgba(0,0,0,0.25);
          }

          .btn-gradient {
            background: linear-gradient(135deg, #00b4db, #0083b0);
            color: white;
            border: none;
            font-weight: 500;
            transition: 0.3s;
          }

          .btn-gradient:hover {
            background: linear-gradient(135deg, #0096c7, #005f73);
            color: #fff;
          }

          .card-body {
            padding: 22px;
          }
        `}
      </style>
    </>
  );
}

export default BookTest;