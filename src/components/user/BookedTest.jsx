import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";

function BookedTests() {
const navigate=useNavigate()
  const [tests, setTests] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [bookingDate, setBookingDate] = useState(""); // ✅ NEW

  const email = localStorage.getItem("userEmail");

  const API_URL = `http://localhost:9090/user/bookings/${email}`;
  const API_DELETE = "http://localhost:9090/user/deleteBooking";
  const API_PAYMENT = "http://localhost:9090/user/payNow";

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const res = await axios.get(API_URL);
    console.log(res.data);
    
    setTests(res.data);
    
  };

  const removeTest = async (id) => {
    await axios.delete(`${API_DELETE}/${id}`);
    setTests(prev => prev.filter(t => t.bookingId !== id));
  };

  // const total = tests.reduce((sum, t) => sum + (t.test?.testPrice || 0), 0);

  const pendingTests = tests.filter(
  t => t.bookingStatus === "PENDING" && t.transactionNo == null);

const total = pendingTests.reduce(
  (sum, t) => sum + (t.test?.testPrice || 0),
  0
);

  // Generate QR
  const generateQR = () => {
    if (pendingTests.length === 0) {
      alert("No tests selected");
      return;
    }
    setShowQR(true);
  };

//payment method
  const payNow = async () => {

    if (!transactionId || !bookingDate) {
      alert("Enter Transaction ID and Select Date");
      return;
    }

    try {
      const paymentData = {
        userEmail: email,
        transactionNo: transactionId,
        amount: total,
        date: bookingDate   
      };

      const res = await axios.post(API_PAYMENT, paymentData);

      alert(res.data);

      
    setTests([]); // to clear tests after payment
    await loadBookings(); //// reload fresh data from backend

      setShowQR(false);
      setTransactionId("");
      setBookingDate("");
      navigate("/user/booking-status")

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
<>
    <UserHeader/>
    <div style={{ padding: "20px",
        marginTop: "70px" }}>
      <h2 className="text-center">Your Booked Tests</h2>

      {pendingTests.length === 0 ? (
        <p className="text-center">No tests booked</p>
      ) : (
        <>
          {/* {tests.map(test => ( */}
          {pendingTests.map(test => (
            <div key={test.bookingId} style={cardStyle}>
              <h3>{test.test?.testName}</h3>
              <p>{test.test?.testDescription}</p>
              <p><b>₹{test.test?.testPrice}</b></p>

              <button onClick={() => removeTest(test.bookingId)} style={removeBtn}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>


          <button onClick={generateQR} style={payBtn}>
            Generate QR Code
          </button>

          {showQR && (
            <div style={{ marginTop: "20px" }}>
              <h3>Scan & Pay</h3>

              <QRCodeCanvas 
                value={`upi://pay?pa=abulhasanfarrukh@oksbi&am=${total}`} 
                size={200} 
              />

              {/* DATE INPUT */}
              <div style={{ marginTop: "15px" }}>
                <h6>Select Booking Date:</h6>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]} //to prevent past date selection
                  style={{ padding: "8px", width: "250px" }}
                />
              </div>

              {/* TRANSACTION INPUT */}
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Type Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  style={{ padding: "8px", width: "250px" }}
                />
              </div>

              <button onClick={payNow} style={payBtn}>
                Pay Now
              </button>
            </div>
          )}
        </>
      )}
    </div>
   </>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "10px"
};

const removeBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px"
};

const payBtn = {
  marginTop: "10px",
  padding: "10px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

export default BookedTests;