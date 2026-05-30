import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerHeader from "./WorkerHeader";

function ViewAllConfirmedRequest() {

  const [data, setData] = useState({});
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  const API_URL = "http://localhost:9090/worker/confirmedRequests";
  const VISIT_API = "http://localhost:9090/worker/updateVisitStatus";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(API_URL);
      groupData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // GROUP DATA
  const groupData = (list) => {
    const grouped = {};

    list.forEach(item => {
      if (!grouped[item.transactionNo]) {
        grouped[item.transactionNo] = {
          payment: {
            name: item.name,
            phone: item.phone,
            email: item.email,
            transactionNo: item.transactionNo,
            amount: item.amount,
            token: item.tokenNumber,
            date: item.paymentDate, // booking date
            visitStatus: item.visitStatus || false
          },
          tests: []
        };
      }

      grouped[item.transactionNo].tests.push(item);
    });

    setData(grouped);
  };

  // FILTER (NO DATA UNTIL DATE SELECTED)
  const filteredKeys = date
    ? Object.keys(data).filter(txn => {

      const group = data[txn];

      const matchDate =
        new Date(group.payment.date).toISOString().split("T")[0] === date

      const searchText = search.trim().toLowerCase();

      const matchSearch = searchText
        ? (
          group.payment.token?.toLowerCase().includes(searchText) ||
          group.payment.phone?.toString().includes(searchText) ||
          group.payment.name?.toLowerCase().includes(searchText)
        )
        : true;

      return matchDate && matchSearch;
    })
    : [];

  // SPLIT
  const pending = filteredKeys.filter(txn => !data[txn].payment.visitStatus);
  const completed = filteredKeys.filter(txn => data[txn].payment.visitStatus);

  // UPDATE VISIT
  const updateVisit = async (txn) => {
    try {
      const res = await axios.post(`${VISIT_API}/${txn}`);

      if (res.data === "Visit Updated") {
        alert("Visit Completed");
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CARD
  const renderCard = (txn) => {
    const group = data[txn];

    return (
      <div key={txn} style={cardStyle}>

        <h4 style={{ marginBottom: "10px" }}>Payment Info</h4>

        <p><b>Name:</b> {group.payment.name}</p>
        <p><b>Phone:</b> {group.payment.phone}</p>
        <p><b>Token No:</b> {group.payment.token}</p>
        <p><b>Transaction No:</b> {group.payment.transactionNo}</p>
        <p><b>Amount:</b> ₹{group.payment.amount}</p>
        <p><b>Date:</b> {group.payment.date}</p>

        {/* STATUS */}
        {group.payment.visitStatus && (
          <p style={{ color: "green", fontWeight: "bold" }}>
            ✔ Visit Completed
          </p>
        )}

        {/* TABLE */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cell}>Test</th>
              <th style={cell}>Price</th>
              <th style={cell}>Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {group.tests.map((t, i) => (
              <tr key={i}>
                <td style={cell}>{t.test?.testName}</td>
                <td style={cell}>₹{t.test?.testPrice}</td>
                <td style={{ ...cell, color: t.bookingStatus === "PENDING" ? "orange" : "green" }}>{t.bookingStatus}</td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* BUTTON */}
        {!group.payment.visitStatus && (
          <button
            onClick={() => updateVisit(txn)}
            style={btn}
          >
            Update Visit Status
          </button>
        )}

      </div>
    );
  };

  return (
    <>
      <WorkerHeader />

      <div style={{ marginTop: "70px", padding: "20px" }}>

        <h2 className="text-center">Confirmed Test Bookings</h2>

        {/* FILTER UI */}
        <div style={filterWrapper}>
          <div style={filterBar}>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={pillInput}
            />

            <input
              type="text"
              placeholder="Search Token"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={pillInput}
            />

          </div>
        </div>

        {!date ? (
          <p className="text-center">Please select a date to view bookings</p>
        ) : filteredKeys.length === 0 ? (
          <p className="text-center">No records found</p>
        ) : (
          <>
            {/* STYLE */}
            <h3 style={{ color: "RED" }}>Pending Visits</h3>
            {pending.map(txn => renderCard(txn))}

            {completed.length > 0 && (
              <>
                <hr style={{ margin: "25px 0" }} />
                {/* ✅ ORIGINAL STYLE KEPT */}
                <h3 style={{ color: "green" }}>Completed Visits</h3>
                {completed.map(txn => renderCard(txn))}
              </>
            )}
          </>
        )}

      </div>
    </>
  );
}

/* STYLES */

const cardStyle = {
  border: "2px solid #ccc",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px"
};

const cell = {
  border: "1px solid #ddd",
  padding: "8px"
};

const btn = {
  marginTop: "10px",
  padding: "8px",
  background: "green",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const filterWrapper = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "25px"
};

const filterBar = {
  display: "flex",
  gap: "10px",
  padding: "10px",
  borderRadius: "50px",
  background: "#f5f7fa",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};

const pillInput = {
  border: "none",
  outline: "none",
  padding: "10px 15px",
  borderRadius: "30px",
  background: "white",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  fontSize: "14px"
};

export default ViewAllConfirmedRequest;