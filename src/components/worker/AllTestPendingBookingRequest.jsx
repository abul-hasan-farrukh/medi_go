import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerHeader from "./WorkerHeader";
import { BASE_URL } from "../../config";

function AllTestPendingBookingRequest() {

  const [groupedData, setGroupedData] = useState({});

  const API_URL = `${BASE_URL}/worker/pendingRequests`;
  const VERIFY_API = `${BASE_URL}/worker/verifyPayment`;
  const VISIT_API = `${BASE_URL}/worker/updateVisitStatus`;

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await axios.get(API_URL);

      const grouped = res.data.reduce((acc, item) => {

        //skipping invalid transaction without transactionNo
  if (!item.transactionNo) return acc;

          const key = item.transactionNo || item.email + "_temp";

        if (!acc[key])  {
           acc[key] = {
            payment: {
              email: item.email,
              name: item.name,         
              phone: item.phone,      
              amount: item.amount,
              transactionNo: item.transactionNo,
              paymentDate: item.paymentDate
            },
            tests: []
          };
        }

        acc[item.transactionNo].tests.push(item);

        return acc;

      }, {});

      setGroupedData(grouped);

    } catch (err) {
      console.error(err);
    }
  };

  // VERIFY PAYMENT
  const verifyPayment = async (txn) => {
    if (!window.confirm("Verify this payment?")) return;

    await axios.post(`${VERIFY_API}/${txn}`);
    alert("Payment Verified");
    loadRequests();
  };

 

  return (
    <>
    <WorkerHeader/>
    <div style={{ marginTop: "70px", padding: "20px" }}>
      <h2 className="text-center mb-4">Pending Test Booking Requests</h2>

      {Object.keys(groupedData).length === 0 ? (
        <p className="text-center">No pending requests</p>
      ) : (
        Object.keys(groupedData).map((txn, index) => {

          const group = groupedData[txn];

          return (
            <div key={index} style={cardStyle}>

              {/* PAYMENT DETAILS */}
              <h3 style={{ color: "green" }}>Payment Summary</h3>
              <p><b>Name:</b> {group.payment.name}</p>
              <p><b>Email:</b> {group.payment.email}</p>
              <p><b>Phone:</b> {group.payment.phone}</p>
              <p><b>Transaction No:</b> {group.payment.transactionNo}</p>
              <p><b>Total Paid:</b> ₹{group.payment.amount}</p>
              <p style={{color:"red"}}><b>Test Booking Due Date:</b> {group.payment.paymentDate}</p>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => verifyPayment(group.payment.transactionNo)}
                  style={verifyBtn}
                >
                  Verify Payment
                </button>

                
              </div>

              <hr />

              {/* TABLE */}
              <h4>Booked Tests</h4>

              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={cell}>Test Name</th>
                    <th style={cell}>Description</th>
                    <th style={cell}>Price</th>
                    <th style={cell}>Payment Status</th>
                    <th style={cell}>Requested Date</th>
                  </tr>
                </thead>

                <tbody>
                  {group.tests.map((t, i) => (
                    <tr key={i}>
                      <td style={cell}>{t.test?.testName}</td>
                      <td style={cell}>{t.test?.testDescription}</td>
                      <td style={cell}>₹{t.test?.testPrice}</td>
                      <td style={{...cell, color: t.bookingStatus === "PENDING" ? "orange" : "green"}}>{t.bookingStatus}</td>
                      <td style={cell}>{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          );
        })
      )}
    </div>
    </>
  );
}

/* STYLES */
const cardStyle = {
  border: "2px solid #4CAF50",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "12px"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px"
};

const cell = {
  border: "1px solid #ccc",
  padding: "8px"
};

const verifyBtn = {
  padding: "8px 12px",
  marginRight: "10px",
  background: "green",
  color: "white",
  border: "none"
};

const visitBtn = {
  padding: "8px 12px",
  background: "orange",
  color: "white",
  border: "none"
};

export default AllTestPendingBookingRequest;