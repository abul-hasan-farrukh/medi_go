import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import UserHeader from "./UserHeader";
import { BASE_URL } from "../../config";

function ViewTestBookingStatus() {

  const [groupedData, setGroupedData] = useState({});

  const email = localStorage.getItem("userEmail");
  const API_URL = `${BASE_URL}/user/bookingStatus/${email}`;

  useEffect(() => {
    loadData();
  }, []);

  // Load & Group Data
  const loadData = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log(res);

      const grouped = res.data.reduce((acc, item) => {

        //skipping invalid transaction without transactionNo
        if (!item.transactionNo) return acc;

        const key = item.transactionNo || Math.random();

        if (!acc[key]) {
          acc[item.transactionNo] = {
            payment: {
              transactionNo: item.transactionNo,
              amount: item.amount,
              tokenNumber: item.tokenNumber
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

  // Download PDF
  const downloadPDF = (group) => {

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Medigo Test Booking Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Transaction ID: ${group.payment.transactionNo}`, 20, 40);
    doc.text(`Total Amount: Rs. ${group.payment.amount}`, 20, 50);
    doc.text(`Token: ${group.payment.tokenNumber || "Pending"}`, 20, 60);

    const tableData = group.tests.map(test => [
      test.test?.testName,
      test.test?.testDescription,
      `Rs. ${test.test?.testPrice}`,
      test.bookingStatus,
      test.date
    ]);

    autoTable(doc, {
      startY: 70,

      head: [["Test Name", "Description", "Price", "Payment Status", "Date"]],
      body: tableData,

      // HEADER STYLE
      headStyles: {
        fillColor: [200, 200, 200], // grey color code
        textColor: 0,
        halign: "center"
      },

      //  APPLY TO ALL ROWS
      bodyStyles: {
        fillColor: [255, 255, 255], // white rows
        textColor: 0
      },

      //  ALTERNATE ROW COLORS (ZEBRA)
      alternateRowStyles: {
        fillColor: [240, 240, 240] // light grey
      },

      // BORDER F
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.2
      }
    });

    doc.save(`MediGo_${group.payment.transactionNo}.pdf`);
  };

  return (
    <>
      <UserHeader />
      <div style={{ marginTop: "70px", padding: "20px" }}>
        <h2 className="text-center mb-4">Your Test Booking Status</h2>

        {Object.keys(groupedData).length === 0 ? (
          <p className="text-center">No bookings found</p>
        ) : (
          Object.keys(groupedData).map((txn, index) => {

            const group = groupedData[txn];

            //below code checks if payment status is confirmed to display download receipt button
            const isConfirmed = group.tests.every(
              t => t.bookingStatus === "CONFIRMED"
            );

            //below code checks if test report is uploaded by worker to display download report button
            const isReportAvailable = group.tests.some(
              t => t.reportUploaded
            );

            const reportFile = group.tests.find(
              t => t.testReportFile
            )?.testReportFile;

            return (
              <div key={index} style={cardStyle}>

                {/* PAYMENT DETAILS */}
                <h3 style={{ color: "green" }}>Payment Details</h3>
                <p><b>Transaction No:</b> {group.payment.transactionNo}</p>
                <p><b>Total Amount:</b> ₹{group.payment.amount}</p>
                <p>
                  <b>Token No:</b>{" "}
                  <span style={{ color: "blue", fontWeight: "bold" }}>
                    {group.payment.tokenNumber || "Pending Verification"}
                  </span>
                </p>

                <hr />

                {/* TABLE */}
                <h4>Booked Tests</h4>

                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={headerStyle}>Test Name</th>
                      <th style={headerStyle}>Description</th>
                      <th style={headerStyle}>Price</th>
                      <th style={headerStyle}>Payment Status</th>
                      <th style={headerStyle}>Test Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {group.tests.map((test, i) => (
                      <tr key={i}>
                        <td style={cellStyle}>{test.test?.testName}</td>
                        <td style={cellStyle}>{test.test?.testDescription}</td>
                        <td style={cellStyle}>₹{test.test?.testPrice}</td>
                        <td style={{
                          ...cellStyle,
                          color: test.bookingStatus === "PENDING" ? "orange" : "green"
                        }}>{test.bookingStatus}</td>
                        <td style={{ ...cellStyle, color: "red" }}>
                          {test.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* DOWNLOAD BUTTON */}
                {/* <button
                  onClick={() => downloadPDF(group)}
                  style={downloadBtn}
                >
                  Download Receipt
                </button> */}

                {/* Receipt Download Button */}
                <button
                  onClick={() => isConfirmed && downloadPDF(group)}
                  style={{
                    ...downloadBtn,
                    background: isConfirmed ? "#ff9800" : "#ccc",
                    cursor: isConfirmed ? "pointer" : "not-allowed"
                  }}
                  disabled={!isConfirmed}
                  title={!isConfirmed ? "Pending Verification" : "Download Receipt"}
                >
                  Download Receipt
                </button>

                {/* Report Download Button */}
                <button
                  onClick={() => {
                    if (isReportAvailable) {
                      window.open(
                        `${BASE_URL}/uploads/testreports/${reportFile}`,
                        "_blank"
                      );
                    }
                  }}
                  style={{
                    ...downloadBtn,
                    marginLeft: "10px",
                    background: isReportAvailable ? "#2196F3" : "#ccc",
                    cursor: isReportAvailable ? "pointer" : "not-allowed"
                  }}
                  disabled={!isReportAvailable}
                  title={!isReportAvailable ? "Report not uploaded yet" : "Download Report"}
                >
                  Download Report
                </button>

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
  borderRadius: "12px",
  background: "#f9fff9"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px"
};

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left"
};

const headerStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",
  fontWeight: "bold",
  backgroundColor: "#f2f2f2"
};

const downloadBtn = {
  marginTop: "15px",
  padding: "10px",
  background: "#ff9800",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default ViewTestBookingStatus;